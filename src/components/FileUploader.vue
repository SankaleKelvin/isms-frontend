<template>
  <div class="file-upload">
    <v-file-input
      v-model="files"
      :label="label"
      :accept="accept"
      :show-size="showSize"
      :multiple="multiple"
      :truncate-length="truncateLength"
      :disabled="isUploading"
      :error-messages="errorMessage"
      @change="handleFileChange"
      variant="outlined"
      counter
      prepend-icon="mdi-file-upload"
    ></v-file-input>
    
    <div v-if="showPreview && previewUrl" class="file-preview mt-2">
      <v-img 
        v-if="isImage" 
        :src="previewUrl" 
        :width="previewWidth" 
        :aspect-ratio="16/9"
        cover
        class="rounded"
      ></v-img>
      <v-icon v-else size="large" color="teal">{{ fileIcon }}</v-icon>
    </div>
    
    <div v-if="isUploading" class="mt-2">
      <div class="d-flex align-center mb-1">
        <span class="text-body-2">{{ progressText }}</span>
        <v-spacer></v-spacer>
        <v-btn
          v-if="allowCancel"
          size="small"
          variant="text"
          color="error"
          @click="cancelUpload"
          density="compact"
        >
          Cancel
        </v-btn>
      </div>
      <v-progress-linear
        v-model="progress"
        color="teal"
        height="8"
        rounded
        striped
      ></v-progress-linear>
    </div>
    
    <v-btn
      v-if="showUploadButton && files && files.length > 0 && !autoUpload"
      color="teal darken-1"
      class="mt-4 white--text"
      :loading="isUploading"
      :disabled="!files || files.length === 0"
      @click="upload"
    >
      {{ uploadButtonText }}
    </v-btn>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { api } from '@/services/api.service'

const props = defineProps({
  label: {
    type: String,
    default: 'Select File'
  },
  accept: {
    type: String,
    default: 'image/*'
  },
  multiple: {
    type: Boolean,
    default: false
  },
  showSize: {
    type: Boolean,
    default: true
  },
  truncateLength: {
    type: Number,
    default: 22
  },
  endpoint: {
    type: String,
    required: true
  },
  additionalData: {
    type: Object,
    default: () => ({})
  },
  autoUpload: {
    type: Boolean,
    default: false
  },
  showUploadButton: {
    type: Boolean,
    default: true
  },
  uploadButtonText: {
    type: String,
    default: 'Upload'
  },
  fileFieldName: {
    type: String,
    default: 'file'
  },
  showPreview: {
    type: Boolean,
    default: true
  },
  previewWidth: {
    type: [Number, String],
    default: 200
  },
  allowCancel: {
    type: Boolean,
    default: true
  }
})

const emit = defineEmits([
  'upload-start', 
  'upload-progress', 
  'upload-success', 
  'upload-error', 
  'upload-complete',
  'files-selected',
  'upload-cancel'
])

// Component state
const files = ref(null)
const progress = ref(0)
const isUploading = ref(false)
const uploadComplete = ref(false)
const errorMessage = ref('')
const cancelTokenSource = ref(null)
const previewUrl = ref(null)

// Computed properties
const progressText = computed(() => {
  return `Uploading... ${Math.round(progress.value)}%`
})

const fileIcon = computed(() => {
  if (!files.value || files.value.length === 0) return 'mdi-file'
  
  const file = files.value[0]
  const type = file.type
  
  if (type.includes('image')) return 'mdi-file-image'
  if (type.includes('pdf')) return 'mdi-file-pdf'
  if (type.includes('word') || type.includes('document')) return 'mdi-file-word'
  if (type.includes('excel') || type.includes('sheet')) return 'mdi-file-excel'
  if (type.includes('video')) return 'mdi-file-video'
  if (type.includes('audio')) return 'mdi-file-music'
  if (type.includes('zip') || type.includes('rar') || type.includes('tar')) return 'mdi-file-compressed'
  
  return 'mdi-file'
})

const isImage = computed(() => {
  return files.value && 
         files.value.length > 0 && 
         files.value[0].type && 
         files.value[0].type.includes('image')
})

// Watch for file changes
watch(files, (newFiles) => {
  if (newFiles && newFiles.length > 0) {
    errorMessage.value = ''
    createPreview(newFiles[0])
    
    if (props.autoUpload) {
      upload()
    }
  } else {
    previewUrl.value = null
  }
})

// Methods
function handleFileChange(newFiles) {
  emit('files-selected', newFiles)
}

function createPreview(file) {
  if (!file || !props.showPreview) return
  
  if (isImage.value) {
    previewUrl.value = URL.createObjectURL(file)
  } else {
    previewUrl.value = null
  }
}

function upload() {
  if (!files.value || files.value.length === 0) {
    errorMessage.value = 'Please select a file first'
    return
  }
  
  isUploading.value = true
  progress.value = 0
  uploadComplete.value = false
  errorMessage.value = ''
  
  emit('upload-start', files.value)
  
  // Create FormData
  const formData = new FormData()
  
  // Add selected files
  if (props.multiple) {
    Array.from(files.value).forEach((file, index) => {
      formData.append(`${props.fileFieldName}[${index}]`, file)
    })
  } else {
    formData.append(props.fileFieldName, files.value[0])
  }
  
  // Add additional data
  Object.keys(props.additionalData).forEach(key => {
    formData.append(key, props.additionalData[key])
  })
  
  // Progress callback function
  const progressCallback = (progressPercentage, progressEvent) => {
    progress.value = progressPercentage
    emit('upload-progress', progressPercentage, progressEvent)
  }
  
  // Create cancelation token
  // For direct Axios usage
  if (typeof axios !== 'undefined') {
    cancelTokenSource.value = axios.CancelToken.source()
  }
  
  // Upload file using our API service
  api.upload(props.endpoint, formData, progressCallback)
    .then(response => {
      uploadComplete.value = true
      isUploading.value = false
      emit('upload-success', response.data)
      emit('upload-complete', response.data)
      
      // Clean up preview
      if (previewUrl.value) {
        URL.revokeObjectURL(previewUrl.value)
      }
    })
    .catch(error => {
      isUploading.value = false
      
      if (error.name === 'CanceledError' || (error.message && error.message.includes('canceled'))) {
        errorMessage.value = 'Upload was canceled'
        emit('upload-cancel')
      } else {
        const errorMsg = error.response?.data?.message || error.message || 'Upload failed'
        errorMessage.value = errorMsg
        emit('upload-error', error)
      }
      
      emit('upload-complete', null)
    })
}

function cancelUpload() {
  if (cancelTokenSource.value) {
    cancelTokenSource.value.cancel('Upload canceled by user')
    cancelTokenSource.value = null
  }
  
  isUploading.value = false
  progress.value = 0
  
  emit('upload-cancel')
}

// Expose methods for parent components
defineExpose({
  upload,
  cancelUpload,
  reset: () => {
    files.value = null
    progress.value = 0
    isUploading.value = false
    uploadComplete.value = false
    errorMessage.value = ''
    if (previewUrl.value) {
      URL.revokeObjectURL(previewUrl.value)
      previewUrl.value = null
    }
  }
})
</script>

<style scoped>
.file-upload {
  width: 100%;
}

.file-preview {
  border-radius: 4px;
  overflow: hidden;
  display: flex;
  justify-content: center;
}
</style>
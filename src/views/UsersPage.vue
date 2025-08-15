<template>
  <v-sheet border rounded>
    <v-data-table :headers="headers" :items="users" :hide-default-footer="users.length < 11">
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>
            <v-icon
              color="medium-emphasis"
              icon="mdi-account-multiple"
              size="x-small"
              start
            ></v-icon>
            Users
          </v-toolbar-title>

          <v-btn
            class="me-2"
            prepend-icon="mdi-plus"
            rounded="lg"
            text="Add User"
            border
            @click="add"
          ></v-btn>
        </v-toolbar>
      </template>

      <template v-slot:item.roles="{ value }">
        <v-chip
          v-for="(role, i) in value"
          :key="i"
          :text="role.name || role"
          class="ma-1"
          color="primary"
          label
        ></v-chip>
      </template>

      <template v-slot:item.actions="{ item }">
        <div class="d-flex ga-2 justify-end">
          <v-icon
            color="medium-emphasis"
            icon="mdi-pencil"
            size="small"
            @click="edit(item.id)"
          ></v-icon>
          <v-icon
            color="medium-emphasis"
            icon="mdi-delete"
            size="small"
            @click="remove(item.id)"
          ></v-icon>
        </div>
      </template>

      <template v-slot:no-data>
        <v-btn
          prepend-icon="mdi-backup-restore"
          rounded="lg"
          text="Reload"
          variant="text"
          border
          @click="fetchUsers"
        ></v-btn>
      </template>
    </v-data-table>
  </v-sheet>

  <!-- Dialog for Create/Edit -->
  <v-dialog v-model="dialog" max-width="500">
    <v-card
      :subtitle="`${isEditing ? 'Update' : 'Create'} user record`"
      :title="`${isEditing ? 'Edit' : 'Add'} User`"
    >
      <template v-slot:text>
        <v-row>
          <v-col cols="12" md="6">
            <v-text-field v-model="formModel.firstName" label="First Name"></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field v-model="formModel.lastName" label="Last Name"></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field v-model="formModel.username" label="Username"></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field v-model="formModel.email" label="Email"></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-select
              v-model="formModel.status"
              :items="['ACTIVE', 'INACTIVE']"
              label="Status"
            ></v-select>
          </v-col>
        </v-row>
      </template>

      <v-divider></v-divider>

      <v-card-actions class="bg-surface-light">
        <v-btn text="Cancel" variant="plain" @click="dialog = false"></v-btn>
        <v-spacer></v-spacer>
        <v-btn text="Save" @click="save"></v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref, shallowRef, onMounted, computed } from 'vue'
import api from '../services/api'

const users = ref([])
const dialog = shallowRef(false)
const formModel = ref({})
const isEditing = computed(() => !!formModel.value.id)

const headers = [
  { title: 'First Name', key: 'firstName' },
  { title: 'Last Name', key: 'lastName' },
  { title: 'Username', key: 'username' },
  { title: 'Email', key: 'email' },
  { title: 'Status', key: 'status' },
  { title: 'Roles', key: 'roles' },
  { title: 'Actions', key: 'actions', align: 'end', sortable: false },
]

onMounted(fetchUsers)

function fetchUsers() {
  api
    .get('/api/users/list')
    .then((res) => {
      users.value = res.data
    })
    .catch((err) => {
      console.error('Failed to fetch users', err)
    })
}

function add() {
  formModel.value = {}
  dialog.value = true
}

function edit(id) {
  const found = users.value.find((u) => u.id === id)
  formModel.value = { ...found }
  dialog.value = true
}

function remove(id) {
  if (confirm('Are you sure you want to delete this user?')) {
    api
      .delete(`/api/users/${id}`)
      .then(() => {
        users.value = users.value.filter((u) => u.id !== id)
      })
      .catch((err) => {
        console.error('Failed to delete user', err)
      })
  }
}

function save() {
  if (isEditing.value) {
    api
      .put(`/api/users/${formModel.value.id}`, formModel.value)
      .then(() => {
        fetchUsers()
        dialog.value = false
      })
      .catch((err) => console.error('Failed to update user', err))
  } else {
    api
      .post(`/api/users`, formModel.value)
      .then(() => {
        fetchUsers()
        dialog.value = false
      })
      .catch((err) => console.error('Failed to create user', err))
  }
}
</script>

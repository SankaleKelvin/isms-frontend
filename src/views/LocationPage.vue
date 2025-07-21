
    <template>
      <v-main>
        <v-snackbar v-model="snackbarCreate" :timeout="snackbarTimeout" :color="toolbarColor">
          Record has been created successfully.
          <v-btn text @click="snackbarCreate = false">Close</v-btn>
        </v-snackbar>
        <v-snackbar v-model="snackbarUpdate" :timeout="snackbarTimeout" :color="toolbarColor">
          Record has been updated successfully.
          <v-btn text @click="snackbarUpdate = false">Close</v-btn>
        </v-snackbar>
        <v-snackbar v-model="snackbarDelete" :timeout="snackbarTimeout" :color="toolbarColor">
          Record has been deleted successfully.
          <v-btn text @click="snackbarDelete = false">Close</v-btn>
        </v-snackbar>
        <v-data-table :headers="headers" :items="locations" :sort-by="[{ key: 'id', order: 'asc' }]" class="elevation-1">
          <template v-slot:top>
            <v-toolbar flat :color="toolbarColor">
              <v-toolbar-title>Location</v-toolbar-title>
              <v-divider class="mx-4" inset vertical></v-divider>
              <v-spacer></v-spacer>
              <v-dialog v-model="dialog" max-width="500px" @click:outside="close">
                <template v-slot:activator="{ props }">
                  <v-btn color="dark" dark class="mb-2 fs-6 bg-light" v-bind="props" @click="openDialog">
                    New Location
                  </v-btn>
                </template>
                <v-card>
                  <v-card-title>
                    <span class="text-h5">{{ formTitle }}</span>
                  </v-card-title>
    
                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col cols="12" sm="12" md="12">
                          <v-text-field v-model="editedItem.name" label="Location name" :rules="inputRules" required></v-text-field>
                          <v-textarea v-model="editedItem.areaCode" label="Area Code" :rules="inputRules"></v-textarea>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card-text>
    
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue-darken-1" variant="text" @click="close">
                      Cancel
                    </v-btn>
                    <v-btn color="blue-darken-1" variant="text" @click="save" :disabled="isSaveDisabled">
                      Save
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
              <v-dialog v-model="dialogDelete" max-width="500px"  @click:outside="closeDelete">
                <v-card>
                  <v-card-title class="text-h5">Are you sure you want to delete this location?</v-card-title>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue-darken-1" variant="text" @click="closeDelete">Cancel</v-btn>
                    <v-btn color="blue-darken-1" variant="text" @click="deleteItemConfirm()">OK</v-btn>
                    <v-spacer></v-spacer>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-toolbar>
          </template>
          <template v-slot:[`item.actions`]="{ item }">
            <v-icon size="small" class="me-2" @click="editItem(item.key)">
              mdi-pencil
            </v-icon>
            <v-icon size="small" @click="deleteItem(item.key)">
              mdi-delete
            </v-icon>
          </template>
          <template v-slot:no-data>
            <v-btn color="primary" @click="initialize">
              Reset
            </v-btn>
          </template>
        </v-data-table>
      </v-main>
    </template>
     
    <script>
    import { ref, computed, onMounted } from 'vue';
    import { useLocationsStore } from '../stores/locations';
    import { useColorsStore } from '../stores/colors';
    
    export default {
      setup() {
        const locationsStore = useLocationsStore();
        
        const snackbarCreate = ref(false);
        const snackbarUpdate = ref(false);
        const snackbarDelete = ref(false);
        const toolbarColor = ref('info');
        const snackbarTimeout = 3000;
        
        const footerColoring = useColorsStore();
        const headers = [
          { title: 'ID', key: 'id', align: 'start' },
          { title: 'Location Name', align: 'start', sortable: true, key: 'name' },
          { title: 'Actions', key: 'actions', sortable: false },
        ];
    
        const locations = computed(() => locationsStore.locations);
        const inputRules = computed(() => [(v) => !!v && v.length >=3 || 'Minimum length is 3 characters']);        
        const editedItem = computed(() => locationsStore.editedItem);
        const formTitle = computed(() => (locationsStore.editedIndex === -1 ? 'New Location' : 'Edit Location'));    
        const dialog = computed(() => locationsStore.dialog);
        const dialogDelete = computed(() => locationsStore.dialogDelete);
        
        const isSaveDisabled = computed(() => {
                return !inputRules.value[0](editedItem.value.name);
              });
        async function save() {
          if (locationsStore.editedIndex > -1) {
            await locationsStore.updateLocation(locationsStore.editedItem);
            snackbarUpdate.value = true;
            toolbarColor.value = 'warning';
            footerColoring.setFooterColor('warning');
            setTimeout(() => {
              snackbarCreate.value = false;
              toolbarColor.value = 'info';
              footerColoring.setFooterColor('info');
            }, snackbarTimeout);
          } else {
            await locationsStore.createLocation(locationsStore.editedItem);
            snackbarCreate.value = true;
            toolbarColor.value = 'success';
            footerColoring.setFooterColor('success');
            setTimeout(() => {
              snackbarCreate.value = false;
              toolbarColor.value = 'info';
              footerColoring.setFooterColor('info');
            }, snackbarTimeout);
          }
          close();
        }
        
        function editItem(id) {
          locationsStore.editItem(id);
        }
    
        function deleteItem(id) {
          locationsStore.deleteLocation(id);
        }
    
        function deleteItemConfirm() {
          locationsStore.deleteLocationConfirm();
          snackbarDelete.value = true;
            toolbarColor.value = 'danger';
            footerColoring.setFooterColor('danger');
            setTimeout(() => {
              snackbarCreate.value = false;
              toolbarColor.value = 'info';
              footerColoring.setFooterColor('info');
            }, snackbarTimeout);
        }
    
        function openDialog() {
          locationsStore.openDialog();
        }
    
        function close() {
          locationsStore.close();
        }
    
        function closeDelete() {
          locationsStore.closeDelete();
        }
    
        function initialize() {
          locationsStore.initialize();
        }
    
        // Fetch locations when the component is mounted
        onMounted(() => {
          locationsStore.fetchLocations();
        });
    
        return {
          snackbarCreate,
          snackbarUpdate,
          snackbarDelete,
          snackbarTimeout,
          toolbarColor,
          headers,
          locations,
          editedItem,
          formTitle,
          dialog,
          dialogDelete,
          inputRules,
          isSaveDisabled,
          openDialog,
          editItem,
          deleteItem,
          deleteItemConfirm,
          close,
          closeDelete,
          initialize,
          save, 
        };
      },
    };
    </script>
     
// locations.js
import { defineStore } from 'pinia';
import api from '../services/api';

export const useLocationsStore = defineStore('locations', {
  state: () => ({
    locations: [],
    dialog: false,
    dialogDelete: false,
    editedIndex: -1,
    editedItem: {
      id: '',
      name: '',
      areaCode: '',
    },
    defaultItem: {
      id: '',
      name: '',
      areaCode: '',
    },
    itemToDelete: null,
  }),
  actions: {
    async fetchLocations() {
      try {
        const response = await api.get('location');
        // Transform the data to include a key property for v-data-table actions
        this.locations = response.data.map(location => ({
          ...location,
          key: location.id
        }));
      } catch (error) {
        console.error('Error fetching locations', error);
      }
    },
    
    async createLocation(location) {
      try {
        const response = await api.post('location', location);
        // Add key property for v-data-table actions
        const newLocation = { ...response.data, key: response.data.id };
        this.locations.push(newLocation);
        return true;
      } catch (error) {
        console.error('Error creating location', error);
        return false;
      }
    },
    
    async updateLocation(location) {
      try {
        await api.put(`location/${location.id}`, location);
        const index = this.locations.findIndex((loc) => loc.id === location.id);
        if (index !== -1) {
          // Preserve the key property
          const key = this.locations[index].key;
          this.locations[index] = { ...location, key };
        }
        return true;
      } catch (error) {
        console.error('Error updating location', error);
        return false;
      }
    },
    
    deleteLocation(id) {
      this.itemToDelete = id;
      this.dialogDelete = true;
    },
    
    async deleteLocationConfirm() {
      try {
        await api.delete(`location/${this.itemToDelete}`);
        this.locations = this.locations.filter((loc) => loc.id !== this.itemToDelete);
        return true;
      } catch (error) {
        console.error('Error deleting location', error);
        return false;
      } finally {
        this.closeDelete();
      }
    },
    
    openDialog() {
      this.editedIndex = -1;
      this.editedItem = { ...this.defaultItem };
      this.dialog = true;
    },
    
    async editItem(id) {
      try {
        console.log("Item to edit is ", id);
        const response = await api.get(`location/${id}`);
        this.editedIndex = this.locations.findIndex(loc => loc.id === id);
        this.editedItem = { ...response.data };
        this.dialog = true;
      } catch (error) {
        console.error('Error fetching item for pre-update', error);
      }
    },
    
    close() {
      this.dialog = false;
      // Reset the edited item after closing the dialog
      setTimeout(() => {
        this.editedItem = { ...this.defaultItem };
        this.editedIndex = -1;
      }, 0);
    },
    
    closeDelete() {
      this.dialogDelete = false;
      setTimeout(() => {
        this.itemToDelete = null;
      }, 0);
    },
    
    initialize() {
      this.fetchLocations();
    }
  },
});
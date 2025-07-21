import { defineStore } from "pinia";

export const useColorsStore = defineStore('colors', {
    state: () => ({
        footerColor: 'info' //initial color for the toolbar.
    }),

    actions: {
        //methods to update the colors
        setFooterColor(color){
            this.footerColor = color;
        },

    }
})
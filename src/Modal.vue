<template>
<v-dialog
      v-model="modal"
      width="auto"
    >
      <v-card>
        <v-card-text>
            {{  project }}
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" block @click="modal = false">Close Dialog</v-btn>
        </v-card-actions>
      </v-card>
</v-dialog>
</template>
<script>
import {inject} from 'vue';
export default {
     name: 'Modal',
    data() {
        return {
            modal: false,
            project: {}
        }
    },
    mounted() {
        
    const mitt = inject('mitt');
    mitt.on('open-modal', (project) => {
        this.project = project;
      this.modal = true;
    })
  

    }
}
</script>
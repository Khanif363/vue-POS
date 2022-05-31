<template>
  <v-dialog
    v-model="dialog"
    persistent
    max-width="600px"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        color="accent"
        justify="center"
        class="button-icon-text"
        v-bind="attrs"
        v-on="on"
      >
        <v-icon class="mr-1">
          {{ icons.mdiPlusBox }}
        </v-icon>
        Add Item
      </v-btn>
    </template>
    <v-card>
      <v-card-title>
        <span class="text-h5">Add Category</span>
      </v-card-title>
      <v-card-text>
        <v-form>
          <v-container>
            <v-row>
              <v-col
                cols="12"
                sm="12"
              >
                <v-text-field
                  v-model="data.name"
                  label="Product Name"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
        <small>*indicates required field</small>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="error"
          @click="dialog = false"
        >
          Close
        </v-btn>
        <v-btn
          color="accent"
          @click="dialog = false, createCategory()"
        >
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import {
  mdiPlusBox,
} from '@mdi/js'

export default {
  data: () => ({
    dialog: false,
    icons: {
      mdiPlusBox,
    },
    data: {
      name: '',
    },
    category_id: '',
    loading: true,
  }),
  computed: {
    ...mapGetters({
      categories: 'data/categories',
    }),
  },
  created() {
    this.getCategory()
  },
  methods: {
    ...mapActions({
      loadCategory: 'data/loadCategory',
      addCategory: 'data/addCategory',
    }),
    getCategory() {
      this.loadCategory().then(() => {
        this.loading = false
      })
    },
    createCategory() {
      console.log(this.data.name)
      this.$swal({
        title: 'Are you sure?',
        text: 'You can add this category',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, add category!',
      })
        .then(result => {
          if (result.isConfirmed) {
            this.addCategory(this.data.name).then(() => {
              this.data.name = ''
              this.$swal(
                'Added!',
                'Your category has been added.',
                'success',
              )
              console.log('add-ok')
            })
              .catch(() => {
                this.$swal(
                  'Error!',
                  'Your category has not been added.',
                  'error',
                )
                console.log('add-error')
              })
          }
        })
    },
  },
}
</script>

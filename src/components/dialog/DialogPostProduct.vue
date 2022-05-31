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
        <span class="text-h5">Add Product</span>
      </v-card-title>
      <v-card-text>
        <v-form>
          <v-container>
            <v-row>
              <v-col
                cols="12"
                sm="6"
              >
                <v-text-field
                  v-model="add.name"
                  label="Product Name"
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
                sm="6"
              >
                <v-card-text>
                  <v-select
                    v-model="add.category_id"
                    :items="categories"
                    label="Select Category"
                    item-text="name"
                    item-value="id"
                  ></v-select>
                </v-card-text>
              </v-col>
              <v-col
                cols="12"
                sm="6"
              >
                <v-text-field
                  v-model="add.quantity"
                  label="Quantity"
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
                sm="6"
              >
                <v-text-field
                  v-model="add.price"
                  label="Price"
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
          @click="dialog = false, createProduct()"
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
    data: [],
    category_id: '',
    add: {
      name: '',
      category_id: '',
      quantity: '',
      price: '',
    },
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
      addProduct: 'data/addProduct',
    }),
    getCategory() {
      this.loadCategory().then(() => {
        this.loading = false
      })
    },
    createProduct() {
      this.$swal({
        title: 'Are you sure?',
        text: 'You can add this product',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, add product!',
      })
        .then(result => {
          if (result.isConfirmed) {
            this.addProduct(this.add).then(() => {
              this.add = ''
              this.$swal(
                'Added!',
                'Your product has been added.',
                'success',
              )
              console.log('add-ok')
            })
              .catch(() => {
                this.$swal(
                  'Error!',
                  'Your product has not been added.',
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

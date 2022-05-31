<template>
  <v-dialog
    v-model="dialog"
    persistent
    max-width="600px"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        color="primary"
        justify="center"
        class="mx-1 button-icon"
        v-bind="attrs"
        v-on="on"
      >
        <v-icon class="mr-1">
          {{ icons.mdiPencil }}
        </v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-card-title>
        <span class="text-h5">Edit Product</span>
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
                  v-model="edit.name"
                  label="Product Name"
                >
                </v-text-field>
              </v-col>
              <v-col
                cols="12"
                sm="6"
              >
                <v-card-text>
                  <v-select
                    v-model="edit.category_id"
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
                  v-model="edit.quantity"
                  label="Quantity"
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
                sm="6"
              >
                <v-text-field
                  v-model="edit.price"
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
          @click="dialog = false, editProduct()"
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
  mdiPlusBox, mdiPencil,
} from '@mdi/js'

export default {
  props: ['id'],
  data: () => ({
    dialog: false,
    icons: {
      mdiPlusBox,
      mdiPencil,
    },
    data: [],
    category_id: '',
    edit: {
      id: '',
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
      productid: 'data/productid',
    }),
  },
  created() {
    this.getCategory()
    this.getDetail()
  },
  methods: {
    ...mapActions({
      loadCategory: 'data/loadCategory',
      detailProduct: 'data/detailProduct',
      updateProduct: 'data/updateProduct',
    }),
    getCategory() {
      this.loadCategory().then(() => {
      })
    },
    getDetail() {
      this.detailProduct(this.id)

      // console.log(this.id)
    },
    editProduct() {
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
            this.edit.id = this.id
            this.updateProduct(this.edit).then(() => {
              this.edit = ''
              this.$swal(
                'Updated!',
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
                this.id = null
              })
              .finally(() => {
                this.id = null
              })
          }
        })
    },
  },
}
</script>

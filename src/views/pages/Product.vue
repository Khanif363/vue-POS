<template>
  <!-- basic -->
  <v-row
    class="mt-1"
    align-center
    justify="center"
  >
    <v-col cols="11">
      <v-card>
        <v-row>
          <v-col cols="4">
            <v-card-title
              justify="center"
              align-center
            >
              Product
            </v-card-title>
          </v-col>
          <v-col cols="4">
            <v-text-field
              v-model="search"
              label="Search"
              rounded
              dense
              outlined
              :prepend-inner-icon="icons.mdiMagnify"
              class="app-bar-search flex-grow-0"
              hide-details
            ></v-text-field>
          </v-col>
          <v-col cols="2">
            <DialogPostProduct />
          </v-col>
        </v-row>
        <LoadingTable v-if="loading" />
        <v-simple-table v-else>
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-uppercase">
                  No.
                </th>
                <th class="text-center text-uppercase">
                  BarCode
                </th>
                <th class="text-center text-uppercase">
                  Name
                </th>
                <th class="text-center text-uppercase">
                  Price
                </th>
                <th class="text-center text-uppercase">
                  Category
                </th>
                <th class="text-center text-uppercase">
                  Quantity
                </th>
                <th class="text-center text-uppercase">
                  Image
                </th>
                <th class="text-center text-uppercase">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(products, index) in filterProduct"
                :key="products.id"
              >
                <td>{{ index + 1 }}</td>
                <td class="text-center">
                  {{ products.code }}
                </td>
                <td class="text-center">
                  {{ products.name }}
                </td>
                <td class="text-center">
                  {{ products.price }}
                </td>
                <td class="text-center">
                  {{ products.category.name }}
                </td>
                <td class="text-center">
                  {{ products.quantity }}
                </td>
                <td class="text-center">
                  <img
                    :src="products.image"
                    alt="image"
                    width="50"
                    height="50"
                  />
                </td>
                <td class="text-center">
                  <!-- <v-btn
                    color="primary"
                    dark
                    justify="center"
                    class="mx-1 button-icon"
                    @click="editProduct(products.id)"
                  >
                    <v-icon>{{ icons.mdiPencil }}</v-icon>
                  </v-btn> -->
                  <DialogEditProduct :id="products.id" />
                  <v-btn
                    color="error"
                    dark
                    justify="center"
                    class="mx-1 button-icon"
                    @click="delProduct(products.id)"
                  >
                    <v-icon>{{ icons.mdiDelete }}</v-icon>
                  </v-btn>
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
        <v-divider></v-divider>
        <template v-if="loadingPage">
          <div class="text-center">
            <v-progress-circular
              :width="3"
              :size="25"
              color="primary"
              indeterminate
              class="my-3"
            ></v-progress-circular>
          </div>
        </template>
        <template v-else>
          <div class="text-center">
            <v-pagination
              v-model="page"
              :length="pageProduct.last_page"
              :prev-icon="icons.mdiMenuLeft"
              :next-icon="icons.mdiMenuRight"
              @input="handlePageChange"
            ></v-pagination>
          </div>
        </template>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import {
  mdiPlusBox, mdiMagnify, mdiPencil, mdiDelete, mdiCached, mdiMenuLeft, mdiMenuRight,
} from '@mdi/js'
import LoadingTable from '@/components/LoadingTable.vue'
import DialogPostProduct from '@/components/dialog/DialogPostProduct.vue'
import DialogEditProduct from '@/components/dialog/DialogEditProduct.vue'

export default {
  components: {
    LoadingTable,
    DialogPostProduct,
    DialogEditProduct,
  },
  data() {
    return {
      icons: {
        mdiPlusBox,
        mdiMagnify,
        mdiPencil,
        mdiDelete,
        mdiCached,
        mdiMenuLeft,
        mdiMenuRight,
      },

      data: '',
      search: '',
      category_id: '',
      add: {
        name: '',
        category_id: '',
        quantity: '',
        price: '',
      },
      page: 1,
      loadingPage: false,
      loading: true,
      loader: null,
    }
  },
  created() {
    this.getProduct()
  },
  computed: {
    ...mapGetters({
      productPage: 'data/productPage',
      pageProduct: 'data/pageProduct',
    }),
    filterProduct() {
      return this.productPage.filter(
        item => item.name.toLowerCase().includes(this.search.toLowerCase())
          || item.code.toLowerCase().includes(this.search.toLowerCase()),
      )
    },
  },
  methods: {
    ...mapActions({
      loadProductPage: 'data/loadProductPage',
      deleteProduct: 'data/deleteProduct',
    }),
    getProduct() {
      this.loadProductPage().then(() => {
        this.loading = false
      })
    },
    delProduct(id) {
      this.$swal({
        title: 'Are you sure?',
        text: 'You can delete this product',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
      }).then(result => {
        if (result.isConfirmed) {
          this.deleteProduct(id)
            .then(() => {
              this.$swal('Deleted!', 'Your file has been deleted.', 'success')
              console.log('delete-ok')
            })
            .catch(() => {
              this.$swal('Error!', 'Your product has not been deleted.', 'error')
              console.log('delete-error')
            })
        }
      })
    },
    handlePageChange(value) {
      this.loadingPage = true
      this.loadProductPage(value).then(() => {
        this.loadingPage = false
      })
    },
  },
}
</script>

<style></style>

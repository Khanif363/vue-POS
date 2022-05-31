<template>
  <v-row class="mt-1">
    <v-col cols="5">
      <v-card>
        <v-row class="mx-auto">
          <v-col cols="12">
            <v-text-field
              rounded
              dense
              outlined
              label="Scan BarCode"
              class="app-bar-search flex-grow-0"
              hide-details
            ></v-text-field>
          </v-col>
          <!-- <v-col cols="2">
            <v-btn
              rounded
              color="primary"
              class="button-icon"
            >
              <v-icon>{{ icons.mdiMagnify }}</v-icon>
            </v-btn>
          </v-col> -->
        </v-row>
        <v-simple-table class="mt-2">
          <template v-slot:default>
            <!-- <v-responsive
              class="overflow-y-auto"
              max-height="calc(90vh - 520px)"
            > -->
            <thead>
              <tr>
                <th class="text-uppercase">
                  Product Name
                </th>
                <th class="text-center text-uppercase">
                  Quantity
                </th>
                <th class="text-center text-uppercase">
                  Price
                </th>
                <th class="text-center text-uppercase">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="products in allPOS"
                :key="products.id"
              >
                <td>{{ products.name }}</td>
                <td class="text-center">
                  {{ products.qty }}
                </td>
                <td class="text-center">
                  {{ products.price }}
                </td>
                <td class="text-center">
                  <v-btn
                    color="accent"
                    fab
                    x-small
                    dark
                    @click="addQty(products.id)"
                  >
                    <v-icon>{{ icons.mdiPlus }}</v-icon>
                  </v-btn>
                  <v-btn
                    color="accent"
                    fab
                    x-small
                    dark
                    @click="reduceQty(products.id)"
                  >
                    <v-icon>{{ icons.mdiMinus }}</v-icon>
                  </v-btn>
                  <v-btn
                    color="error"
                    fab
                    x-small
                    dark
                    icon
                    @click="removeItem(products.id)"
                  >
                    <v-icon>{{ icons.mdiClose }}</v-icon>
                  </v-btn>
                </td>
              </tr>
            </tbody>
            <!-- </v-responsive> -->
          </template>
        </v-simple-table>
      </v-card>
    </v-col>
    <v-col cols="7">
      <v-card>
        <v-row class="mx-auto">
          <v-col cols="12">
            <v-text-field
              v-model="search"
              rounded
              dense
              outlined
              label="Search Product"
              class="app-bar-search flex-grow-0 mx-auto px-5"
              hide-details
            ></v-text-field>
          </v-col>
          <!-- <v-col
            cols="3"
          > -->
          <!-- <v-btn
              rounded
              color="primary"
            >
              <v-icon>{{ icons.mdiMagnify }}</v-icon>
            </v-btn> -->
          <!-- </v-col> -->
        </v-row>
        <LoadingTable
          v-if="loading"
          class="my-2"
        />
        <v-row class="mx-0">
          <v-col
            v-for="products in filterProduct"
            :key="products.id"
            cols="12"
            xs="6"
            sm="6"
            md="4"
          >
            <v-card
              class="mx-auto my-6"
              max-width="374"
              @click="addPOS(products)"
            >
              <v-img
                height="150"
                src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
              ></v-img>

              <v-card-title>{{ products.name }}</v-card-title>

              <v-card-text>
                <v-row class="mx-0">
                </v-row>

                <div class="my-2 text-subtitle-1">
                  $ {{ products.price }}
                </div>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import {
  mdiMagnify, mdiPlus, mdiMinus, mdiClose,
} from '@mdi/js'
import LoadingTable from '@/components/LoadingTable.vue'

export default {
  name: 'POS',
  components: {
    LoadingTable,
  },
  data() {
    return {
      icons: {
        mdiMagnify,
        mdiPlus,
        mdiMinus,
        mdiClose,
      },
      data: '',
      search: '',
      loading: true,
    }
  },
  computed: {
    ...mapGetters({
      product: 'data/product',
      allPOS: 'data/allPOS',
    }),
    filterProduct() {
      return this.product.filter(product => product.name.toLowerCase().includes(this.search.toLowerCase()))
    },
  },
  created() {
    this.getProduct()
    if (this.product !== null) {
      this.loading = false
    }
  },
  methods: {
    ...mapActions({
      loadProduct: 'data/loadProduct',
      createPOS: 'data/addPOS',
      addQTY: 'data/addQty',
      reduceQTY: 'data/reduceQty',
      removeITEM: 'data/removeItem',
    }),
    getProduct() {
      this.loadProduct().then(() => {
        this.loading = false
      })
    },
    addPOS(product) {
      this.createPOS(product)
    },
    addQty(id) {
      this.addQTY(id)
    },
    reduceQty(id) {
      this.reduceQTY(id)
    },
    removeItem(id) {
      this.removeITEM(id)
    },
  },
}
</script>

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
              align="center"
              justify="center"
              align-center
            >
              Transaction
            </v-card-title>
          </v-col>
          <v-col
            cols="4"
            align="right"
          >
            <v-text-field
              v-model="search"
              rounded
              dense
              outlined
              :prepend-inner-icon="icons.mdiMagnify"
              class="app-bar-search flex-grow-0"
              hide-details
            ></v-text-field>
          </v-col>
          <v-col
            cols="2"
          >
            <v-btn
              color="accent"
              justify="center"
              class="button-icon-text"
            >
              <v-icon class="mr-1">
                {{ icons.mdiPlusBox }}
              </v-icon>
              Add Item
            </v-btn>
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
                  Date
                </th>
                <th class="text-center text-uppercase">
                  Code
                </th>
                <th class="text-center text-uppercase">
                  Name
                </th>
                <th class="text-center text-uppercase">
                  Total Price
                </th>
                <th class="text-center text-uppercase">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="transaction in filTrans"
                :key="transaction.id"
              >
                <td>{{ transaction.id }}</td>
                <td class="text-center">
                  {{ transaction.created_at }}
                </td>
                <td class="text-center">
                  {{ transaction.transaction_code }}
                </td>
                <td class="text-center">
                  {{ transaction.name }}
                </td>
                <td class="text-center">
                  {{ transaction.total_price }}
                </td>
                <td class="text-center">
                  <v-btn
                    color="primary"
                    dark
                    justify="center"
                    class="mx-1 button-icon"
                  >
                    <v-icon>{{ icons.mdiPencil }}</v-icon>
                  </v-btn>
                  <v-btn
                    color="error"
                    dark
                    justify="center"
                    class="mx-1 button-icon"
                  >
                    <v-icon>{{ icons.mdiDelete }}</v-icon>
                  </v-btn>
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import {
  mdiPlusBox, mdiMagnify, mdiPencil, mdiDelete,
} from '@mdi/js'
import { mapGetters, mapActions } from 'vuex'
import LoadingTable from '@/components/LoadingTable.vue'

export default {
  components: {
    LoadingTable,
  },
  data() {
    return {
      icons: {
        mdiPlusBox,
        mdiMagnify,
        mdiPencil,
        mdiDelete,
      },

      data: '',
      search: '',
      category_id: '',
      loading: true,
    }
  },
  created() {
    console.log(this.loading)
    this.getTransactions()
  },
  computed: {
    ...mapGetters({
      trans: 'data/transactions',
    }),
    filTrans() {
      return this.trans.filter(item => item.name.toLowerCase().includes(this.search.toLowerCase()) || item.transaction_code.toLowerCase().includes(this.search.toLowerCase()))
    },
  },
  methods: {
    ...mapActions({
      loadTransactions: 'data/loadTransactions',
    }),
    getTransactions() {
      this.loadTransactions().then(() => {
        this.loading = false
      })
    },
  },
}
</script>

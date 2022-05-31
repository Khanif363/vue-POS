<template>
  <div>
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
                  Category
                </v-card-title>
              </v-col>
              <v-col
                cols="4"
              >
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
              <v-col
                cols="2"
              >
                <DialogPostCategory />
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
                      Categories
                    </th>
                    <th class="text-center text-uppercase">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(categoriess, index) in filterCategory"
                    :key="categoriess.id"
                  >
                    <td>{{ index+1 }}</td>
                    <td class="text-center">
                      {{ categoriess.name }}
                    </td>
                    <td class="text-center">
                      <DialogEditCategory :id="categoriess.id" />
                      <v-btn
                        color="error"
                        dark
                        justify="center"
                        class="mx-1 button-icon"
                        @click="delCategory(categoriess.id)"
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
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import {
  mdiPlusBox, mdiMagnify, mdiPencil, mdiDelete,
} from '@mdi/js'
import LoadingTable from '@/components/LoadingTable.vue'
import DialogPostCategory from '@/components/dialog/DialogPostCategory.vue'
import DialogEditCategory from '@/components/dialog/DialogEditCategory.vue'

export default {
  components: {
    LoadingTable,
    DialogPostCategory,
    DialogEditCategory,
  },
  data() {
    return {
      data: '',
      search: '',
      loading: true,
      icons: {
        mdiPlusBox,
        mdiMagnify,
        mdiPencil,
        mdiDelete,
      },
    }
  },
  created() {
    this.getCategory()
  },
  computed: {
    ...mapGetters({
      categories: 'data/categories',
    }),
    filterCategory() {
      return this.categories.filter(category => category.name.toLowerCase().includes(this.search.toLowerCase()))
    },
  },
  methods: {
    ...mapActions({
      loadCategory: 'data/loadCategory',
      deleteCategory: 'data/deleteCategory',
    }),
    getCategory() {
      this.loadCategory().then(() => {
        this.loading = false
      })
    },
    delCategory(id) {
      this.$swal({
        title: 'Are you sure?',
        text: 'You can delete this category',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
      })
        .then(result => {
          if (result.isConfirmed) {
            this.deleteCategory(id).then(() => {
              this.$swal(
                'Deleted!',
                'Your file has been deleted.',
                'success',
              )
              console.log('delete-ok')
            })
              .catch(() => {
                this.$swal(
                  'Error!',
                  'Your category has not been deleted.',
                  'error',
                )
                console.log('delete-error')
              })
          }
        })
    },
  },
}
</script>

<style>

</style>

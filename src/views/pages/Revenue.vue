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
          <v-col cols="5">
            <v-card-title
              align="center"
              justify="center"
              align-center
            >
              Total Revenue
            </v-card-title>
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
                  Revenue
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(revenues, index) in data"
                :key="index"
              >
                <td>{{ index + 1 }}</td>
                <td class="text-center">
                  {{ revenues.date }}
                </td>
                <td class="text-center">
                  {{ revenues.revenue }}
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
        <v-divider></v-divider>
        <v-row
          class="mx-auto mt-2"
        >
          <v-col cols="9">
            <h4 class="text-start">
              Total Revenue
            </h4>
          </v-col>
          <v-col cols="2">
            <h4 class="text-center">
              {{ total_revenue }}
            </h4>
          </v-col>
        </v-row>
        <template>
          <div class="text-center">
            <v-pagination
              v-model="page"
              color="primary"
              elevation="2"
              :length="4"
              :prev-icon="icons.mdiMenuLeft"
              :next-icon="icons.mdiMenuRight"
            ></v-pagination>
          </div>
        </template>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { mdiMenuLeft, mdiMenuRight } from '@mdi/js'
import axios from 'axios'
import LoadingTable from '@/components/LoadingTable.vue'

export default {
  components: {
    LoadingTable,
  },
  data() {
    return {
      data: '',
      total_revenue: 0,
      loading: true,
      page: 1,
      icons: {
        mdiMenuLeft,
        mdiMenuRight,
      },
    }
  },
  created() {
    axios.get('reports/revenue')
      .then(response => {
        this.data = response.data.data
        console.log(this.data)
      })
      .catch(error => {
        console.log(error)
      })
      .finally(() => {
        this.loading = false
      })
  },
}
</script>

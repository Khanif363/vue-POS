<template>
  <div>
    <template v-if="authenticated">
      <component :is="resolveLayout">
      <router-view></router-view>
      </component>
    </template>
    <template v-else>
      <router-view></router-view>
    </template>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { computed } from '@vue/composition-api'
import { useRouter } from '@/utils'

import LayoutBlank from '@/layouts/Blank.vue'
import LayoutContent from '@/layouts/Content.vue'

// import TheNavigation from '@/components/TheNavigation';

export default {
  components: {
    LayoutBlank,
    LayoutContent,
  },
  setup() {
    const { route } = useRouter()

    const resolveLayout = computed(() => {
      // Handles initial route
      if (route.value.name === null) return null

      if (route.value.meta.layout === 'blank') return 'layout-blank'

      return 'layout-content'
    })

    return {
      resolveLayout,
    }
  },
  computed: {
    ...mapGetters({
      authenticated: 'auth/authenticated',
      user: 'auth/user',
    }),
  },
  methods: {
    ...mapActions({
      signOutAction: 'auth/signOut',
    }),
    signOut() {
      this.signOutAction().then(() => {
        this.$router.replace({
          name: 'home',
        })
      })
    },
  },
}
</script>

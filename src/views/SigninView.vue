<template>
  <form
    action=""
    @submit.prevent="submit"
  >
    <!-- {{ form }} -->
    <div>
      <label for="email">Email</label>
      <input
        id="email"
        v-model="form.email"
        type="text"
        name="email"
      >
    </div>
    <div>
      <label for="password">Password</label>
      <input
        id="password"
        v-model="form.password"
        type="password"
        name="password"
      >
    </div>
    <div>
      <button type="submit">
        Submit
      </button>
    </div>
  </form>
</template>

<script>

// @ is an alias to /src
import { mapActions } from 'vuex'

export default {
  name: 'SigninView',
  components: {
  },
  data() {
    return {
      form: {
        email: '',
        password: '',
      },
    }
  },
  methods: {
    ...mapActions({
      signIn: 'auth/signIn',
    }),
    submit() {
      this.signIn(this.form).then(() => {
        this.$router.replace({
          name: 'dashboard',
        })
      }).catch(() => {
        alert('Gagal Login')
      })
    },
  },
}
</script>

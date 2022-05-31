<template>
  <form action="" @submit.prevent="submit">
  <!-- {{ form }} -->
  <div>
    <label for="name">Nama</label>
    <input type="text" name="name" id="name" v-model="form.name">
  </div>
  <div>
    <label for="email">Email</label>
    <input type="text" name="email" id="email" v-model="form.email">
  </div>
  <div>
    <label for="password">Password</label>
    <input type="password" name="password" id="password" v-model="form.password">
  </div>
  <div>
    <button type="submit">Submit</button>
  </div>
  </form>
</template>

<script>
// @ is an alias to /src
import axios from 'axios';
// import { mapActions } from 'vuex';

export default {
  name: 'SigninView',
  components: {
  },
  data() {
    return {
      form: {
        name: '',
        email: '',
        password: ''
      }
    }
  },
  methods: {
    submit() {
      axios.post('auth/register' , this.form)
      .then(() => {
        alert('Berhasil Registrasi')
        this.$router.replace({
          name: 'signin'
        })
      }).catch(() => {
        alert('Gagal Registrasi')
      });
    }
  },
}
</script>

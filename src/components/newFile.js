import { mapGetters, mapActions } from 'vuex';

export default {
computed: {
...mapGetters({
authenticated: 'auth/authenticated',
user: 'auth/user'
})
},
methods: {
...mapActions({
signOutAction: 'auth/signOut'
}),
signOut() {
this.signOutAction().then(() => {
this.$router.replace({
name: 'home'
});
});
}
}
};

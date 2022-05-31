import axios from 'axios'

export default {
  namespaced: true,
  state: {
    product: null,
    productPage: null,
    categories: null,
    productid: null,
    daftarPOS: [
      {
        name: 'POS 1',
      },
    ],
    transactions: null,
  },
  getters: {
    product(state) {
      return state.product
    },
    pageProduct(state) {
      return state.productPage
    },
    categories(state) {
      return state.categories
    },
    productid(state) {
      return state.productid
    },
    allPOS(state) {
      return state.daftarPOS
    },
    transactions(state) {
      return state.transactions
    },
    productPage(state) {
      return state.productPage.data
    },
  },
  mutations: {
    SET_PRODUCT(state, product) {
      state.product = product
    },
    SET_PRODUCT_PAGE(state, productPage) {
      state.productPage = productPage
    },
    SET_DETAIL_PRODUCT(state, productid) {
      state.productid = productid
    },
    SET_CATEGORIES(state, categories) {
      state.categories = categories
    },
    SET_DAFTAR_POS(state, item) {
      const addedItem = state.daftarPOS.find(
        product => product.name === item.name,
      )
      if (addedItem) {
        addedItem.qty++
        console.log('addedItem', addedItem)
      } else {
        state.daftarPOS.push({ ...item, qty: 1 })
      }
    },
    ADD_QTY(state, id) {
      const currentItem = state.daftarPOS.find(product => product.id === id)
      currentItem.qty++
    },
    REDUCE_QTY(state, id) {
      const currentItem = state.daftarPOS.find(product => product.id === id)
      if (currentItem.qty > 1) {
        currentItem.qty--
      } else {
        state.daftarPOS = state.daftarPOS.filter(product => product.id !== id)
      }
    },
    REMOVE_ITEM(state, id) {
      state.daftarPOS = state.daftarPOS.filter(product => product.id !== id)
    },
    SET_TRANSACTIONS(state, transactions) {
      state.transactions = transactions
    },
  },
  actions: {
    async loadProduct({ commit }) {
      const response = await axios.get('products')
      commit('SET_PRODUCT', response.data.product)
    },
    async loadProductPage({ commit }, page) {
      const response = await axios.get(`products?page=${page}`, { delayed: false })
      commit('SET_PRODUCT_PAGE', response.data.data)
    },
    async deleteProduct({ dispatch }, id) {
      await axios.delete(`products/${id}`)

      dispatch('loadProduct')
    },
    async addProduct({ dispatch }, add) {
      await axios.post('products', add)
      dispatch('loadProduct')
    },
    async detailProduct({ commit, state }, id) {
      const response = await axios.get(`products/${id}`)
      commit('SET_DETAIL_PRODUCT', response.data.data)
      console.log(state.productid.id)
    },
    async updateProduct({ dispatch }, update) {
      await axios.put(`products/${update.id}`, update)
      dispatch('loadProduct')

      // this.update.id = null
    },
    async loadCategory({ commit }) {
      const response = await axios.get('categories')
      commit('SET_CATEGORIES', response.data.data)
    },
    async deleteCategory({ dispatch }, id) {
      await axios.delete(`categories/${id}`)
      dispatch('loadCategory')
    },
    async addCategory({ dispatch }, name) {
      console.log(name)

      await axios.post('categories/', { name })

      dispatch('loadCategory')
    },
    async updateCategory({ dispatch }, name) {
      await axios.put(`categories/${name.id}`, name)
      dispatch('loadCategory')
    },
    addPOS({ commit }, daftarPOS) {
      commit('SET_DAFTAR_POS', daftarPOS)
    },
    addQty({ commit }, id) {
      commit('ADD_QTY', id)
    },
    reduceQty({ commit }, id) {
      commit('REDUCE_QTY', id)
    },
    removeItem({ commit }, id) {
      commit('REMOVE_ITEM', id)
    },
    async loadTransactions({ commit }) {
      await axios.get('transactions').then(response => {
        commit('SET_TRANSACTIONS', response.data.data)
      })
    },
  },
}

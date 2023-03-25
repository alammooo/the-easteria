import { createApp } from "vue"
import { createPinia } from "pinia"
import VueAwesomePaginate from "vue-awesome-paginate"
import Toastify from "toastify-js"

import "toastify-js/src/toastify.css"
import "vue-awesome-paginate/dist/style.css"

import App from "./App.vue"
import router from "./router"
import { markRaw } from "vue"

const pinia = createPinia()
pinia.use(({ store }) => {
  store.router = markRaw(router)
})

const app = createApp(App)
app.use(Toastify)
app.use(VueAwesomePaginate)
app.use(pinia)
app.use(router)

app.mount("#app")

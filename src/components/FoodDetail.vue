<script>
import { mapActions, mapState, mapWritableState } from "pinia"
import { useCounterStore } from "../stores/store"
import Loader from "./Loader.vue"
import MissingView from "../views/MissingView.vue"

export default {
  components: {
    Loader,
    MissingView,
  },
  methods: {
    ...mapActions(useCounterStore, [
      "fetchFoodById",
      "addBookmark",
      "fetchQrCode",
    ]),
    getBackgroundClass() {
      const imageUrl = require("@/assets/images/food-details.jpg")
      return `bg-url(${imageUrl})`
    },
  },
  computed: {
    ...mapWritableState(useCounterStore, ["foodDetail", "qrCode", "isLoading"]),
    foodPrice() {
      return this.foodDetail.price.toLocaleString("de-DE", {
        style: "currency",
        currency: "EUR",
      })
    },
  },
  created() {
    this.fetchFoodById(this.$route.params.id)
    // this.fetchQrCode()
  },
}
</script>
<template>
  <section class="food-details overflow-hidden">
    <div
      class="bg-cover"
      :class="getBackgroundClass()">
      <Loader
        v-if="isLoading"
        class="h-screen flex flex-col items-center justify-center" />
      <div
        v-else
        class="flex flex-col items-center justify-center py-8 mx-auto h-screen lg:py-0 backdrop-brightness-50">
        <h5 class="uppercase text-xl mb-3">Delicious and rich taste</h5>
        <a
          class="flex items-center mb-6 text-5xl font-semibold text-center tracking-wider">
          The Delicious <br />
          {{ foodDetail.name }}
        </a>
        <div class="flex max-w-7xl gap-10 items-center">
          <div class="max-w-lg overflow-hidden h-[30vh] w-1/2">
            <img
              class="object-cover w-full h-full cursor-pointer"
              :src="foodDetail.imgUrl"
              :alt="foodDetail.name" />
          </div>
          <div class="max-w-lg">
            <h1 class="text-2xl underline">Description :</h1>
            <h1 class="text-xl mb-7">{{ foodDetail.description }}</h1>
            <h1 class="text-2xl underline">Price :</h1>
            <h1 class="text-xl mb-7">{{ foodPrice }}</h1>
            <button
              @click.prevent="addBookmark(foodDetail.id)"
              class="text-xl border px-5 py-2 mb-5 rounded-sm cursor-pointer hover:bg-amber-50 hover:text-sky-900 duration-200 active:scale-90">
              Add to Bookmark!
            </button>
            <img
              :src="qrCode.qrcode"
              alt=""
              class="h-52" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

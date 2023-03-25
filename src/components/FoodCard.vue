<script>
import { mapActions, mapState, mapWritableState } from "pinia"
import { useCounterStore } from "../stores/store"
import Loader from "./Loader.vue"
import Spinner from "./Spinner.vue"

export default {
  data() {
    return {
      block: "block",
      hidden: "hidden",
    }
  },
  components: {
    Loader,
    Spinner,
  },
  props: ["food"],
  methods: {
    foodDetail() {
      this.$router.push(`/foods/${this.food.id}`)
    },
    ...mapActions(useCounterStore, ["addBookmark", "deleteBookmark"]),
  },
  computed: {
    foodPrice() {
      return this.food.price.toLocaleString("de-DE", {
        style: "currency",
        currency: "EUR",
      })
    },
    ...mapWritableState(useCounterStore, [
      "isLoading",
      "isSpinner",
      "card",
      "bookmarkList",
      "isFood",
    ]),
  },

}
</script>

<template>
  <div class="container rounded-md border border-stone-500 shadow-xl">
    <Loader v-if="isLoading" />
    <div class="max-w-md overflow-hidden h-52 relative" v-else>
      <img
        @click.prevent="foodDetail()"
        class="object-cover w-full h-full cursor-pointer"
        :src="food.imgUrl"
        :alt="food.name" />
      <button
        :class="isFood === true ? block : hidden"
        class="border px-5 hover:bg-amber-100 text-lg text-sky-900 bg-amber-50 bg-opacity-80 rounded-sm backdrop-blur-lg absolute top-0 active:scale-95 duration-150"
        @click.prevent="addBookmark(food.id)">
        Bookmark!
      </button>
    </div>
    <div class="p-5 flex justify-between">
      <h1 class="font-medium text-xl">{{ food.name }}</h1>
      <a>
        <h5 class="text-2xl text-center tracking-wider text-amber-100">
          {{ foodPrice }}
        </h5>
      </a>
      <button
        v-if="(isFood === false)"
        class="px-2 hover:bg-red-400 text-lg text-sky-50 bg-red-500 rounded-sm backdrop-blur-lg active:scale-95 duration-150"
        @click.prevent="deleteBookmark(food.id)">
        Delete
      </button>
    </div>
  </div>
</template>

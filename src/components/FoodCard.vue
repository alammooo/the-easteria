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
  <div class="rounded-lg overflow-hidden border border-stone-600 shadow group ">
    <Loader v-if="isLoading" />
    <div
      class="max-w-md overflow-hidden h-52 relative"
      v-else>
      <img
        @click.prevent="foodDetail()"
        class="object-cover w-full h-full cursor-pointer"
        :src="food.imgUrl"
        :alt="food.name" />
      <button
        :class="isFood === true ? block : hidden"
        class="px-5 hover:bg-amber-100 text-base text-sky-900 bg-amber-200 bg-opacity-80 rounded-sm absolute top-0 active:scale-95 duration-150"
        @click.prevent="addBookmark(food.id)">
        Bookmark!
      </button>
    </div>
    <div class="p-3 flex justify-between group rounded-sm overflow-hidden group-hover:bg-amber-200 group-hover:text-sky-900 duration-200">
      <h1 class="font-medium text-lg">{{ food.name }}</h1>
      <h5 class="text-lg text-center tracking-wider text-amber-100 group-hover:text-sky-900">
        {{ foodPrice }}
      </h5>

      <button
        v-if="isFood === false"
        class="px-2 hover:bg-red-400 text-base text-sky-50 bg-red-500 rounded-sm active:scale-95 duration-150"
        @click.prevent="deleteBookmark(food.id)">
        Delete
      </button>
    </div>
  </div>
</template>

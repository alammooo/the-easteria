<script>
import Loader from "./Loader.vue"
import { mapActions, mapState, mapWritableState } from "pinia"
import { useCounterStore } from "../stores/store"
import FoodCard from "./FoodCard.vue"

export default {
  components: {
    Loader,
    FoodCard,
  },
  created() {
    this.fetchBookmark()
    this.isSpinner = false
  },
  methods: {
    foodDetail(foodId) {
      this.$router.push(`foods/${foodId}`)
    },
    ...mapActions(useCounterStore, ["fetchBookmark", "deleteBookmark"]),
  },
  computed: {
    ...mapWritableState(useCounterStore, ["bookmarkList", "isLoading", "isFood", "isSpinner"]),
  },
}
</script>
<template>
  <section class="bookmark-section">
    <div
      id="Food-List"
      class="bg-cover"
      style="background-image: url('../src/assets/images/bookmark-bg.jpg')">
      <div
        class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 backdrop-brightness-50">
        <h1 class="text-center text-6xl my-3 font-serif">Your Favorite</h1>
        <h1 class="text-center text-4xl my-3 font-light">Bookmarks :</h1>
        <h1 class="text-center text-xl my-3" v-if="bookmarkList.length === 0">
          Bookmark is Empty
        </h1>
        <Loader v-else-if="isLoading" />
        <div
          class="grid-cols-4 grid gap-2 my-10 self-center"
          v-else-if="isLoading === false">
          <div
            class="max-w-md overflow-hidden h-80 relative"
            v-for="bookmark in bookmarkList"
            :key="bookmark.id">
            <FoodCard :food="bookmark.Food" :isFood="isFood"/>
            <!-- <img
              @click.prevent="foodDetail(bookmark.FoodId)"
              class="object-cover w-full h-full cursor-pointer"
              :src="bookmark.Food.imgUrl"
              :alt="bookmark.Food.name" />
            <a
              class="bg-red-400 px-5 py-1 text-lg z-20 absolute bottom-0 cursor-pointer select-none active:scale-95 duration-200"
              @click="deleteBookmark(bookmark.FoodId)"
              >Delete</a
            > -->
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

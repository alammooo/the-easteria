<script>
import { mapActions, mapState, mapWritableState } from "pinia"
import { useCounterStore } from "../stores/store"
import FoodCard from "../components/FoodCard.vue"
import Pagination from "../components/Pagination.vue"

export default {
  components: {
    FoodCard,
    Pagination,
  },
  created() {
    this.fetchFood()
    this.fetchCategory()
  },
  name: "HomeView",
  methods: {
    ...mapActions(useCounterStore, ["fetchFood", "fetchCategory"]),
    logger(categoryId) {
      this.currentPage = 1
      this.filter = categoryId
      this.fetchFood()
    },
  },
  computed: {
    ...mapWritableState(useCounterStore, [
      "currentPage",
      "foodList",
      "categoryList",
      "filter",
      "isFood",
    ]),
  },
}
</script>

<template>
  <section class="mainPage">
    <div class="snap-y snap-mandatory h-screen w-screen">
      <div
        style="background-image: url('../src/assets/images/front-bg.jpg')"
        class="bg-cover snap-start h-screen">
        <div
          class="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0 backdrop-brightness-50">
          <h5 class="uppercase text-2xl mb-3">More spices from the east</h5>
          <a
            class="flex items-center mb-6 text-9xl font-semibold text-center tracking-wider">
            Taste The <br />
            Eastern
          </a>
          <h5 class="text-xl">
            Bringin the strong tasty eastern spices directly to build strongest
            flavour
          </h5>
          <a
            href="#Food-List"
            class="mt-7 text-3xl font-serif border-y-2 border-amber-200 py-7 px-5 active:scale-90 duration-200 cursor-pointer"
            >Our Menu</a
          >
        </div>
      </div>
      <div
        id="Food-List"
        class="bg-cover snap-start h-screen"
        style="background-image: url('../src/assets/images/bg-1.jpg')">
        <div
          class="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0 backdrop-brightness-50 backdrop-blur-sm">
          <h1
            class="text-center text-5xl my-3 font-serif border-b-2 border-amber-200">
            Our Menu
          </h1>
          <h1 class="text-center text-3xl my-3 font-light">Categories :</h1>
          <div class="flex gap-5">
            <a
              class="text-center text-xl font-light cursor-pointer hover:text-amber-200 active:scale-90 duration-200"
              v-for="category in categoryList"
              :key="category.id"
              @click.prevent="logger(category.id)">
              {{ category.name }}
            </a>
            <a
              @click.prevent="logger(undefined)"
              class="text-center text-xl font-light cursor-pointer hover:text-amber-200">
              All
            </a>
          </div>

          <div
            class="grid-cols-4 grid gap-2 my-6 mx-auto duration-500 hover:gap-x-11">
            <FoodCard
              v-for="(food, index) in foodList"
              :key="food.id"
              :food="food"
              :index="index"
              :isFood="isFood" />
          </div>
          <Pagination />
        </div>
      </div>
    </div>
  </section>
</template>

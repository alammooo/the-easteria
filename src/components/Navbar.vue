<script>
import { mapActions, mapState, mapWritableState } from "pinia"
import { useCounterStore } from "../stores/store"

export default {
  methods: {
    navBookmark() {
      this.$router.push("/bookmarks")
    },
    navLogin() {
      this.$router.push("/login")
    },
    navHome() {
      this.$router.push("/")
    },
    ...mapActions(useCounterStore, ["logout"]),
  },
  computed: {
    ...mapWritableState(useCounterStore, ["isLoggedIn"]),
  },
  created() {
    if (localStorage.getItem("access_token")) {
      this.isLoggedIn = true
    }
  },
}
</script>
<template>
  <nav class="px-2 sm:px-4 fixed w-full z-20 top-0 left-0 backdrop-blur-sm">
    <div class="container flex flex-wrap items-center justify-between mx-auto">
      <a class="flex items-center" @click.prevent="navHome">
        <span class="text-amber-50 hover:text-amber-300 text-2xl cursor-pointer active:scale-90 duration-200"
          >Easteria <br />
          <span class="font-serif">Restaurant</span></span
        >
      </a>
      <div class="flex md:order-2">
        <button
          v-if="!isLoggedIn"
          @click.prevent="navLogin"
          type="button"
          class="hover:bg-amber-50 hover:text-sky-900 text-xl font-medium rounded-sm px-5 py-1 active:scale-90 text-center duration-150">
          Login
        </button>
        <button
          v-else
          @click.prevent="logout"
          type="button"
          class="hover:bg-amber-50 hover:text-sky-900 text-xl font-medium rounded-sm px-5 py-1 active:scale-90 text-center duration-150">
          Logout
        </button>
      </div>
      <div class="items-center flex w-auto order-1" id="navbar-sticky">
        <ul
          class="flex flex-col p-4 mt-4 border-gray-100 rounded-lg md:flex-row md:space-x-8 md:mt-0 md md:font-medium md:border-0">
          <li>
            <a
              @click.prevent="navHome"
              class="block py-2 pl-3 pr-4 rounded md:p-0 font-light text-2xl hover:text-amber-300 cursor-pointer active:scale-90 duration-200"
              aria-current="page"
              >Home</a
            >
          </li>
          <li>
            <a
              @click.prevent="navBookmark"
              class="block py-2 pl-3 pr-4 rounded md:p-0 font-light text-2xl hover:text-amber-300 cursor-pointer active:scale-90 duration-200"
              >Bookmark</a
            >
          </li>
        </ul>
      </div>
    </div>
    <hr class="w-4/5 border-amber-50 mx-auto" />
  </nav>
</template>

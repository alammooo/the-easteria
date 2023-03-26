<script>
import { mapActions, mapStores, mapWritableState } from "pinia"
import { useCounterStore } from "../stores/store"
import Loader from "../components/Loader.vue"
import Spinner from "../components/Spinner.vue"
import frontBg from "@/assets/images/front-bg.jpg"
export default {
  components: {
    Loader,
    Spinner,
  },
  data() {
    return {
      email: "",
      password: "",
      frontImage: { backgroundImage: `url(${frontBg})` },
    }
  },
  methods: {
    navRegister() {
      this.$router.replace(`/register`)
    },
    ...mapActions(useCounterStore, ["login"]),
  },
  computed: {
    ...mapWritableState(useCounterStore, ["isLoading"]),
  },
}
</script>
<template>
  <section>
    <div
      :style="frontImage"
      class="bg-cover">
      <div
        class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 backdrop-brightness-50">
        <a
          href="#"
          class="flex items-center mb-6 text-4xl font-serif text-amber-50">
          Easteria Restaurant Login
        </a>
        <div class="w-full rounded-sm shadow md:mt-0 sm:max-w-md xl:p-0 border">
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
            <form
              class="space-y-4 md:space-y-6"
              @submit.prevent="login({ email, password })">
              <div>
                <label
                  for="email"
                  class="block mb-2 font-medium text-center text-amber-50"
                  >Your email</label
                >
                <input
                  type="email"
                  v-model="email"
                  id="email"
                  class="bg-gray-50 border border-gray-300 text-sky-900 rounded-lg focus:ring-sky-900 focus:border-sky-900 block w-full p-2.5"
                  placeholder="your@mail.com" />
              </div>
              <div>
                <label
                  for="password"
                  autocomplete="off"
                  class="block mb-2 font-medium text-amber-50 text-center"
                  >Password</label
                >
                <input
                  type="password"
                  v-model="password"
                  id="password"
                  autocomplete="off"
                  placeholder="••••••••"
                  class="bg-gray-50 border mb-10 border-gray-300 text-sky-900 rounded-lg focus:ring-sky-900 focus:border-sky-900 block w-full p-2.5" />
              </div>
              <button
                type="submit"
                class="w-full bg-amber-200 text-sky-900 focus:ring-4 focus:outline-none focus:ring-sky-900 font-medium rounded-md px-5 py-2.5 text-center active:scale-95 duration-200">
                Sign in
              </button>
              <p class="font-light text-amber-50">
                Don’t have an account yet?
                <a
                  @click.prevent="navRegister()"
                  class="font-medium text-amber-50 hover:underline cursor-pointer"
                  >Sign up</a
                >
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

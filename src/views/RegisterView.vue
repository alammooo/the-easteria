<script>
import { mapState, mapActions } from "pinia"
import { useCounterStore } from "../stores/store"
import frontBg from "@/assets/images/front-bg.jpg"
export default {
  data() {
    return {
      username: "",
      email: "",
      password: "",
      phoneNumber: "",
      address: "",
      registerBg: { backgroundImage: `url(${frontBg})` },
    }
  },
  methods: {
    navLogin() {
      this.$router.replace(`/login`)
    },
    ...mapActions(useCounterStore, ["register"]),
  },
}
</script>
<template>
  <section>
    <div
      :style="registerBg"
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
              @submit.prevent="
                register({ username, phoneNumber, address, email, password })
              ">
              <div>
                <label
                  for="username"
                  class="block mb-2 font-medium text-center text-amber-50"
                  >Username</label
                >
                <input
                  type="text"
                  id="username"
                  v-model="username"
                  class="bg-gray-50 border border-gray-300 text-sky-900 rounded-lg focus:ring-sky-900 focus:border-sky-900 block w-full p-2.5"
                  placeholder="Gravityfalls" />
              </div>
              <div>
                <label
                  for="phoneNumber"
                  class="block mb-2 font-medium text-center text-amber-50"
                  >Phone Number</label
                >
                <input
                  type="number"
                  id="phoneNumber"
                  v-model="phoneNumber"
                  class="bg-gray-50 border border-gray-300 text-sky-900 rounded-lg focus:ring-sky-900 focus:border-sky-900 block w-full p-2.5"
                  placeholder="Phone Number" />
              </div>
              <div>
                <label
                  for="address"
                  class="block mb-2 font-medium text-center text-amber-50"
                  >Address</label
                >
                <input
                  type="text"
                  id="address"
                  v-model="address"
                  class="bg-gray-50 border border-gray-300 text-sky-900 rounded-lg focus:ring-sky-900 focus:border-sky-900 block w-full p-2.5"
                  placeholder="City, State" />
              </div>
              <div>
                <label
                  for="email"
                  class="block mb-2 font-medium text-center text-amber-50"
                  >Email</label
                >
                <input
                  type="text"
                  id="email"
                  v-model="email"
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
                  id="password"
                  v-model="password"
                  autocomplete="off"
                  placeholder="••••••••"
                  class="bg-gray-50 border mb-10 border-gray-300 text-sky-900 rounded-lg focus:ring-sky-900 focus:border-sky-900 block w-full p-2.5" />
              </div>
              <button
                type="submit"
                class="w-full bg-amber-200 text-sky-900 focus:ring-4 focus:outline-none focus:ring-sky-900 font-medium rounded-lg px-5 py-2.5 text-center active:scale-95 duration-200">
                Register
              </button>
              <p class="font-light text-amber-50">
                Already have an Account?
                <a
                  @click.prevent="navLogin()"
                  class="font-medium text-amber-50 hover:underline cursor-pointer"
                  >Sign in</a
                >
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

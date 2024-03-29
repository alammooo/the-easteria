import axios from "axios"
import { defineStore } from "pinia"
import Toastify from "toastify-js"

export const useCounterStore = defineStore("counter", {
  state() {
    return {
      baseUrl: "https://restaurant-server.klinik-ku.com",

      // baseUrl: "http://localhost:3000",
      count: 0,
      name: "",
      foodList: [],
      foodDetail: {},
      categoryList: [],
      bookmarkList: [],
      totalFood: 0,
      limit: 0,
      isLoggedIn: false,
      currentPage: 1,
      qrCode: "",
      isLoading: false,
      toastMessage: "",
      filter: "",
      email: "",
      isSpinner: false,
      card: "",
      isFood: false,
    }
  },
  getters: {},
  actions: {
    navHome(){
      this.currentPage = 1
      this.filter = ""
      this.fetchFood()
      this.router.replace("/")
    },
    openToast(message) {
      Toastify({
        text: message,
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "bottom",
        position: "right",
        stopOnFocus: true,
        style: {
          background: "black",
          color: "white",
        },
        onClick: function () {},
      }).showToast()
    },
    /* Register & Login */

    async register(body) {
      try {
        const response = await axios({
          method: "POST",
          url: `${this.baseUrl}/pub/register`,
          data: body,
        })

        if (response.status === 200) {
          this.router.push("/login")
          this.openToast("Successfully register!")
        }
      } catch (error) {
        this.openToast(error.response.data.message)
      }
    },

    async login(body) {
      try {
        this.isLoading = true
        const response = await axios({
          method: "POST",
          url: `${this.baseUrl}/pub/login`,
          data: body,
        })
        localStorage.setItem("access_token", response.data.access_token)
        this.isLoggedIn = true
        this.router.push("/")
        this.openToast("Successfully logged in")
      } catch (error) {
        this.openToast(error.response.data?.message)
      } finally {
        this.isSpinner = false
        this.isLoading = false
      }
    },

    logout() {
      localStorage.clear()
      this.isLoggedIn = false
      this.isSpinner = false
      this.router.push("/login")
      this.openToast("Successfully logged out")
    },

    /* Fetch Data */
    async fetchFood() {
      try {
        this.isLoading = true
        this.card = "Food"
        let params = {
          page: this.currentPage,
        }

        if (this.filter) {
          params = {
            ...params,
            filterBy: this.filter,
          }
        }

        const response = await axios({
          method: "GET",
          url: `${this.baseUrl}/pub/foods`,
          params: params,
        })

        if (response.status === 200) {
          const { data } = response
          this.foodList = data.listOfFoods
          this.totalFood = Number(data.totalFood)
          this.limit = data.limit
          this.isFood = true
        }
      } catch (error) {
        this.openToast(error.response.data.message)
      } finally {
        this.isLoading = false
      }
    },
    async fetchFoodById(foodId) {
      try {
        this.isLoading = true
        const response = await axios({
          method: "GET",
          url: `${this.baseUrl}/pub/foods/${foodId}`,
        })
        const { data } = response
        this.foodDetail = data.food
      } catch (error) {
        this.router.replace("/foods/notFound-foods")
      } finally {
        this.isLoading = false
      }
    },
    async fetchBookmark() {
      try {
        this.isLoading = true
        this.card = "Bookmark"
        const response = await axios({
          method: "GET",
          url: `${this.baseUrl}/pub/bookmarks`,
          headers: {
            access_token: localStorage.getItem("access_token"),
          },
        })

        this.isFood = false
        this.bookmarkList = response.data.BookmarkList
      } catch (error) {
        this.openToast(error.response.data.message)
      } finally {
        this.isLoading = false
        this.isSpinner = false
      }
    },
    async fetchCategory() {
      try {
        const response = await axios({
          method: "GET",
          url: `${this.baseUrl}/categories`,
        })

        if (response.status === 200) {
          const { data } = response
          this.categoryList = data
        }
        this.isSpinner = false
      } catch (error) {
        this.isSpinner = false
        this.openToast(error.response.data.message)
      }
    },

    /* Add or Delete */
    async addBookmark(foodId) {
      try {
        this.isSpinner = true
        const response = await axios({
          method: "POST",
          url: `${this.baseUrl}/pub/bookmarks/${foodId}`,
          headers: {
            access_token: localStorage.access_token,
          },
        })

        this.openToast("Successfully add Bookmark")
      } catch (error) {
        this.isSpinner = false

        if (error.response.data.message === "Token is invalid") {
          this.openToast("Must login first")
          this.router.replace("/login")
        } else {
          this.openToast(error.response.data.message)
        }
      } finally {
        this.isSpinner = false
      }
    },
    async deleteBookmark(foodId) {
      try {
        const response = await axios({
          method: "DELETE",
          url: `${this.baseUrl}/pub/bookmarks/${foodId}`,
          headers: {
            access_token: localStorage.access_token,
          },
        })

        this.openToast("Successfully delete Bookmark")
        this.fetchBookmark()
        this.isSpinner = false
      } catch (error) {
        this.isSpinner = false
        this.openToast(error.response.statusText)
      }
    },

    // /* API QR Code */
    // async fetchQrCode() {
    //   const { data } = await axios({
    //     method: "GET",
    //     url: `https://api.happi.dev/v1/qrcode?data=${window.location.href}&width=&dots=000000&bg=FFFFFF&apikey=9b1b9dMpGZkGDgFC5GuLMeERGg9lupGNwyjzlaIcwy7Xqvbuc4HXQ7J5`,
    //   })
    //   this.qrCode = data
    // },
  },
})

<script>
import Navbar from "./components/Navbar.vue"
import "./style.css"
export default {
  name: "App",
  components: {
    Navbar,
  },
}
</script>

<template>
  <Navbar />
  <router-view />
</template>

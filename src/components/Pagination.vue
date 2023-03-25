<script>
import { mapActions, mapState, mapWritableState } from "pinia"
import { useCounterStore } from "../stores/store"

export default {
  methods: {
    ...mapActions(useCounterStore, ["fetchFood"]),
  },
  computed: {
    ...mapWritableState(useCounterStore, ["totalFood", "currentPage"]),
  },
}
</script>

<template>
  <vue-awesome-paginate
    :total-items="totalFood"
    :items-per-page="8"
    :max-pages-shown="4"
    v-model="currentPage"
    :on-click="fetchFood" />
</template>

<style>
.pagination-container {
  display: flex;
  column-gap: 7px;
}
.paginate-buttons.active {
  transform: scale(0.95);
  transition-duration: 300;
}
.paginate-buttons {
  height: 40px;
  border-radius: 5px;
  width: 40px;
  cursor: pointer;
  border: 1.5px solid rgb(249, 244, 232);
  color: white;
  font-weight: 500;
}
.paginate-buttons:hover {
  background-color: rgb(255, 251, 235);
  color: rgb(12, 74, 110);
}
.active-page {
  background-color: rgb(245, 158, 11);
}
.active-page:hover {
  background-color: rgb(252, 211, 71);
}
</style>

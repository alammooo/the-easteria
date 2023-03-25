<script>
export default {
  methods:{
    navHome(){
      this.$router.replace("/")
    }
  }
}
</script>
<template>
  <section class="mainPage snap-y">
    <div
      style="background-image: url('../src/assets/images/notfound-bg.jpg')"
      class="bg-cover">
      <div
        class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 backdrop-brightness-50 backdrop:contrast-50 backdrop-blur-sm snap-start">
        <h5 class="uppercase text-2xl mb-3">More spices from the east</h5>
        <a
          class="flex items-center mb-6 text-9xl font-semibold text-center tracking-wider">
          Taste The <br />
          Eastern
        </a>
        <h5 class="text-xl">
          Bringin the strong tasty eastern spices directly to build strongest flavour
        </h5>
        <a
          class="mt-7 text-3xl font-serif border-y-2 border-amber-200 py-7 px-5 cursor-pointer"
          >Sorry Page You requested is not Found</a
        >
        <a @click.prevent="navHome()"
          class="mt-7 text-3xl font-serif py-7 px-5 active:scale-90 duration-200 cursor-pointer"
          >Back to Home</a
        >
      </div>
    </div>
  </section>
</template>

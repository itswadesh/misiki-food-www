<template>
  <div class="flex h-auto p-5 overflow-x-auto xs:block lg:hidden">
    <nuxt-link
      v-for="c in $store.state.categories"
      id="nay"
      :key="c._id"
      :to="`/${c.slug}`"
      class="flex-1 bg-white circletag"
    >
      <!-- v-lazy="`${store.state.settings.CDN_URL + c.img}?tr=h-40,fo-auto`" -->
      <img
        v-lazy="$store.state.settings.CDN_URL + c.img"
        :alt="c.name.toUpperCase()"
        class="object-cover h-10 text-sm rounded-full"
      />
      <div class="text-center text">{{ c.name.toUpperCase() }}</div>
    </nuxt-link>
  </div>
</template>

<script>
import NuxtLink from '~/components/NuxtLink.vue'

export default { components: { NuxtLink } }
</script>
<style scoped>
.circletag img {
  border-radius: 50%;
}
.circletag {
  display: block;
  max-width: 100%;
  border-radius: 50%;
  text-align: center;
}
.circletag > img {
  max-width: 55%;
  margin: auto;
}
.text {
  font-size: 0.6em;
}
</style>

<template>
  <div v-if="post">
    <div class="w-full p-8 overflow-hidden lg:w-1/2">
      <nuxt-link
        :to="`/blog/${post.slug}?id=${post.id}`"
        :title="post.title"
        class="block bg-white rounded-md shadow-md avatar zoom hover:shadow-lg"
      >
        <img
          v-lazy="`${post.img}?tr=w-100%,fo-auto`"
          :alt="post.title"
          class="object-cover min-w-full"
        />
        <div class="px-6 py-4">
          <div class="mb-2 text-3xl font-black truncate">{{ post.title }}</div>
          <div
            v-if="post.user"
            class="flex items-center text-xs author lg:text-sm"
          >
            <img
              v-lazy="`${post.user.avatar}?tr=w-64,h-64,fo-auto`"
              class="object-cover w-16 h-16 me-4 rounded-full"
              alt="🚀"
            />
            <div class="mx-2 font-bold tracking-wide">
              {{ post.user.firstName }} {{ post.user.lastName }}
            </div>
            <div class="mx-2 text-gray-700">{{ post.updatedAt | date }}</div>
          </div>
        </div>
        <div v-if="post && post.items && post.tags">
          <div class="px-6 py-4 truncate">
            <div v-for="(t, ix) in post.tags" :key="ix">
              <span
                class="
                  inline-block
                  px-3
                  py-1
                  mb-1
                  me-2
                  text-sm
                  font-semibold
                  text-gray-700
                  bg-gray-200
                  rounded-full
                "
              >
                {{ t }}
              </span>
            </div>
          </div>
        </div>
      </nuxt-link>
    </div>
  </div>
</template>
<script>
import NuxtLink from '~/components/NuxtLink.vue'
export default {
  components: { NuxtLink },
  props: {
    post: { type: Object, default: null },
  },
}
</script>
<style scoped>
img {
  opacity: 1;
  animation-name: fadeInOpacity;
  animation-iteration-count: 1;
  animation-timing-function: ease-in;
  animation-duration: 0.3s;
}

@keyframes fadeInOpacity {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
.zoom {
  overflow: hidden;
}
.zoom img {
  transition: transform 0.7s;
}
.zoom:hover img {
  transform: scale(1.035);
}
</style>

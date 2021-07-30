<template>
  <ApolloQuery
    :query="query"
    class="flex items-center justify-center w-full p-2 bg-primary-100"
  >
    <template #default="{ result: { error, data }, isLoading }">
      <div v-if="isLoading">Loading........</div>
      <ErrComponent v-else-if="error" :error="error" />
      <div
        v-else-if="data && data[model]"
        class="flex w-full text-gray-900 bg-white rounded shadow-md h-60 card"
      >
        <div class="flex flex-col w-full">
          <div class="flex-1 p-4 pb-0">
            <h3 class="mb-1 text-xl font-thin text-gray-800">
              Reviews / Comments
            </h3>
            <span class="text-5xl font-bold text-gray-900">
              {{ 100 }}
              <span class="text-sm">reviews</span>
              200
              <span class="text-sm">comments</span>
            </span>
          </div>
          <nuxt-link
            :to="localePath('/reviews')"
            class="
              flex
              items-center
              justify-between
              p-3
              transition
              bg-gray-100
              hover:bg-gray-200
            "
          >
            View All
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </nuxt-link>
        </div>
      </div>
    </template>
  </ApolloQuery>
</template>
<script>
export default {
  props: {
    heading: { type: String, default: null },
    detail: { type: String, default: null },
    query: { type: Object, default: () => {} },
    link: { type: String, default: null },
    model: { type: String, default: null },
  },
}
</script>

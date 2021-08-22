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
            <h3 class="mb-1 text-2xl font-thin text-gray-800">{{ heading }}</h3>
            <div class="flex items-center mb-4 text-xs">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="me-1 text-grey-dark"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"
                />
              </svg>
              {{ data[model].count }} orders
            </div>
            <span class="text-5xl font-bold text-gray-900">{{
              data[model].amount | currency(store.currencySymbol, 2)
            }}</span>
            <div class="flex items-center mt-4">
              <div class="pr-2 text-xs">
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
                    d="M16 15v-1a4 4 0 00-4-4H8m0 0l3 3m-3-3l3-3m9 14V5a2 2 0 00-2-2H6a2 2 0 00-2 2v16l4-2 4 2 4-2 4 2z"
                  />
                </svg>
                Last Order:
                <span class="text-secondary-500">{{
                  data[model].createdAt | date
                }}</span>
              </div>
            </div>
          </div>
          <nuxt-link
            :to="localePath('link')"
            class="
              flex
              items-center
              justify-between
              p-3
              transition
              bg-gray-50
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
import { mapGetters } from 'vuex'
import NuxtLink from '~/components/NuxtLink.vue'
export default {
  components: { NuxtLink },
  props: {
    heading: { type: String, default: null },
    detail: { type: String, default: null },
    query: { type: Object, default: () => {} },
    link: { type: String, default: null },
    model: { type: String, default: null },
  },
  computed: { ...mapGetters({ store: 'store' }) },
}
</script>

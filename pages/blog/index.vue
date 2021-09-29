<template>
  <div>
    <div>
      <main in:fadeIn out:fadeOut class="bg-gray-100 mt-18">
        <div class="p-12 pattern">
          <h1
            class="
              items-center
              my-2
              text-xl
              font-hairline
              text-gray-700
              font-bold
            "
          >
            <span class="text-3xl font-bold">{{ posts.count }}</span>
            awesome collection of posts
          </h1>
          <h2>About furnitures and manufacturing</h2>
        </div>
        <div
          v-if="posts && posts.data"
          class="container flex flex-wrap justify-center m-2 mx-auto"
        >
          <div v-for="post in posts.data" :key="post.id">
            <BlogPostGrid :post="post" />
          </div>
          <Pagination
            class="mt-5"
            :count="noOfPages"
            :current="parseInt($route.query.page || 1)"
            @change="changePage"
          />
        </div>
      </main>
    </div>
  </div>
</template>
<script>
import BLOGS from '~/gql/blog/blogs.gql'
import c from '~/mixins/c.js'
import { DESCRIPTION, KEYWORDS } from '~/shared/config'
import Pagination from '~/shared/components/ui/Pagination.vue'
import BlogPostGrid from '~/components/Blog/BlogPostGrid.vue'

export default {
  components: {
    Pagination,
    BlogPostGrid,
  },

  mixins: [c],

  async asyncData({ route, query, params, $axios, app, store }) {
    let posts = null
    let facets = []
    let fl = {}
    let err = null
    let blogCount = 0
    const client = app.apolloProvider.defaultClient
    const { title, keywords, description, favicon, logoMobile } =
      store.state.store || {} // err = null
    try {
      query.store = store.state.store && store.state.store.id
      query.active = true
      posts = (
        await client.query({
          query: BLOGS,
          variables: query,
          fetchPolicy: 'no-cache',
        })
      ).data.blogs
      blogCount = posts.count
      facets = posts.facets && posts.facets.all_aggs
      fl = { ...query } // For selected filters
      return {
        posts,
        blogCount,
        facets,
        fl,
        err: null,
        title,
        keywords,
        description,
        favicon,
        logoMobile,
      }
    } catch (e) {
      if (e && e.response && e.response.data) {
        err = e.response.data
      } else if (e && e.response) {
        err = e.response
      } else {
        err = e
      }
      console.log('/c/_slug err...', e)
      return {
        posts,
        blogCount,
        facets: [],
        fl: {},
        err,
        title,
        keywords,
        description,
        favicon,
        logoMobile,
      }
    }
  },

  head() {
    return {
      title: 'Blog',
    }
  },

  watchQuery: true,

  created() {
    this.scrollToTop()
    this.currentPage = parseInt(this.$route.query.page)
  },
  methods: {
    scrollToTop() {
      if (process.client) {
        window.scroll({ behavior: 'smooth', left: 0, top: 80 })
      }
    },
    // async getData() {
    //   const q = this.$route.query || {}
    //   // q.categories = this.$route.path.substr(1)
    //   try {
    //     this.loading = true
    //     const p = params.slug || null
    //     q.categories = p
    //     const blogs = await this.$axios.$get('/api/blogs/es', {
    //       params: q,
    //     })
    //     this.blogCount = blogs.count
    //     this.blogs = blogs.data
    //     this.facets = blogs.facets && blogs.facets.all_aggs
    //   } catch (e) {
    //   } finally {
    //     this.loading = false
    //   }
    // },
  },
}
</script>
<style scoped>
.pattern {
  background-color: #eee;
  background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg width='180' height='180' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M81.28 88H68.413l19.298 19.298L81.28 88zm2.107 0h13.226L90 107.838 83.387 88zm15.334 0h12.866l-19.298 19.298L98.72 88zm-32.927-2.207L73.586 78h32.827l.5.5 7.294 7.293L115.414 87l-24.707 24.707-.707.707L64.586 87l1.207-1.207zm2.62.207L74 80.414 79.586 86H68.414zm16 0L90 80.414 95.586 86H84.414zm16 0L106 80.414 111.586 86h-11.172zm-8-6h11.173L98 85.586 92.414 80zM82 85.586L87.586 80H76.414L82 85.586zM17.414 0L.707 16.707 0 17.414V0h17.414zM4.28 0L0 12.838V0h4.28zm10.306 0L2.288 12.298 6.388 0h8.198zM180 17.414L162.586 0H180v17.414zM165.414 0l12.298 12.298L173.612 0h-8.198zM180 12.838L175.72 0H180v12.838zM0 163h16.413l.5.5 7.294 7.293L25.414 172l-8 8H0v-17zm0 10h6.613l-2.334 7H0v-7zm14.586 7l7-7H8.72l-2.333 7h8.2zM0 165.414L5.586 171H0v-5.586zM10.414 171L16 165.414 21.586 171H10.414zm-8-6h11.172L8 170.586 2.414 165zM180 163h-16.413l-7.794 7.793-1.207 1.207 8 8H180v-17zm-14.586 17l-7-7h12.865l2.333 7h-8.2zM180 173h-6.613l2.334 7H180v-7zm-21.586-2l5.586-5.586 5.586 5.586h-11.172zM180 165.414L174.414 171H180v-5.586zm-8 5.172l5.586-5.586h-11.172l5.586 5.586zM152.933 25.653l1.414 1.414-33.94 33.942-1.416-1.416 33.943-33.94zm1.414 127.28l-1.414 1.414-33.942-33.94 1.416-1.416 33.94 33.943zm-127.28 1.414l-1.414-1.414 33.94-33.942 1.416 1.416-33.943 33.94zm-1.414-127.28l1.414-1.414 33.942 33.94-1.416 1.416-33.94-33.943zM0 85c2.21 0 4 1.79 4 4s-1.79 4-4 4v-8zm180 0c-2.21 0-4 1.79-4 4s1.79 4 4 4v-8zM94 0c0 2.21-1.79 4-4 4s-4-1.79-4-4h8zm0 180c0-2.21-1.79-4-4-4s-4 1.79-4 4h8z' fill='%23ddd' fill-opacity='.3' fill-rule='evenodd'/%3E%3C/svg%3E");
}
</style>

<template>
  <div class="container mx-auto prose">
    <div>
      <main>
        <Shortcode :content="data.content"></Shortcode>
      </main>
    </div>
  </div>
</template>
<script>
const Shortcode = () => import('~/components/Shortcode')

export default {
  components: { Shortcode },
  data() {
    return {
      page: {},
    }
  },
  async fetch() {
    console.log('zzzzzzzzzzzzzzzzzzzzzzzzzzz')
    this.page = await this.$get('page/pageSlug', {
      slug: this.$route.params.slug,
    })
    console.log('zzzzzzzzzzzzzzzzzzzzzzzzzzz', this.page)
  },
  head() {
    return {
      title: this.page && this.page.title,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.page && this.page.metaDescription,
        },
        {
          hid: 'og:description',
          name: 'Description',
          property: 'og:description',
          content: this.page && this.page.metaDescription,
        },
        {
          hid: 'keywords',
          name: 'Keywords',
          property: 'keywords',
          content: this.page && this.page.keywords,
        },
        {
          hid: 'og:title',
          name: 'og:title',
          property: 'og:title',
          content: this.page && this.page.title,
        },
        // Twitter
        {
          name: 'twitter:title',
          content: this.page && this.page.title,
        },
        {
          name: 'twitter:description',
          content: this.page && this.page.metaDescription,
        },
      ],
    }
  },
  methods: {
    setPage(page) {
      this.page = page
    },
  },
}
</script>

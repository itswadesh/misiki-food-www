<template>
  <section
    class="pt-5 pb-10 px-2 conatiner mx-auto w-full lg:max-w-6xl text-gray-800"
  >
    <h4 class="my-5 md:my-10 text-2xl md:text-4xl text-center font-bold">
      Delivery Charges
    </h4>

    <Shortcode :content="page.content"></Shortcode>
  </section>
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
    this.page = await this.$get('page/pageSlug', {
      slug: 'delivery-charges',
    })
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

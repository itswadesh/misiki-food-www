<template>
  <section>
    <div
      class="
        pt-5
        pb-10
        px-2
        conatiner
        mx-auto
        w-full
        lg:max-w-6xl
        text-gray-800
      "
    >
      <h4 class="my-5 md:my-10 text-2xl md:text-4xl font-bold text-center">
        Anne Terms
      </h4>

      <h4 class="text-xl md:text-2xl font-bold">
        For Content Provider/Educator
      </h4>

      <ul class="mt-3 md:mt-5 list-disc ps-6 md:ps-8 space-y-2 md:space-y-3">
        <li>
          <h6>
            <b>Our mission</b>
            is to share knowledge. We provide a platform to design/frame
            customized content in the form of Videos, Notes, MCQs, and Tuitions
            etc. in all Indian Languages and to reach out to the users who need
            it.
          </h6>
        </li>

        <li>
          <h6>
            The content you provide will be shown to the users "is as" basis.
            Your profile will be visible to the Users along with the details you
            provided us. You can edit/delete/add your content as per
            requirement.
          </h6>
        </li>

        <li>
          <h6>
            The contents you provide should be original &amp; unique and it does
            not violate the legal right of any other party or any applicable
            laws. You are responsible for the content that you provide. By using
            <q><nuxt-link to="/" class="link">anne.biz </nuxt-link></q> platform
            <b>(website/app)</b> , you grant us certain rights and license to
            access your content to promote it and to reach out to the
            prospective users.
          </h6>
        </li>

        <li>
          <h6>
            When you use
            <q><nuxt-link to="/" class="link">anne.biz </nuxt-link></q> platform
            <b>(website/app)</b>, you also agree to our
            <i> <b>Terms of Service</b></i> , accept our
            <i> <b>Privacy Policy</b></i> , Copyright and Trademark Policy.
          </h6>
        </li>

        <li>
          <h6>
            If you think someone has violated your intellectual property rights,
            other laws or
            <nuxt-link to="/" class="link">anne.biz </nuxt-link> policies, you
            can initiate a report at our Contact Us page.
          </h6>
        </li>
      </ul>

      <h4 class="mt-10 text-xl md:text-2xl font-bold">
        For Content Provider/Educator
      </h4>

      <ul class="mt-3 md:mt-5 list-disc ps-6 md:ps-8 space-y-2 md:space-y-3">
        <li>
          <h6>
            <b>Our mission<em /></b> is to share knowledge. We provide a
            platform to search/find contents in the form of Videos, Notes, MCQs
            and Educators for Tuition in all Indian Languages.
          </h6>
        </li>

        <li>
          <h6>
            WE believe in active participation that’s why we provide a feedback
            forum for our users. Here you can directly interact with the
            Original Content Provider.
          </h6>
        </li>

        <li>
          <h6>
            You can use the content for your personal use and not for printing
            or any other business purpose.
            <nuxt-link to="/" class="link">anne.biz</nuxt-link> platform may
            contain links to third-party sites/Original Content Provider sites.
            We are not responsible for the practices of such third parties,
            whose information practices are subject to their own policies and
            procedures.
          </h6>
        </li>

        <li>
          <h6>
            When you use
            <q><nuxt-link to="/" class="link">anne.biz </nuxt-link></q> platform
            <b>(website/app)</b>, you also agree to our
            <i> <b>Terms of Service</b></i> , accept our
            <i> <b>Privacy Policy</b></i> , Copyright and Trademark Policy.
          </h6>
        </li>

        <li>
          <h6>
            If you think someone has violated your intellectual property rights,
            other laws or anne.biz policies, you can initiate a report at our
            <nuxt-link to="/contact-us" class="link whitespace-nowrap"
              >Contact Us</nuxt-link
            >
            page.
          </h6>
        </li>
      </ul>
    </div>
  </section>
</template>
<script>
import Megamenu from '~/components/Home/Megamenu.vue'
import NuxtLink from '~/components/NuxtLink.vue'

export default {
  components: { Megamenu, NuxtLink },
  head() {
    return {
      title: 'Terms and Conditions',
    }
  },
}
</script>
<style scoped>
h6 {
  @apply text-sm md:text-base;
}
</style>

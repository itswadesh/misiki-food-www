<template>
  <div class="mx-auto text-gray-800">
    <div
      v-if="$apollo.loading"
      class="
        p-2
        h-64
        bg-gray-50
        flex
        items-center
        justify-center
        text-center
        rounded-md
        shadow-md
      "
    >
      <span> Loading...</span>
    </div>

    <div
      v-if="img"
      class="
        relative
        h-64
        bg-no-repeat bg-contain bg-gray-50
        border
        rounded-md
        shadow-md
        preview-img-item
        flex
        justify-center
        items-center
        group
      "
    >
      <img v-lazy="img" class="w-full h-full object-contain object-center" />

      <!-- Delete button start -->

      <button
        v-if="!multi"
        type="button"
        class="
          hidden
          group-hover:block
          absolute
          p-1
          transition
          duration-300
          transform
          rounded-md
          hover:bg-opacity-50 hover:bg-gray-900 hover:shadow-md
          text-gray-500
          hover:text-white
          top-3
          right-3
          focus:outline-none focus:scale-75
        "
        @click="removeImage(img)"
      >
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
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>

      <!-- Delete button end -->
    </div>

    <form v-else enctype="multipart/form-data" novalidate>
      <div
        class="
          relative
          h-48
          p-2
          text-gray-600
          bg-gray-50
          hover:bg-primary-100
          transition
          duration-300
          rounded-md
          shadow-md
          cursor-pointer
          border border-gray-300
        "
      >
        <div
          class="
            border-2 border-gray-300 border-dashed
            w-full
            h-full
            rounded-md
            flex
            items-center
            justify-center
          "
        >
          <input
            ref="file"
            :multiple="multi"
            type="file"
            name="photos"
            :disabled="isSaving"
            accept="image/*"
            class="absolute w-full h-48 opacity-0 cursor-pointer"
            @change="uploadPhoto"
          />

          <div
            class="p-2 flex items-center justify-center text-center text-base"
          >
            <p v-if="isInitial">
              Drag {{ name }} here to upload <br />or click to browse
            </p>

            <p v-if="isSaving">Uploading {{ fileCount }} files...</p>

            <p v-if="isSuccess">
              {{ fileCount }} files uploaded successfully...
            </p>

            <p v-if="isFailed">
              Upload failed. Please

              <a @click="currentStatus = 0">try again</a>
            </p>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import fileUpload from '~/gql/file/fileUpload.gql'
import deleteFile from '~/gql/product/deleteFile.gql'
const STATUS_INITIAL = 0
const STATUS_SAVING = 1
const STATUS_SUCCESS = 2
const STATUS_FAILED = 3

export default {
  // name required for removing

  props: {
    placeholder: { type: String, required: false, default: 'img' },
    image: { type: String, required: false, default: null },
    name: { type: String, required: false, default: 'banner' },
    folder: { type: String, required: false, default: 'img' },
    crunch: { type: Boolean, required: false, default: false },
    multi: { type: Boolean, required: false, default: false },
  },

  data() {
    return {
      img: null,
      currentStatus: 0,
      data: null,
      error: null,
      loading: false,
    }
  },

  computed: {
    isInitial() {
      return this.currentStatus === STATUS_INITIAL
    },

    isSaving() {
      return this.currentStatus === STATUS_SAVING
    },

    isSuccess() {
      return this.currentStatus === STATUS_SUCCESS
    },

    isFailed() {
      return this.currentStatus === STATUS_FAILED
    },
  },

  watch: {
    image() {
      this.img = this.image
    },
  },

  mounted() {
    this.img = this.image
  },

  methods: {
    ...mapMutations({
      setErr: 'setErr',
      clearErr: 'clearErr',
      success: 'success',
      busy: 'busy',
    }),

    async uploadPhoto({ target }) {
      try {
        this.clearErr()
        this.loading = true
        let images = await this.$post('file/fileUpload', {
          files: target.files,
          folder: this.folder,
        })
        // let images = (
        //   await this.$apollo.mutate({
        //     mutation: fileUpload,
        //     variables: { files: target.files, folder: this.folder },
        //     fetchPolicy: 'no-cache',
        //   })
        // ).data.fileUpload
        // console.log(images)
        if (!images) return this.setErr('Error uploading image')
        images = images.map((o) => o.url)
        // console.log(images[0])
        if (!this.multi) {
          this.img = images[0]
          this.$emit('save', this.name, this.img)
        } else {
          this.$emit('save', this.name, images)
        }
        this.$refs.file.value = ''
      } catch (e) {
        // console.log('err... ', e)
        this.setErr(e)
      } finally {
        this.loading = false
      }
    },

    imgPath(i) {
      return `${i}?a=${Math.random()}`
    },

    save(imagePath) {
      this.img = imagePath
      this.$emit('save', this.name, imagePath)
    },

    removeImage(image) {
      const vm = this
      this.$swal({
        title: 'Delete image?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
      }).then((result) => {
        if (result.value) {
          vm.deleteConfirmed(image)
        }
      })
      vm.deleteConfirmed(image)
    },

    async deleteConfirmed(image) {
      try {
        this.clearErr()
        this.img = ''
        await this.$post('product/deleteFile', { url: image })
        // await this.$apollo.mutate({
        //   mutation: deleteFile,
        //   variables: { url: image },
        //   fetchPolicy: 'no-cache',
        // })
        this.$emit('remove', this.name, this.img)
      } catch (e) {
        this.setErr(e)
      } finally {
        this.busy(false)
      }
    },
  },
}
</script>

<style scoped></style>

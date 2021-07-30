<template>
  <div class="mx-auto mt-4 bg-gray-100">
    <div v-if="$apollo.loading">Loading...</div>
    <div
      v-if="img"
      v-lazy:background-image="`${img}`"
      class="relative h-48 bg-no-repeat bg-contain"
    >
      <button
        v-if="!multi"
        type="button"
        class="
          absolute
          top-0
          right-0
          flex
          items-center
          justify-center
          w-8
          h-8
          bg-gray-300
          rounded-full
          cursor-pointer
          fab
          hover:bg-gray-200
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
    </div>
    <form v-else enctype="multipart/form-data" novalidate>
      <div
        class="
          relative
          flex
          items-center
          justify-center
          h-48
          p-4
          text-center text-gray-600
          border-2 border-gray-200 border-dashed
          cursor-pointer
          bg-cgray-200
          hover:bg-primary-200
        "
      >
        <input
          :multiple="multi"
          type="file"
          name="photos"
          :disabled="isSaving"
          accept="image/*"
          class="absolute w-full h-48 opacity-0 cursor-pointer"
          @change="uploadPhoto"
        />
        <span v-if="isInitial">
          Drag {{ name }} here to upload <br />or click to browse
        </span>
        <span v-if="isSaving">Uploading {{ fileCount }} files...</span>
        <span v-if="isSuccess">
          {{ fileCount }} files uploaded successfully...
        </span>
        <span v-if="isFailed">
          Upload failed. Please
          <a @click="currentStatus = 0">try again</a>
        </span>
      </div>
    </form>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import FILE_UPLOAD from '~/gql/file/fileUpload.gql'
import DELETE_FILE from '~/gql/product/deleteFile.gql'
const STATUS_INITIAL = 0
const STATUS_SAVING = 1
const STATUS_SUCCESS = 2
const STATUS_FAILED = 3
export default {
  // name required for removing
  props: {
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
      // console.log(this.img)
    },
  },
  mounted() {
    this.img = this.image
  },
  methods: {
    ...mapMutations({
      clearErr: 'clearErr',
      setErr: 'setErr',
      success: 'success',
      busy: 'busy',
    }),
    async uploadPhoto({ target }) {
      try {
        this.clearErr()
        let images = await this.$post('file/fileUpload', {
          files: target.files,
          folder: this.folder,
        })
        // let images = (
        //   await this.$apollo.mutate({
        //     mutation: FILE_UPLOAD,
        //     variables: { files: target.files, folder: this.folder },
        //     fetchPolicy: 'no-cache',
        //   })
        // ).data.fileUpload
        images = images.map((o) => o.filename)
        if (!this.multi) {
          this.img = images[0]
          this.$emit('save', this.name, this.img)
        } else {
          this.$emit('save', this.name, images)
        }
      } catch (e) {
        this.setErr(e)
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
    },
    async deleteConfirmed(image) {
      try {
        this.clearErr()
        this.img = ''
        await this.$apollo.mutate({
          mutation: DELETE_FILE,
          variables: { path: image },
          fetchPolicy: 'no-cache',
        })
        this.$emit('remove', this.name)
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

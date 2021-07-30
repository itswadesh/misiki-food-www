<template>
  <div class="mx-auto mt-4 bg-gray-100">
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
        :id="'file'"
        :ref="'file'"
        class="absolute w-full h-48 opacity-0 cursor-pointer"
        :class="{ loading: isLoading }"
        type="file"
        name="file"
        accept=".csv"
        :disabled="isLoading"
        @change="importProduct"
      />
      <span v-if="isInitial">
        Drag {{ name }} here to upload <br />or click to browse
      </span>
      <span v-if="isLoading">Uploading {{ name }}...</span>
      <span v-if="isSuccess"> File uploaded successfully... </span>
      <span v-if="isFailed">
        Upload failed. Please
        <a @click="currentStatus = 0">try again</a>
      </span>
      <div v-if="msg" class="success m-2">{{ msg }}</div>
      <div v-else-if="err" class="failed text-brand-700 m-2">
        {{ err }}
      </div>
    </div>
  </div>
</template>

<script>
import IMPORT_PRODUCT from '~/gql/file/importProduct.gql'

export default {
  props: {
    name: { type: String, required: false, default: '' },
    //   loading: { type: Boolean, required: false, default: false },
    //   msg: { type: String, required: false, default: null },
    //   err: { type: String, required: false, default: null },
  },
  data() {
    return {
      isInitial: true,
      isFailed: false,
      isSuccess: false,
      isLoading: false,
      msg: null,
      err: null,
    }
  },
  methods: {
    async importProduct({ target }) {
      this.msg = null
      this.err = null
      this.isInitial = false
      this.isLoading = true
      const formData = new FormData()
      formData.append('file', this.file)
      try {
        const importNo = await this.$post('file/importProduct', {
          file: target.files[0],
        })
        // const importNo = (
        //   await this.$apollo.mutate({
        //     mutation: IMPORT_PRODUCT,
        //     variables: { file: target.files[0] },
        //     fetchPolicy: 'no-cache',
        //   })
        // ).data.importProduct
        this.isSuccess = false
        this.isFailed = false
        this.isInitial = true
        document.getElementById('file').value = ''
        this.$emit('change', importNo)
      } catch (e) {
        this.isSuccess = false
        this.isFailed = true
        this.isInitial = false
        if (e && e.response) this.err = 'Failed::: ' + e.response.data
        this.$store.commit('setErr', e)
      } finally {
        this.isLoading = false
      }
    },
  },
}
</script>

<style scoped></style>

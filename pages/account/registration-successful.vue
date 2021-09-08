<template>
  <div class="container">
    <h1>Registration successfull</h1>
  </div>
</template>

<script>
export default {
  head() {
    return {
      title: `Registration Successfull | ${this.store.websiteName || ''}`,
    }
  },
}
</script>

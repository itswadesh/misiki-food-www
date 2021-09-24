<template>
  <div>
    <div v-if="ast && ast.length">
      <div v-for="(a, ix) in ast" :key="ix">
        <component :is="a.name" v-if="a.type == 'SELF_CLOSING'"></component>
        <div v-else v-html="a.body"></div>
      </div>
    </div>
    <div v-else class="container mx-auto prose" v-html="content" />
  </div>
</template>

<script>
import Tokenizer from 'shortcode-tokenizer'
// function renderText(token) {
//   if (token.type === Tokenizer.TEXT || token.type === Tokenizer.ERROR) {
//     token.output = token.body
//   }
//   return token
// }
// function renderSelfClosing(token) {
//   if (token.type === Tokenizer.SELF_CLOSING) {
//     const name = getComponentName(token)
//     const params = renderParams(token)
//     token.output = `<${name}${params}></${name}>`
//   }
//   return token
// }
export default {
  props: {
    content: {
      type: String,
      required: true,
      default: '',
    },
    strict: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      ast: [],
    }
  },
  created() {
    this.tokenizer = new Tokenizer()
    this.tokenizer.strict = this.strict
    this.renderContent()
  },
  methods: {
    renderContent() {
      try {
        const ast = this.tokenizer.input(this.content).ast()
        this.ast = ast
      } catch (e) {}
    },
  },
}
</script>

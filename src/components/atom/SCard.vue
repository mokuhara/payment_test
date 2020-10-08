<template>
  <div>
    <div class="container">
      <div class="wrapper">
        <div class="imageWrapper">
          <img :src="iconUrl" />
        </div>
        <div>
          <p>{{ name }}</p>
          <div v-html="compiledMarkdown"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import marked from "marked";
import hljs from "highlightjs";

export default {
  props: {
    userId: String,
    iconUrl: String,
    name: String,
    description: String,
  },
  computed: {
    compiledMarkdown() {
      if (!this.description) return;
      return marked(this.description);
    },
  },
  created() {
    marked.setOptions({
      langPrefix: "",
      highlight(code, lang) {
        return hljs.highlightAuto(code, [lang]).value;
      },
    });
  },
};
</script>

<style scoped>
.wrapper {
  display: flex;
}

.imageWrapper img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
</style>

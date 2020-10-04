<template>
  <div>
    <div class="text">
      <!-- <p>{{ mtext }}</p> -->
      <markdown-it-vue
        class="md-body"
        :content="mtext"
        :options="options"
        style="font-size:10px;width:100wh;"
      />
    </div>
  </div>
</template>

<script>
import MarkdownItVue from "markdown-it-vue";
import "markdown-it-vue/dist/markdown-it-vue.css";

export default {
  components: {
    MarkdownItVue,
  },
  props: {
    mtext: String,
  },
  data() {
    return {
      options: {
        markdownIt: {
          linkify: true,
        },
        linkAttributes: {
          attrs: {
            target: "_self",
            rel: "noopener",
          },
        },
      },
    };
  },
};
</script>

<style lang="scss" scoped>
.text {
  padding: 4px 0;
  margin: 0;
  display: flex;
  text-align: left;
}

p {
  margin: 0;
}
</style>

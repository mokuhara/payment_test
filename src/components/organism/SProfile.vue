<template>
  <div>
    <div class="container">
      <div v-if="specialist.name">
        <div>
          <h3>名前</h3>
          <img :src="specialist.iconUrl" alt="" />
          <p>{{ specialist.name }}</p>
        </div>
        <div>
          <h3>説明</h3>
          <div v-html="compiledMarkdown"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";

const { mapState: mapStateOfUsers } = createNamespacedHelpers("user");

import marked from "marked";
import hljs from "highlightjs";

export default {
  computed: {
    ...mapStateOfUsers(["specialist"]),
    compiledMarkdown() {
      return marked(this.specialist.description);
    },
  },
  created() {
    this.$store.dispatch("user/get", {
      user: {},
    });

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
img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
</style>

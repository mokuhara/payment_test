<template>
  <div>
    <div class="container">
      <div class="wrapper">
        <div class="imageWrapper">
          <img :src="specialist.iconUrl" />
        </div>
        <div>
          <p>{{ specialist.name }}</p>
          <div v-html="compiledMarkdown"></div>
        </div>
      </div>
      <div>
        <ZoomButton />
        <Stripe />
      </div>
    </div>
  </div>
</template>

<script>
import marked from "marked";
import hljs from "highlightjs";

import ZoomButton from "../molecule/zoomButton";
import Stripe from "../molecule/Stripe";

import { createNamespacedHelpers } from "vuex";

const { mapState: mapStateOfUsers } = createNamespacedHelpers("user");

export default {
  components: {
    ZoomButton,
    Stripe,
  },
  props: {
    userId: String,
    iconUrl: String,
    name: String,
    description: String,
  },
  computed: {
    ...mapStateOfUsers(["specialist"]),
    compiledMarkdown() {
      if (!this.specialist.description) return;
      return marked(this.specialist.description);
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

<template>
  <div>
    <div class="container">
      <div class="wrapper">
        <div class="imageWrapper">
          <img :src="specialist.iconUrl" />
        </div>
        <div class="explainWrapper">
          <p>{{ specialist.name }}</p>
          <div>
            説明
            <div v-html="compiledMarkdown"></div>
          </div>
        </div>
      </div>
      <div>
        <div class="btnWrapper">
          <div class="zoomWrapper">
            <ZoomButton />
          </div>
          <div>
            <Stripe />
          </div>
        </div>
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
  padding-left: 20%;
}

.imageWrapper img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}

.explainWrapper {
  padding-left: 10px;
}

.btnWrapper {
  display: flex;
  padding-left: 60%;
}

.zoomWrapper {
  padding-right: 20px;
}
</style>

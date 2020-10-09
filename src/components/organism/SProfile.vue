<template>
  <div>
    <div class="container">
      <div v-if="specialist.name" class="warpper">
        <div class="leftContainer">
          <img :src="specialist.iconUrl" alt="" />
        </div>
        <div class="rightContainer">
          <div>
            <h3>名前</h3>
            <p>{{ specialist.name }}</p>
          </div>
          <div>
            <h3>説明</h3>
            <div v-html="compiledMarkdown"></div>
          </div>
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
.warpper {
  display: flex;
}

img {
  width: 100px;
  height: 100px;
  border-radius: 50%;
}

.leftContainer {
  padding-top: 20px;
  padding-left: 20%;
  padding-right: 20px;
}
</style>

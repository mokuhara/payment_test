<template>
  <div>
    <div class="container">
      <div class="title">
        説明分
      </div>
      <div class="content">
        <div class="editor">
          <textarea v-model="markdownText" @blur="submitData">input</textarea>
        </div>
        <div class="preview">
          <div v-html="compiledMarkdown"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";

const {
  mapState: mapStateOfUsers,
  mapMutations: mapMutationsOfUsers,
} = createNamespacedHelpers("user");

import marked from "marked";
import hljs from "highlightjs";

export default {
  name: "postForm",
  data() {
    return {
      markdownText: "",
    };
  },
  computed: {
    ...mapStateOfUsers(["specialist"]),
    compiledMarkdown() {
      return marked(this.markdownText);
    },
  },
  methods: {
    ...mapMutationsOfUsers(["storeSpecialistAttr"]),
    submitData() {
      const payload = {
        type: "description",
        data: this.markdownText,
      };
      this.storeSpecialistAttr(payload);
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

<style src="highlightjs/styles/github-gist.css"></style>

<style scoped>
.content {
  display: flex;
  width: 600px;
  height: 300px;
}

.editor {
  margin: 0;
  width: 300px;
  height: 100%;
  font-family: "Helvetica Neue", Arial, sans-serif;
  color: #333;
}

.editor textarea {
  display: inline-block;
  width: 300px;
  height: 100%;
  vertical-align: top;
  box-sizing: border-box;
  padding: 5px 20px;
}

.preview div {
  text-align: left;
  width: 300px;
  padding: 5px 20px;
  margin: 0;
  overflow-wrap: break-word;
}

textarea {
  border: none;
  /* border-right: 1px solid #ccc; */
  resize: none;
  outline: none;
  background-color: #f6f6f6;
  font-size: 14px;
  font-family: "Monaco", courier, monospace;
  padding: 20px;
}
</style>

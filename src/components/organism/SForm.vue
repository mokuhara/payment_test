<template>
  <div>
    <div class="container">
      <div>
        <InputText />
      </div>
      <div>
        <ImageUploader />
      </div>
      <div>
        <InputMarkdown />
      </div>
      <div>
        <!-- <InputTags /> -->
      </div>
      <div>
        <SubmitButton :text="text" :callback="callback" />
      </div>
    </div>
  </div>
</template>

<script>
import InputMarkdown from "../molecule/InputMarkdown";
import InputText from "../molecule/InputText";
import ImageUploader from "../molecule/ImageUploader";
import SubmitButton from "../atom//Button";
// import InputTags from "../molecule/InputTags";

import { createNamespacedHelpers } from "vuex";

const { mapActions: mapActionsOfUsers } = createNamespacedHelpers("user");

export default {
  components: {
    InputMarkdown,
    InputText,
    ImageUploader,
    SubmitButton,
    // InputTags,  Vue 3 hasn't even been released yet
  },
  data() {
    return {
      text: "送信",
    };
  },
  methods: {
    ...mapActionsOfUsers(["update"]),
    callback() {
      this.update();
    },
  },
  created() {
    this.$store.dispatch("user/get", {
      user: {},
    });
  },
};
</script>

<style scoped></style>

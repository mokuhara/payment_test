<template>
  <div>
    <div class="container">
      <div class="name block">
        <InputText />
      </div>
      <div class="icon block">
        <ImageUploader />
      </div>
      <div class="description block">
        <InputMarkdown />
      </div>
      <div>
        <!-- <InputTags /> -->
      </div>
      <div class="btn block">
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
const { mapMutations: mapMutationsOfModal } = createNamespacedHelpers("modal");

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
    ...mapMutationsOfModal(["changeModalStatus"]),
    callback() {
      this.update();
      this.changeModalStatus(false);
    },
  },
  //   created() {
  //     this.$store.dispatch("user/get", {
  //       user: {},
  //     });
  //   },
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.block {
  margin: 10px;
}
</style>

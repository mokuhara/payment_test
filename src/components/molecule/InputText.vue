<template>
  <div>
    <div class="container">
      <div class="title">
        名前
      </div>
      <div class="content">
        <input type="text" v-model="text" @blur="submitData" />
      </div>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";

const { mapMutations: mapMutationsOfUsers } = createNamespacedHelpers("user");

export default {
  data() {
    return {
      text: "",
    };
  },
  methods: {
    ...mapMutationsOfUsers(["storeSpecialistAttr"]),
    submitData() {
      const payload = {
        type: "name",
        data: this.text,
      };
      this.storeSpecialistAttr(payload);
    },
  },
};
</script>

<style scoped></style>

<template>
  <div>
    <div class="container">
      <div class="title">
        名前
      </div>
      <div class="contentWrapper">
        <div class="content">
          <input type="text" v-model="text" @blur="submitData" />
        </div>
        <div class="input">
          {{ text }}
        </div>
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

<style scoped>
.contentWrapper {
  display: flex;
  padding-left: 100px;
}

.content input {
  padding: 5px;
  border: 1px solid rgb(173, 182, 182);
}

.input {
  display: flex;
  align-items: center;
  padding-left: 10px;
}
</style>

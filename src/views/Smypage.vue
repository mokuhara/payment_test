<template>
  <div>
    <div class="container">
      <SForm />
    </div>
  </div>
</template>

<script>
import SForm from "../components/organism/SForm";
export default {
  components: {
    SForm,
  },
  created() {
    this.$store.dispatch("user/get", {
      user: {},
    });
  },
};
</script>

<style scoped></style>

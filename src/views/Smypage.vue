<template>
  <div>
    <div class="container">
      <InputMarkdown />
    </div>
  </div>
</template>

<script>
import InputMarkdown from "../components/molecule/InputMarkdown";
export default {
  components: {
    InputMarkdown,
  },
  created() {
    this.$store.dispatch("user/get", {
      user: {},
    });
  },
};
</script>

<style scoped></style>

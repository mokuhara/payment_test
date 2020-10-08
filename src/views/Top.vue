<template>
  <div>
    <div class="container">
      <SCardList />
    </div>
    <hoge />
  </div>
</template>

<script>
import SCardList from "../components/molecule/SCardList";
import hoge from "../components/molecule/zoomButton";

export default {
  components: {
    SCardList,
    hoge,
  },
};
</script>

<style scoped></style>

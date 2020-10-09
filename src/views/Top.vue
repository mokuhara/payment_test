<template>
  <div>
    <div class="container">
      <div>
        スペシャリスト一覧
      </div>
      <div class="scardWrapper">
        <SCardList />
      </div>
    </div>
  </div>
</template>

<script>
import SCardList from "../components/molecule/SCardList";

export default {
  components: {
    SCardList,
  },
};
</script>

<style scoped>
.scardWrapper {
  margin-top: 10px;
}
</style>

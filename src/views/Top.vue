<template>
  <div>
    <div class="container">
      <SCardList />
    </div>
    <ZoomButton />
    <Stripe />
  </div>
</template>

<script>
import SCardList from "../components/molecule/SCardList";
import ZoomButton from "../components/molecule/zoomButton";
import Stripe from "../components/molecule/Stripe";

export default {
  components: {
    SCardList,
    ZoomButton,
    Stripe,
  },
};
</script>

<style scoped></style>

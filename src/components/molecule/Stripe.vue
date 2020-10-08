<template>
  <div>
    <div class="container">
      <div @click="application">
        こやつのプロフェッショナルサービス受ける
      </div>
      <div v-if="plan">
        {{ plan }}
      </div>
    </div>
  </div>
</template>

<script>
// import axios from "axios";
import { createNamespacedHelpers } from "vuex";

const {
  mapState: mapStateOfStripe,
  mapActions: mapActionsOfStripe,
} = createNamespacedHelpers("stripe");

export default {
  computed: {
    ...mapStateOfStripe(["plan"]),
  },
  methods: {
    ...mapActionsOfStripe(["create"]),
    application() {
      this.create({});
      this.$router.push("/payment/complete");
    },
  },
};
</script>

<style scoped></style>

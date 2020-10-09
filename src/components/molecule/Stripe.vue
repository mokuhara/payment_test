<template>
  <div>
    <div class="container">
      <div @click="application" class="btn">
        契約する
      </div>
      <div class="plan" v-if="plan">
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

<style scoped>
.btn {
  display: inline-block;
  padding: 3px 8px;
  background-color: rgb(196, 47, 38);
  color: #fff;
  border-radius: 3px;
}

.plan {
  padding-top: 10px;
}
</style>

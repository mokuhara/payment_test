<template>
  <div>
    <div class="container">
      <div @click="createRoom">
        こやつと面談したい
      </div>
      <div v-if="room">
        <a :href="room">zoomURL</a>
      </div>
    </div>
  </div>
</template>

<script>
// import axios from "axios";
import { createNamespacedHelpers } from "vuex";

const {
  mapState: mapStateOfZoom,
  mapActions: mapActionsOfZoom,
} = createNamespacedHelpers("zoom");

const { mapState: mapStateOfUsers } = createNamespacedHelpers("user");

export default {
  computed: {
    ...mapStateOfUsers(["specialist"]),
    ...mapStateOfZoom(["room"]),
  },
  methods: {
    ...mapActionsOfZoom(["create"]),
    createRoom() {
      if (!this.specialist.userId) return;
      this.create({ userId: this.specialist.userId });
    },
  },
};
</script>

<style scoped></style>

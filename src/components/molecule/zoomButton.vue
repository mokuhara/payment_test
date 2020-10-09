<template>
  <div>
    <div class="container">
      <div @click="createRoom" class="btn">
        面談する
      </div>
      <div class="room" v-if="room">
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

<style scoped>
.btn {
  display: inline-block;
  padding: 5px 12px;
  background-color: rgb(240, 241, 241);
  border-radius: 3px;
}

.room {
  padding-top: 10px;
}
</style>

<template>
  <div>
    <div class="container">
      <div class="uploadWrapper">
        <div
          class="dropArea"
          @dragenter="dragEnter"
          @dragover.prevent
          @dragleave="dragLeave"
          @drop.prevent="dropFile"
          :class="{ enter: isEnter }"
        >
          > ファイルをドラッグ＆ドロップ
        </div>
        <div class="uploadImage" v-if="specialist.iconUrl">
          <img :src="specialist.iconUrl" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";

const {
  mapState: mapStateOfUsers,
  mapActions: mapActionsOfUsers,
} = createNamespacedHelpers("user");

export default {
  data() {
    return {
      isEnter: false,
    };
  },
  computed: {
    ...mapStateOfUsers(["specialist"]),
  },
  methods: {
    ...mapActionsOfUsers(["uploadImage"]),
    dragEnter() {
      this.isEnter = true;
      console.log("Enter Drop Area");
    },
    dragLeave() {
      this.isEnter = false;
    },
    dropFile() {
      this.isEnter = false;
      const files = event.target.files || event.dataTransfer.files;
      const data = new FormData();
      data.append("file", files[0]);
      this.uploadImage(data);
    },
  },
};
</script>

<style scoped>
.uploadWrapper {
  display: flex;
}

.enter {
  border: 10px solid powderblue;
}

.dropArea {
  width: 100px;
  height: 100px;
}

.uploadImage img {
  width: 100px;
  height: 100px;
  object-fit: cover;
}
</style>

<template>
  <div>
    <div class="container">
      <div>
        画像アップロード
      </div>
      <div class="uploadWrapper">
        <div
          class="dropArea"
          @dragenter="dragEnter"
          @dragover.prevent
          @dragleave="dragLeave"
          @drop.prevent="dropFile"
          :class="{ enter: isEnter }"
        >
          ファイルをドラッグ＆ドロップ
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
  justify-content: center;
}

.dropArea.enter {
  border: 3px solid rgba(145, 204, 204, 0.5);
  background-color: rgba(145, 204, 204, 0.5);
}

.dropArea {
  display: flex;
  align-items: center;
  width: 150px;
  height: 150px;
  border: 3px dotted rgb(240, 241, 241);
  text-align: center;
}

.uploadImage {
  padding-left: 15px;
}

.uploadImage img {
  width: 150px;
  height: 150px;
  object-fit: cover;
}
</style>

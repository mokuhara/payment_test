<template>
  <div>
    <div class="container">
      <div>
        <Sprofile />
      </div>
      <div @click="openModal">
        登録
      </div>
      <div v-if="isOpen">
        <Modal>
          <SForm />
        </Modal>
      </div>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";

const {
  mapState: mapStateOfModal,
  mapMutations: mapMutationsOfModal,
} = createNamespacedHelpers("modal");

import SForm from "../components/organism/SForm";
import Modal from "../components/molecule/Modal";
import Sprofile from "../components/organism/SProfile";

export default {
  components: {
    SForm,
    Modal,
    Sprofile,
  },
  computed: {
    ...mapStateOfModal(["isOpen"]),
  },
  methods: {
    ...mapMutationsOfModal(["changeModalStatus"]),
    openModal() {
      this.changeModalStatus(true);
    },
  },
  created() {
    this.$store.dispatch("user/get", {
      user: {},
    });
  },
};
</script>

<style scoped></style>

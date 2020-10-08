<template>
  <div>
    <transition name="modal" appear>
      <div class="modalOverlay" @click.self="closeModal">
        <div class="modalWindow">
          <button class="closeButton" @click="closeModal">×</button>
          <div class="modalContent">
            <slot></slot>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";

const { mapMutations: mapMutationsOfModal } = createNamespacedHelpers("modal");

export default {
  methods: {
    ...mapMutationsOfModal(["changeModalStatus"]),
    closeModal() {
      return this.changeModalStatus(false);
    },
  },
};
</script>

<style scoped>
button:focus {
  outline: 0;
}
.modalOverlay {
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  z-index: 99999999;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
}
.modalWindow {
  position: relative;
  background: #fff;
  border-radius: 0.2rem;
  box-shadow: 0 0 3rem rgba(0, 0, 0, 0.6);
  vertical-align: middle;
  width: 80%;
  max-width: 600px;
  height: 450px;
}
.modalContent {
  height: 100%;
  overflow: hidden;
  overflow-y: scroll;
}
.closeButton {
  position: absolute;
  top: -1.2rem;
  right: -1rem;
  border-radius: 50%;
  width: 2.5rem;
  height: 2.5rem;
  background-color: black;
  color: white;
  font-size: 1.2rem;
  z-index: 99;
}
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.4s;
}

.modal-leave-active .modalWindow {
  transition: opacity 0.4s, transform 0.4s;
}

.modal-enter,
.modal-leave-to {
  opacity: 0;
}

.modal-enter,
.modal-leave-to .modalWindow {
  opacity: 0;
  transform: translateY(-20px);
}
</style>

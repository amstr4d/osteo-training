<template>
  <transition name="modal-fade">
    <div class="modal" v-if="show">
      <div class="modal-backdrop" @click="closeModal()"/>

      <div class="modal-dialog">
        <div class="modal-header">
          <slot name="header"/>
        </div>

        <div class="modal-body">
          <slot name="body"/>
        </div>

        <div class="modal-footer">
          <slot name="footer"/>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'Modal',
  data() {
    return {
      show: false,
    };
  },
  methods: {
    closeModal() {
      this.show = false;
    },
    openModal() {
      this.show = true;
    },
  },
};
</script>

<style scoped>
.modal {
  @apply fixed top-0 right-0 left-0 bottom-0 overflow-x-hidden overflow-y-auto z-10;
}

.modal-backdrop {
  @apply fixed top-0 right-0 left-0 bottom-0;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 1;
}

.modal-dialog {
  @apply relative bg-white flex flex-col rounded mx-auto my-12 p-4;
  width: 600px;
  z-index: 2;
}

.modal-header {
  @apply flex items-start justify-between;

}

.modal-body {
  @apply overflow-auto flex flex-col items-stretch mb-4;

}

.modal-footer {
  @apply flex justify-between pt-4;
}

.modal-fade-enter,
.modal-fade-leave-active {
  opacity: 0;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity .4s ease
}

</style>

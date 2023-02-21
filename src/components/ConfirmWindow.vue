<template>
  <div class="confirm-container">
    <h1>Are you sure?</h1>
    <div class="button-container">
      <button class="btn btn-success" @click="confirmDelete">Yes</button>
      <button class="btn btn-danger" @click="cancelDelete">No</button>
    </div>
  </div>
</template>

<script lang="ts">

export default {
  name: 'ConfirmWindow',
  props: {
    id: {
      type: String,
      required: true,
    }, 
  },
  methods: {
    confirmDelete() {
      this.$emit('confirm-delete', this.id);
    },
    cancelDelete() {
      this.$emit('cancel-delete');
    },
  },
};
</script>

<style scoped>
.confirm-container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  padding: 20px;
  margin-top: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}
.button-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.button-container button {
  margin-left: 10px;
}
</style>
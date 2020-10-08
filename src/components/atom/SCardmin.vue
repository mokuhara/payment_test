<template>
  <div>
    <div class="container">
      <router-link :to="{ name: 'Specialist', params: { id: userId } }">
        <div class="wrapper">
          <div class="imageWrapper">
            <img :src="iconUrl" />
          </div>
          <div>
            <p>{{ name }}</p>
          </div>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    userId: String,
    iconUrl: String,
    name: String,
  },
};
</script>

<style scoped>
.wrapper {
  display: flex;
}

.imageWrapper img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
</style>

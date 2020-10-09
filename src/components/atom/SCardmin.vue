<template>
  <div>
    <div class="container">
      <router-link :to="{ name: 'Specialist', params: { id: userId } }">
        <div class="box">
          <div class="imageWrapper">
            <img :src="iconUrl" />
          </div>
          <div class="nameWrapper">
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
.container {
  width: 300px;
  margin: 0 auto;
}

.box {
  display: flex;
  position: relative;
  padding: 15px;
  border-radius: 5px;
  box-shadow: 0 2px 5px #ccc;
  background-color: #fff;
}

.imageWrapper img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}

.nameWrapper {
  padding-left: 30px;
}
</style>

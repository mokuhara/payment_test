<template>
  <div id="nav">
    <router-link to="/">Top</router-link> |
    <!-- <router-link to="/specialist">Specialists</router-link> | -->
    <!-- <router-link to="/payment/complete">PaymentComplete</router-link> | -->
    <router-link
      v-if="specialist && specialist.userId"
      :to="{ name: 'Smypage', params: { id: specialist.userId } }"
      >Mypage</router-link
    >
  </div>
  <router-view />
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapState: mapStateOfUsers } = createNamespacedHelpers("user");
export default {
  computed: {
    ...mapStateOfUsers(["specialist"]),
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>

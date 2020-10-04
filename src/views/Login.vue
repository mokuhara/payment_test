<template>
  <div>
    <div class="box">
      <div class="field">
        <div class="control">
          <input
            class="input"
            type="email"
            v-model="email"
            placeholder="Eメール"
          />
        </div>
      </div>
      <div class="field">
        <div class="control">
          <input
            class="input"
            type="password"
            v-model="password"
            placeholder="パスワード"
            maxlength="20"
          />
        </div>
      </div>
      <button class="button" @click="login()">
        送信
      </button>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";

const {
  mapState: mapStateOfAuth,
  mapActions: mapActionsOfAuth,
} = createNamespacedHelpers("auth");

const {
  mapState: mapStateOfUsers,
  mapActions: mapActionsOfUsers,
} = createNamespacedHelpers("user");

export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    ...mapActionsOfUsers(["get"]),
    ...mapActionsOfAuth(["create"]),
    login() {
      this.create({
        user: {
          email: this.email,
          password: this.password,
        },
      });
    },
  },
  computed: {
    ...mapStateOfUsers(["specialist"]),
    ...mapStateOfAuth(["token"]),
    // errorMessage() {
    //   return this.$store.state.message.error;
    // },
  },
  created() {
    // this.$store.dispatch("message/destroy");

    // already logined
    this.get({ user: {} });
    if (this.token && this.specialist && this.specialist.description) {
      this.$router.push("/");
    } else if (this.token && this.specialist && this.specialist.userId) {
      this.$router.push(`/mypage/${this.specialist.userId}/specialist`);
    }
  },
  watch: {
    token(newToken) {
      this.$router.push("/");
      console.log(newToken);
    },
  },
};
</script>

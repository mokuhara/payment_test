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
export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    login() {
      this.$store.dispatch("auth/create", {
        user: {
          email: this.email,
          password: this.password,
        },
      });
    },
  },
  computed: {
    token() {
      return this.$store.state.auth.token;
    },
    // errorMessage() {
    //   return this.$store.state.message.error;
    // },
  },
  created: function() {
    // this.$store.dispatch("message/destroy");
    // already logined
    if (this.$store.state.auth.token) {
      this.$router.push("/");
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

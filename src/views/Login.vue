<template>
  <div>
    <myNavbar :isLoginPage="true" />
    <div class="container">
      <b-card
        header="Login"
        header-text-variant="white"
        header-tag="header"
        header-bg-variant="dark"
      >
        <div>
          <b-form @submit="login">
            <b-form-group label="Email address:" label-for="email">
              <b-form-input
                id="email"
                type="email"
                required
                placeholder="Enter Email"
                v-model="email"
              ></b-form-input>
            </b-form-group>
            <b-form-group label="Password:" label-for="passwd">
              <b-form-input
                id="passwd"
                type="password"
                required
                placeholder="Enter Password"
                v-model="password"
              ></b-form-input>
            </b-form-group>
            <b-button type="submit" variant="primary" :disabled="disableSubmit"
              >Submit</b-button
            >
            <b-button type="reset" variant="danger" id="resetBtn"
              >Reset</b-button
            >
          </b-form>
        </div>
      </b-card>
    </div>
  </div>
</template>


<script>
import myNavbar from "../components/my-navbar";

export default {
  name: "Login",
  components: {
    myNavbar,
  },
  data() {
    return {
      email: "",
      password: "",
      disableSubmit: false,
    };
  },
  methods: {
    login(event) {
      event.preventDefault();
      this.disableSubmit = true;
      this.$store
        .dispatch("login_user", {
          email: this.email,
          password: this.password,
          router: this.$router,
        })
        .finally(() => {
          this.disableSubmit = false;
        });
    },
  },
};
</script>


<style scoped>
.container {
  margin: auto;
  margin-top: 90px;
  width: 90%;
}
#resetBtn {
  margin-left: 10px;
}
</style>


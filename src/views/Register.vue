<template>
  <div>
    <myNavbar :isRegisterPage="true" />
    <div class="container">
      <b-card
        header="Register"
        header-text-variant="white"
        header-tag="header"
        header-bg-variant="dark"
      >
        <div>
          <b-form @submit="register">
            <b-form-group label="User Name:" label-for="u_name">
              <b-form-input
                id="u_name"
                type="text"
                required
                placeholder="Enter User Name"
                v-model="user_name"
              ></b-form-input>
            </b-form-group>
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
              <b-form-invalid-feedback :state="validation">
                Your password must be at least 6 characters long.
              </b-form-invalid-feedback>
              <b-form-valid-feedback :state="validation">
                Looks Good.
              </b-form-valid-feedback>
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
  name: "Register",
  data() {
    return {
      user_name: "",
      email: "",
      password: "",
      disableSubmit: false,
    };
  },
  methods: {
    register(event) {
      this.disableSubmit = true;
      event.preventDefault();
      this.$store
        .dispatch("register_user", {
          email: this.email,
          password: this.password,
          user_name: this.user_name,
          router: this.$router
        })
        .finally(() => {
          this.disableSubmit = false;
        });
    },
  },
  computed: {
    validation() {
      return this.password.length > 5;
    },
  },
  components: {
    myNavbar,
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


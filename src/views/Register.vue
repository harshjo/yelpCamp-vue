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
import firebase from "firebase";
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
      event.preventDefault();
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then((result) => {
          result.user
            .updateProfile({ displayName: this.user_name })
            .then(() => {
              let user = firebase.auth().currentUser;
              console.log(user)
              this.$store.commit('SET_USER', user)
              this.store.commit('SET_USER_PRESENT')
              console.log(this.$store.state.user.displayName)
            })
            .catch(() => {});
          // Signed in
          // var user = firebase.auth().currentUser;
          // user
          //   .updateProfile({
          //     displayName: this.user_name,
          //   })
          //   .then(function () {
          //     console.log("in updateProfile");
          //     var user = firebase.auth().currentUser;
          //     console.log(user)
          //     this.$store.commit("SET_USER", user);
          //     console.log("User Regestered!", this.$store.user);
          //     this.$router.push("/campgrounds");
          //   })
          //   .catch(function (error) {
          //     console.log(error);
          //   });
          alert("Signed In!");
          this.$router.push("/campgrounds");
        })
        .catch((error) => {
          alert(error);
          console.log(error);
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


<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="dark" fixed="top">
      <b-navbar-brand to="/campgrounds">YelpCamp</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="ml-auto">
          <b-nav-item
            to="/login"
            :active="isLoginPage"
            v-if="!this.$store.state.user_present"
            >Login</b-nav-item
          >
          <b-nav-item v-else
            >Signed in as {{ this.$store.state.user.displayName }}</b-nav-item
          >
          <b-nav-item
            to="/register"
            :active="isRegisterPage"
            v-if="!this.$store.state.user_present"
            >Signup</b-nav-item
          >
          <b-nav-item v-else @click="logOut">Sign out</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import firebase from "firebase";
export default {
  name: "myNavbar",
  props: {
    isLoginPage: Boolean,
    isRegisterPage: Boolean,
  },
  methods: {
    logOut() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$store.commit("SET_USER", {});
					this.$store.commit("SET_USER_PRESENT");
					alert('Successfully logged out!')
          this.$router.push("/campgrounds");
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
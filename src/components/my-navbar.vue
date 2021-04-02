<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="dark" :sticky=true>
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
    <b-alert
			v-if="this.$store.state.alert_logged_in"
      :show="3"
      class="my-alert-top"
			fade
      dismissible
      variant="success"
      @dismissed="dismissed_logged_in"
    >
      <p>Logged In!</p>
    </b-alert>
		<b-alert
			v-if="this.$store.state.alert_logged_out"
      :show="3"
      class="my-alert-top"
			fade
      dismissible
      variant="warning"
      @dismissed="dismissed_logged_out"
    >
      <p>Logged Out!</p>
    </b-alert>
		<b-alert
			v-if="this.$store.state.alert_campground_added"
      :show="3"
      class="my-alert-top"
			fade
      dismissible
      variant="success"
      @dismissed="dismissed_campground_added"
    >
      <p>Campground Added!</p>
    </b-alert>
		<b-alert
			v-if="this.$store.state.alert_campground_deleted"
      :show="3"
      class="my-alert-top"
			fade
      dismissible
      variant="danger"
      @dismissed="dismissed_campground_deleted"
    >
      <p>Campground Deleted!</p>
    </b-alert>
		<b-alert
			v-if="this.$store.state.alert_campground_edited"
      :show="3"
      class="my-alert-top"
			fade
      dismissible
      variant="warning"
      @dismissed="dismissed_campground_edited"
    >
      <p>Campground Edited!</p>
    </b-alert>
		<b-alert
			v-if="this.$store.state.alert_login_prompt"
      :show="3"
      class="my-alert-top"
			fade
      dismissible
      variant="warning"
      @dismissed="dismissed_login_prompt"
    >
      <p>You need to log in to do that!</p>
    </b-alert>
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
					this.$store.commit("TOGGLE_LOGGED_OUT");
          this.$router.push("/campgrounds");
        })
        .catch((error) => {
          console.log(error);
        });
		},
		dismissed_logged_in() {
			this.$store.commit('TOGGLE_LOGGED_IN')
		},
		dismissed_logged_out() {
			this.$store.commit('TOGGLE_LOGGED_OUT')
		},
		dismissed_campground_added() {
			this.$store.commit('TOGGLE_CAMPGROUND_ADDED')
		},
		dismissed_campground_deleted() {
			this.$store.commit('TOGGLE_CAMPGROUND_DELETED')
		},
		dismissed_campground_edited() {
			this.$store.commit('TOGGLE_CAMPGROUND_EDITED')
		},
		dismissed_login_prompt() {
			this.$store.commit('TOGGLE_LOGIN_PROMPT')
		}
  },
};
</script>


<style scoped>
.my-alert-top {
  text-align: center;
	height: 50px;
}
</style>
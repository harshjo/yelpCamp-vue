<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="dark" fixed="top">
      
			<b-navbar-brand to="/campgrounds">YelpCamp</b-navbar-brand>
			
			<b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

			<b-collapse id="nav-collapse" is-nav>
				<b-navbar-nav class="ml-auto">
					<b-nav-item to="/login" :active="isLoginPage">Login</b-nav-item>
					<b-nav-item to="/register" :active="isRegisterPage">Signup</b-nav-item>
				</b-navbar-nav>
			</b-collapse>

    </b-navbar>
  </div>
</template>

<script>
export default {
	name: "myNavbar",
	props: {
		isLoginPage: Boolean,
		isRegisterPage: Boolean
	}
};
</script>
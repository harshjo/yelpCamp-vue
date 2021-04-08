<template>
  <div class="home">
    <h2 id="heading">Welcome to yelpCamp!</h2>
    <b-button variant="success" to="campgrounds" class="mainButton"
      >Show all Campgrounds</b-button
    >
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "Home",
  components: {},
};
</script>


<style scoped>
.home {
  z-index: 1;
  position: relative;
  text-align: center;
  padding-top: 40vh;
}
#heading {
  text-align: center;
}
</style>
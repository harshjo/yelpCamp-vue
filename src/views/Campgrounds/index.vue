<template>
  <div class="about">
    <myNavbar />
    <b-container id="main-content">
      <div>
        <b-jumbotron
          header="Welcome to YelpCamp!"
          lead="View campgrounds from all over the World!"
        >
          <b-button
            variant="primary"
            :to="{ name: 'AddCampground' }"
            @click="isLogged"
            >Add new Campground</b-button
          >
        </b-jumbotron>
      </div>

      <b-row align-h="start" cols-lg="3" cols-md="2" no-gutters>
        <div v-for="campground in campgrounds" :key="campground.id">
          <b-col>
            <myCard :campground="campground" />
          </b-col>
        </div>
      </b-row>
    </b-container>
  </div>
</template>


<script>
import myNavbar from "../../components/my-navbar";
import myCard from "../../components/my-card";
// import store from "../store";
export default {
  created() {
    console.log(this)
    this.$store.dispatch('get_all_campgrounds')
    console.log(this.h)
  },
  data() {
    return {
    };
  },
  computed: {
    campgrounds() {return this.$store.state.campgrounds}
  },
  components: {
    myNavbar,
    myCard,
  },
  methods: {
    isLogged(){
      if(!this.$store.state.user_present){
        this.$store.commit('TOGGLE_LOGIN_PROMPT')
      }
    }
  }
};
</script>


<style scoped>
#main-content {
  margin-top: 25px;
}
.custom-card {
  margin-bottom: 30px !important;
  max-width: 30rem;
}
</style>
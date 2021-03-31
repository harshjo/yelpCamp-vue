<template>
  <div class="about">
    <myNavbar />
    <b-container id="main-content">
      <div>
        <b-jumbotron
          header="Welcome to YelpCamp!"
          lead="View campgrounds from all over the World!"
        >
          <b-button variant="primary">Add new Campground</b-button>
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
    this.$db
      .collection("campgrounds")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          var temp_obj = doc.data();
          temp_obj.id = doc.id;
          this.campgrounds.push(temp_obj);
        });
        console.log(this.campgrounds);
      })
      .catch((error) => {
        console.log(error);
      });
  },
  data() {
    return {
      campgrounds: [],
    };
  },
  components: {
    myNavbar,
    myCard,
  },
};
</script>


<style scoped>
#main-content {
  margin-top: 90px;
}
.custom-card {
  margin-bottom: 30px !important;
  max-width: 30rem;
}
</style>
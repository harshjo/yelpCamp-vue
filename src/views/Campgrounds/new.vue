<template>
  <div>
    <myNavbar />
    <div class="content">
      <b-container>
        <b-card header="Add new Campground" style="max-width: 100%">
          <b-form @submit="onSubmit">
            <div class="my-3">
              <p class="mb-0">Name</p>
              <b-form-input
                type="text"
                placeholder="Enter campground name"
                v-model="campground.name"
                required
              ></b-form-input>
            </div>
            <div class="my-3">
              <p class="mb-0">Image</p>
              <b-form-input
                type="url"
                placeholder="Image URL"
                v-model="campground.image"
                required
              ></b-form-input>
            </div>
            <div class="my-3">
              <p class="mb-0">Cost</p>
              <b-form-input
                type="number"
                placeholder="Campground cost per night"
                v-model="campground.price"
                step="any"
                required
              ></b-form-input>
            </div>
            <div class="my-3">
              <p class="mb-0">Address</p>
              <b-form-textarea
                placeholder="Campground address"
                v-model="campground.address"
                required
              ></b-form-textarea>
            </div>
            <div class="my-3">
              <p class="mb-0">Description</p>
              <b-form-textarea
                placeholder="Campground description"
                v-model="campground.description"
                required
              ></b-form-textarea>
            </div>
            <b-button type="submit" variant="primary" :disabled="disableSubmit"
              >Submit</b-button
            >
            <b-button type="reset" variant="danger" class="ml-3"
              >Reset</b-button
            >
          </b-form>
        </b-card>
      </b-container>
    </div>
  </div>
</template>


<script>
import myNavbar from "../../components/my-navbar";
import firebase from "firebase";
export default {
  components: {
    myNavbar,
  },
  beforeRouteEnter(to, from, next) {
    console.log(to, from);
    var user = firebase.auth().currentUser;
    // console.log(user)
    if (user) {
      next()
    } else {
      next('/login')
    }
  },
  data() {
    return {
      campground: {
        name: "",
        image: "",
        price: null,
        address: "",
        description: "",
        author_id: this.$store.state.user.uid,
        author_name: this.$store.state.user.displayName,
      },
      disableSubmit: false,
    };
  },
  methods: {
    onSubmit(event) {
      event.preventDefault();
      this.disableSubmit = true;
      // console.log("IN here", this.$store.state.user.uid, this.$store.state.user.displayName);
      this.$db
        .collection("campgrounds")
        .add(this.campground)
        .then(() => {
          this.$store.commit('TOGGLE_CAMPGROUND_ADDED')
          this.$router.push("/campgrounds");
        })
        .catch((error) => {
          alert("Error");
          console.log(error);
        })
        .finally(() => {
          this.disableSubmit = false;
        });
    },
  },
};
</script>

<style scoped>
.content {
  margin-top: 20px;
  margin-bottom: 20px;
}
#heading {
  text-align: center;
}
</style>
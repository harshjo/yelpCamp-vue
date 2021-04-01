<template>
  <div>
    <myNavbar />
    <div class="content">
      <b-container>
        <b-card header="Add new Campground" style="max-width: 100%">
          <b-form @submit="onSubmit">
            <b-form-input
              class="my-3"
              type="text"
              placeholder="Enter campground name"
              v-model="campground.name"
              required
            ></b-form-input>
            <b-form-input
              class="my-3"
              type="url"
              placeholder="Image URL"
              v-model="campground.image"
              required
            ></b-form-input>
            <b-form-input
              class="my-3"
              type="number"
              placeholder="Campground cost per night"
              v-model="campground.price"
              required
            ></b-form-input>
            <b-form-textarea
              class="my-3"
              placeholder="Campground address"
              v-model="campground.address"
              required
            ></b-form-textarea>
            <b-form-textarea
              class="my-3"
              placeholder="Campground description"
              v-model="campground.description"
              required
            ></b-form-textarea>
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
export default {
  components: {
    myNavbar,
  },
  data() {
    return {
      campground: {
        name: "",
        image: "",
        price: 0,
        address: "",
        description: "",
      },
      disableSubmit: false,
    };
  },
  methods: {
    onSubmit(event) {
      event.preventDefault();
      this.disableSubmit = true;
      console.log("IN here");
      this.$db
        .collection("campgrounds")
        .add(this.campground)
        .then((docRef) => {
          alert(`Campground added Successfully, id = ${docRef}`);
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
  margin-top: 90px;
}
#heading {
  text-align: center;
}
</style>
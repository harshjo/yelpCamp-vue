<template>
  <div>
    <myNavbar />
    <div class="content">
      <b-container>
        <b-card header="Edit Campground" style="max-width: 100%">
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
export default {
  components: {
    myNavbar,
  },
  props: {
    campground: Object,
  },
  data() {
    return {
      disableSubmit: false,
    };
  },
  created(){
    if(typeof this.campground == "undefined"){
      this.$router.push('/campgrounds')
    }
  },
  methods: {
    onSubmit(event) {
      event.preventDefault();
      this.disableSubmit = true;
      this.$db
        .collection("campgrounds")
        .doc(this.$route.params.id)
        .update(this.campground)
        .then(() => {
          alert("Updated Successfully");
          this.$router.push(`/campgrounds/${this.$route.params.id}`)
        })
        .catch((error) => {
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
  margin-bottom: 20px;
}
</style>
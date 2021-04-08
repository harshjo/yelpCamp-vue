<template>
  <div>
    <myNavbar />
    <div class="content">
      <b-container>
        <b-card header="Add new Comment" style="max-width: 100%">
          <b-form @submit="onSubmit">
            <div class="my-3">
              <p class="mb-0">Comment</p>
              <b-form-input
                type="text"
                placeholder="Enter your comment"
                v-model.trim="comment.data"
                required
              ></b-form-input>
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
      next();
    } else {
      next("/login");
    }
  },
  data() {
    return {
      comment: {
        author_name: this.$store.state.user.displayName,
        author_id: this.$store.state.user.uid,
        data: "",
        campground_id: this.$route.params.id,
      },
      disableSubmit: false,
    };
  },
  methods: {
    onSubmit(event) {
      event.preventDefault();
      this.disableSubmit = true;
      this.$store
        .dispatch("add_new_comment", {
          comment: this.comment,
          router: this.$router,
          campground_id: this.$route.params.id,
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
  margin-top: 80px;
  margin-bottom: 20px;
}
</style>
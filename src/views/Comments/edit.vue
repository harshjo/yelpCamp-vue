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
                v-model="comment.data"
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
export default {
  props: {
    comment: Object,
  },
  components: {
    myNavbar,
  },
  created() {
    if (typeof this.comment == "undefined") {
      this.$router.push("/campgrounds");
    }
  },
  data() {
    return {
      disableSubmit: false,
    };
  },
  methods: {
    onSubmit(event) {
      event.preventDefault();
      this.disableSubmit = true;
      this.$db
        .collection("comments")
        .doc(this.comment.comment_id)
        .update({ data: this.comment.data })
        .then(() => {
          this.$store.commit("TOGGLE_COMMENT_EDITED");
          this.$router.push(`/campgrounds/${this.$route.params.id}`);
        })
        .catch((error) => {
          alert("Something went wrong!");
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
  margin-top: 80px;
  margin-bottom: 20px;
}
</style>
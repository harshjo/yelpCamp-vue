<template>
  <div>
    <myNavbar />
    <div class="content">
      <b-container>
        <b-card header="Edit Comment" style="max-width: 100%">
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
      this.$store
        .dispatch("edit_comment", {
          comment_id: this.comment.comment_id,
          data: this.comment.data,
          campground_id: this.$route.params.id,
          router: this.$router
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
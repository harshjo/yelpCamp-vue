<template>
  <div class="mb-3">
    <b-card no-body style="max-width: 100%">
      <template #header>
        <h4 class="mb-2">Comments</h4>
        <b-button
          :to="{ name: 'newComment' }"
          @click="isLogged"
          variant="primary"
        >
          Add Comment</b-button
        >
      </template>

      <b-card-body v-for="comment in comments" :key="comment.comment_id">
        <b-card-sub-title class="mb-2"
          >{{ comment.author_name }} says</b-card-sub-title
        >
        <b-card-text>
          {{ comment.data }}
        </b-card-text>
        <b-button
          class="mr-3"
          v-if="
            $store.state.user_present &&
            $store.state.user.uid == comment.author_id
          "
          :to="{ name: 'editComment', params: { comment: comment } }"
          size="sm"
          variant="warning"
          >Edit</b-button
        >
        <b-button
          v-if="
            $store.state.user_present &&
            $store.state.user.uid == comment.author_id
          "
          v-b-modal="`modal-${comment.comment_id}`"
          size="sm"
          variant="danger"
          >Delete</b-button
        >
        <b-modal
          :id="`modal-${comment.comment_id}`"
          centered
          title="Confirm"
          header-bg-variant="danger"
          header-text-variant="light"
          ok-variant="danger"
          @ok="deleteComment(comment.comment_id)"
        >
          <p class="my-4">Are you sure you want to delete this comment?</p>
        </b-modal>
      </b-card-body>
    </b-card>
  </div>
</template>


<script>
export default {
  name: "myComments",
  data() {
    return {};
  },
  computed: {
    comments() {
      return this.$store.state.comments;
    },
  },
  created() {
    // console.log(this.campground_id, '   ', this.$route.params.id)
    this.$store.dispatch("get_comments", {
      current_campground_id: this.$route.params.id,
    });
  },
  methods: {
    isLogged() {
      if (!this.$store.state.user_present) {
        this.$store.commit("TOGGLE_LOGIN_PROMPT");
      }
    },
    deleteComment(comment_id) {
      this.$emit("commentDeleted");
      this.$store.dispatch("delete_comment", {
        comment_id: comment_id,
        campground_id: this.$route.params.id,
        router: this.$router
      });
    },
  },
};
</script>


<style scoped>
</style>
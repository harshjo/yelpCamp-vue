<template>
  <div class="mb-3"> 
    <b-card no-body style="max-width: 100%">
      <template #header>
        <h4 class="mb-2">Comments</h4>
        <b-button :to="{ name: 'newComment' }" @click="isLogged" variant="primary">
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
          v-if="$store.state.user.uid == comment.author_id"
          :to="{ name: 'editComment', params: { comment: comment } }"
          size="sm"
          variant="warning"
          >Edit</b-button
        >
        <b-button
          v-if="$store.state.user.uid == comment.author_id"
          size="sm"
          variant="danger"
          >Delete</b-button
        >
      </b-card-body>
    </b-card>
  </div>
</template>


<script>
export default {
  name: "myComments",
  data() {
    return {
      comments: [],
    };
  },
  created() {
    // console.log(this.campground_id, '   ', this.$route.params.id)
    this.$db
      .collection("comments")
      .get()
      .then((querySnapshot) => {
        console.log("In here");
        querySnapshot.forEach((doc) => {
          if (doc.data().campground_id == this.$route.params.id) {
            console.log("IN here");
            this.comments.push(doc.data());
          }
        });
      })
      .catch((err) => {
        console.log(err);
      });
  },
  methods: {
    isLogged() {
      if (!this.$store.state.user_present) {
        this.$store.commit("TOGGLE_LOGIN_PROMPT");
      }
    },
  },
};
</script>


<style scoped>
</style>
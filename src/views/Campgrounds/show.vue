<template>
  <div>
    <myNavbar />
    <b-container class="content" v-if="fetched">
      <b-row cols-lg="2" cols-sm="1" cols-md="1">
        <b-col lg="9">
          <div>
            <b-card
              :title="campground.name"
              :img-src="campground.image"
              img-alt="Image"
              img-top
              img-height="500px"
              tag="article"
              style="max-width: 100%"
              class="mb-2"
            >
              <b-card-text>
                {{ campground.description }}
              </b-card-text>
              <b-card-text>
                Submitted by {{ campground.author_name }}
              </b-card-text>
              <b-button
                v-if="
                  this.$store.state.user_present &&
                  this.$store.state.user.uid == campground.author_id
                "
                :to="{ name: 'editCampground', params: { campground } }"
                variant="warning"
                class="mr-3"
                >Edit</b-button
              >
              <b-button
                v-if="
                  this.$store.state.user_present &&
                  this.$store.state.user.uid == campground.author_id
                "
                v-b-modal.modal-delete
                variant="danger"
                >Delete</b-button
              >
              <b-modal
                id="modal-delete"
                centered
                title="Confirm"
                header-bg-variant="danger"
                header-text-variant="light"
                ok-variant="danger"
                @ok="deleteCampground"
              >
                <p class="my-4">
                  Are you sure you want to delete this campground?
                </p>
              </b-modal>
            </b-card>
          </div>
        </b-col>
        <b-col sm="1" lg="3" class="mb-2">
          <div>
            <b-card no-body style="max-width: 100%">
              <b-card-body>
                <b-card-title>Address</b-card-title>
                <b-card-text>
                  {{ campground.address }}
                </b-card-text>
              </b-card-body>

              <b-list-group flush>
                <b-list-group-item
                  >Cost: $
                  {{ String(campground.price) }}/night</b-list-group-item
                >
              </b-list-group>

              <b-card-body>
                <b-button to="/campgrounds" class="card-link"
                  >Back to all campgrounds</b-button
                >
              </b-card-body>
            </b-card>
          </div>
        </b-col>
      </b-row>

      <!-- Comments Section -->
      <myComments :key="reRender" @commentDeleted="reRender++" />
    </b-container>
  </div>
</template>


<script>
import myNavbar from "../../components/my-navbar";
import myComments from "../../components/my-comments";
export default {
  data() {
    return {
      reRender: 0,
      fetched: false,
      comment_details: {
        campground_id: "",
        author_id: "",
        comment: "",
        author_name: "",
      },
    };
  },
  created() {
    this.$store
      .dispatch("get_selected_campground", {
        campground_id: this.$route.params.id,
      })
      .then(() => {
        this.fetched = true;
      })
      .catch((err) => {
        console.log(err);
        this.$router.push("/campgrounds");
      });
  },
  components: {
    myNavbar,
    myComments,
  },
  methods: {
    deleteCampground() {
      this.$store.dispatch("delete_campground", {
        campground_id: this.$route.params.id,
        router: this.$router,
      });
    },
  },
  computed: {
    campground() {
      return this.$store.state.selected_campground;
    },
    placeholder() {
      if (this.$store.state.user_present) {
        return "Enter your comment";
      } else return "Login to comment";
    },
  },
};
</script>

<style scoped>
.content {
  margin-top: 30px;
}
.address-card {
  margin-bottom: 20px;
}
</style>



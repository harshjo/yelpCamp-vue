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
                @click="deleteCampground"
                variant="danger"
                >Delete</b-button
              >
            </b-card>
          </div>
        </b-col>
        <b-col sm="1" lg="3">
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
                <a to="/campgrounds" class="card-link">Go to all campgrounds</a>
              </b-card-body>
            </b-card>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>


<script>
import myNavbar from "../../components/my-navbar";
export default {
  data() {
    return {
      campground: {},
      fetched: false,
    };
  },
  created() {
    this.$db
      .collection("campgrounds")
      .doc(this.$route.params.id)
      .get()
      .then((snapshot) => {
        if (!snapshot.exists) {
          this.$router.push("/campgrounds");
        }
        this.fetched = true;
        this.campground = snapshot.data();
        console.log(this.campground);
        // if(typeof this.campground == undefined){
        //   this.$router.push('/campgrounds')
        // }
      })
      .catch(() => {
        // console.log(err);
        this.$router.push("/campgrounds");
      });
  },
  components: {
    myNavbar,
  },
  methods: {
    deleteCampground() {
      this.$db
        .collection("campgrounds")
        .doc(this.$route.params.id)
        .delete()
        .then(() => {
          alert("Deleted Successfully");
          this.$router.push("/campgrounds");
        })
        .catch((error) => {
          console.log(error);
        });
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



<template>
  <div>
    <myNavbar />
    <b-container class="content">
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
            </b-card>
          </div>
        </b-col>
        <b-col sm="1" lg="3">
          <div>
            <b-card
              no-body
              style="max-width: 100%"
            >
              <b-card-body>
                <b-card-title>Address</b-card-title>
                <b-card-text>
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </b-card-text>
              </b-card-body>

              <b-list-group flush>
                <b-list-group-item>Cost: $ {{ String(campground.price) }}/night</b-list-group-item>
              </b-list-group>

              <b-card-body>
                <a href="#" class="card-link">Go to all campgrounds</a>
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
    };
  },
  created() {
    this.$db
      .collection("campgrounds")
      .doc(this.$route.params.id)
      .get()
      .then((snapshot) => {
        this.campground = snapshot.data();
        console.log(this.campground)
      })
      .catch((err) => {
        console.log(err);
      });
  },
  components: {
    myNavbar,
  },
};
</script>

<style scoped>
.content {
  margin-top: 90px;
}
.address-card {
  margin-bottom: 20px;
}
</style>



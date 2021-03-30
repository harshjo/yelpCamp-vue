<template>
  <div class="container">
    <b-card
			border-variant="light"
			bg-variant="light"
      :title=campground.name
      :img-src=campground.image
      img-alt="Image"
      img-top
      tag="article"
			img-height="250px"
      style="max-width: 21rem"
      class="mb-2 customs"
    >
      <b-button href="#" variant="info">More Info...</b-button>
    </b-card>
  </div>
</template>


<script>
export default {
	name: "myCard",
	props: {
		campground: Object
	}
};
</script>


<style scoped>
.container {
	text-align: center;
	margin-bottom: 20px;
}
.customs{
	background: #EAE9E9 !important;
}
</style>
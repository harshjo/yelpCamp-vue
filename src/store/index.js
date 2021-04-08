import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase'
import 'firebase/firestore'
import { firebaseConfig } from '../firebase/firebaseConfig'
Vue.use(Vuex)
// firebase initialization
firebase.initializeApp(firebaseConfig)
const db = firebase.firestore()



export default new Vuex.Store({
	state: {
		campgrounds: {},
		selected_campground: {},
		comments: [],
		user: {},
		user_present: false,
		alert_logged_in: false,
		alert_logged_out: false,
		alert_campground_added: false,
		alert_campground_deleted: false,
		alert_campground_edited: false,
		alert_comment_added: false,
		alert_comment_deleted: false,
		alert_comment_edited: false,
		alert_login_prompt: false,
	},
	mutations: {
		SET_CAMPGROUNDS(state, campgrounds) {
			state.campgrounds = campgrounds
		},
		SET_SELECTED_CAMPGROUND(state, campground) {
			state.selected_campground = campground
		},
		SET_COMMENTS(state, comments) {
			state.comments = comments
		},
		SET_USER(state, user) {
			state.user = user
		},
		SET_USER_PRESENT(state) {
			state.user_present = !state.user_present
		},
		TOGGLE_LOGGED_IN(state) {
			state.alert_logged_in = !state.alert_logged_in
		},
		TOGGLE_LOGGED_OUT(state) {
			state.alert_logged_out = !state.alert_logged_out
		},
		TOGGLE_CAMPGROUND_ADDED(state) {
			state.alert_campground_added = !state.alert_campground_added
		},
		TOGGLE_CAMPGROUND_DELETED(state) {
			state.alert_campground_deleted = !state.alert_campground_deleted
		},
		TOGGLE_CAMPGROUND_EDITED(state) {
			state.alert_campground_edited = !state.alert_campground_edited
		},
		TOGGLE_COMMENT_ADDED(state) {
			state.alert_comment_added = !state.alert_comment_added
		},
		TOGGLE_COMMENT_EDITED(state) {
			state.alert_comment_edited = !state.alert_comment_edited
		},
		TOGGLE_COMMENT_DELETED(state) {
			state.alert_comment_deleted = !state.alert_comment_deleted
		},
		TOGGLE_LOGIN_PROMPT(state) {
			state.alert_login_prompt = !state.alert_login_prompt
		}
	},
	actions: {
		get_all_campgrounds(context) {
			var campgrounds = []
			db
				.collection("campgrounds")
				.get()
				.then((querySnapshot) => {
					querySnapshot.forEach((doc) => {
						var temp_obj = doc.data();
						temp_obj.id = doc.id;
						campgrounds.push(temp_obj);
						context.commit('SET_CAMPGROUNDS', campgrounds)
					});
				})
				.catch((error) => {
					console.log(error);
				});
		},
		get_selected_campground(context, { campground_id }) {
			db
				.collection("campgrounds")
				.doc(campground_id)
				.get()
				.then((snapshot) => {
					context.commit('SET_SELECTED_CAMPGROUND', snapshot.data())
				})
		},
		register_user(context, { email, password, user_name, router }) {
			firebase
				.auth()
				.setPersistence(firebase.auth.Auth.Persistence.SESSION)
				.then(() => {
					firebase
						.auth()
						.createUserWithEmailAndPassword(email, password)
						.then((result) => {
							result.user
								.updateProfile({ displayName: user_name })
								.then(() => {
									let user = firebase.auth().currentUser;
									// console.log(user)
									context.commit("SET_USER", user);
									context.commit("SET_USER_PRESENT");
									context.commit("TOGGLE_LOGGED_IN");
									router.push("/campgrounds");
									// console.log(this.$store.state.user.displayName)
								})
								.catch((err) => {
									alert("error");
									console.log(err);
								})
						})
				})
		},
		login_user(context, { email, password, router }) {
			firebase
				.auth()
				.setPersistence(firebase.auth.Auth.Persistence.SESSION)
				.then(() => {
					firebase
						.auth()
						.signInWithEmailAndPassword(email, password)
						.then((userCredential) => {
							context.commit("SET_USER", userCredential.user);
							context.commit("SET_USER_PRESENT");
							context.commit("TOGGLE_LOGGED_IN");
							router.push("/campgrounds");
						})
						.catch((err) => {
							alert("error");
							console.log(err);
						})
				})
		},
		logout_user(context, router) {
			firebase
				.auth()
				.signOut()
				.then(() => {
					context.commit("SET_USER", {});
					context.commit("SET_USER_PRESENT");
					context.commit("TOGGLE_LOGGED_OUT");
					router.push("/campgrounds");
				})
				.catch((err) => {
					console.log(err);
					alert("error");
				});
		},
		add_new_campground(context, { campground, router }) {
			db
				.collection("campgrounds")
				.add(campground)
				.then(() => {
					context.commit('TOGGLE_CAMPGROUND_ADDED')
					router.push("/campgrounds");
				})
				.catch((error) => {
					alert("Error");
					console.log(error);
				})
		},
		edit_campground(context, { campground_id, campground, router }) {
			db
				.collection("campgrounds")
				.doc(campground_id)
				.update(campground)
				.then(() => {
					context.commit('TOGGLE_CAMPGROUND_EDITED');
					router.push(`/campgrounds/${campground_id}`)
				})
				.catch((err) => { console.log(err); alert('Error') })
		},
		delete_campground(context, { campground_id, router }) {
			db
				.collection("campgrounds")
				.doc(campground_id)
				.delete()
				.then(() => {
					context.commit("TOGGLE_CAMPGROUND_DELETED");
					router.push("/campgrounds");
				})
				.catch((error) => {
					console.log(error);
				});
		},
		get_comments(context, { current_campground_id, }) {
			var comments = []
			db
				.collection("comments")
				.get()
				.then((querySnapshot) => {
					querySnapshot.forEach((doc) => {
						if (doc.data().campground_id == current_campground_id) {
							comments.push(doc.data());
						}
					});
					context.commit('SET_COMMENTS', comments)
				})
				.catch((err) => {
					console.log(err);
				});
		},
		add_new_comment(context, { comment, router, campground_id }) {
			db
				.collection("comments")
				.add(comment)
				.then((docRef) => {
					docRef.update({
						comment_id: docRef.id
					})
					context.commit('TOGGLE_COMMENT_ADDED')
					router.push(`/campgrounds/${campground_id}`)
				})
				.catch((error) => {
					alert("Something went wrong");
					console.log(error);
				})
		},
		edit_comment(context, { comment_id, data, campground_id, router }) {
			db
				.collection("comments")
				.doc(comment_id)
				.update({ data: data })
				.then(() => {
					context.commit("TOGGLE_COMMENT_EDITED");
					router.push(`/campgrounds/${campground_id}`);
				})
				.catch((error) => {
					alert("Something went wrong!");
					console.log(error);
				})
		},
		delete_comment(context, {comment_id, campground_id, router}){
			db
        .collection("comments")
        .doc(comment_id)
        .delete()
        .then(() => {
          context.commit("TOGGLE_COMMENT_DELETED");
          router.push(`/campgrounds/${campground_id}`).catch(()=>{});
        })
        .catch((error) => {
          console.log(error);
        });
		},
	},
	modules: {
	}
})

// {
      //   id: "cmp1",
      //   name: "Foggy Mountains",
      //   image:
      //     "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=840&q=80",
      //   description:
      //     "I'm baby incididunt chambray next level dolore, offal non craft beer meditation consectetur brooklyn ut yuccie yr. Exercitation vegan dolore ramps intelligentsia scenester, 3 wolf moon roof party adaptogen fanny pack deep v fashion axe selvage. Banh mi microdosing cold-pressed synth bushwick asymmetrical fam etsy drinking vinegar ethical tousled street art. Enim occaecat ennui sunt DIY four loko copper mug leggings ut franzen dolore tofu church-key lo-fi bespoke. Consequat velit quinoa pok pok fanny pack sriracha hot chicken fam prism banjo. Palo santo meggings letterpress readymade, live-edge ut duis nisi schlitz iPhone umami exercitation sustainable culpa.",
      // },
      // {
      //   id: "cmp2",
      //   name: "Woodland Path",
      //   image:
      //     "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=751&q=80",
      //   description:
      //     "I'm baby incididunt chambray next level dolore, offal non craft beer meditation consectetur brooklyn ut yuccie yr. Exercitation vegan dolore ramps intelligentsia scenester, 3 wolf moon roof party adaptogen fanny pack deep v fashion axe selvage. Banh mi microdosing cold-pressed synth bushwick asymmetrical fam etsy drinking vinegar ethical tousled street art. Enim occaecat ennui sunt DIY four loko copper mug leggings ut franzen dolore tofu church-key lo-fi bespoke. Consequat velit quinoa pok pok fanny pack sriracha hot chicken fam prism banjo. Palo santo meggings letterpress readymade, live-edge ut duis nisi schlitz iPhone umami exercitation sustainable culpa.",
      // },
      // {
      //   id: "cmp3",
      //   name: "Emerald Bay",
      //   image:
      //     "https://images.unsplash.com/photo-1552083375-1447ce886485?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80",
      //   description:
      //     "I'm baby incididunt chambray next level dolore, offal non craft beer meditation consectetur brooklyn ut yuccie yr. Exercitation vegan dolore ramps intelligentsia scenester, 3 wolf moon roof party adaptogen fanny pack deep v fashion axe selvage. Banh mi microdosing cold-pressed synth bushwick asymmetrical fam etsy drinking vinegar ethical tousled street art. Enim occaecat ennui sunt DIY four loko copper mug leggings ut franzen dolore tofu church-key lo-fi bespoke. Consequat velit quinoa pok pok fanny pack sriracha hot chicken fam prism banjo. Palo santo meggings letterpress readymade, live-edge ut duis nisi schlitz iPhone umami exercitation sustainable culpa.",
      // },
      // {
      //   id: "cmp4",
      //   name: "Yosemite Park",
      //   image:
      //     "https://images.unsplash.com/photo-1426604966848-d7adac402bff?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80",
      //   description:
      //     "I'm baby incididunt chambray next level dolore, offal non craft beer meditation consectetur brooklyn ut yuccie yr. Exercitation vegan dolore ramps intelligentsia scenester, 3 wolf moon roof party adaptogen fanny pack deep v fashion axe selvage. Banh mi microdosing cold-pressed synth bushwick asymmetrical fam etsy drinking vinegar ethical tousled street art. Enim occaecat ennui sunt DIY four loko copper mug leggings ut franzen dolore tofu church-key lo-fi bespoke. Consequat velit quinoa pok pok fanny pack sriracha hot chicken fam prism banjo. Palo santo meggings letterpress readymade, live-edge ut duis nisi schlitz iPhone umami exercitation sustainable culpa.",
      // },
      // {
      //   id: "cmp5",
      //   name: "Frozen Mountain",
      //   image:
      //     "https://images.unsplash.com/photo-1418985991508-e47386d96a71?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80",
      //   description:
      //     "I'm baby incididunt chambray next level dolore, offal non craft beer meditation consectetur brooklyn ut yuccie yr. Exercitation vegan dolore ramps intelligentsia scenester, 3 wolf moon roof party adaptogen fanny pack deep v fashion axe selvage. Banh mi microdosing cold-pressed synth bushwick asymmetrical fam etsy drinking vinegar ethical tousled street art. Enim occaecat ennui sunt DIY four loko copper mug leggings ut franzen dolore tofu church-key lo-fi bespoke. Consequat velit quinoa pok pok fanny pack sriracha hot chicken fam prism banjo. Palo santo meggings letterpress readymade, live-edge ut duis nisi schlitz iPhone umami exercitation sustainable culpa.",
      // },

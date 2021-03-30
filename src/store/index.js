import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    campgrounds: [
      {
        id: "cmp1",
        name: "Foggy Mountains",
        image:
          "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=840&q=80",
        description:
          "I'm baby incididunt chambray next level dolore, offal non craft beer meditation consectetur brooklyn ut yuccie yr. Exercitation vegan dolore ramps intelligentsia scenester, 3 wolf moon roof party adaptogen fanny pack deep v fashion axe selvage. Banh mi microdosing cold-pressed synth bushwick asymmetrical fam etsy drinking vinegar ethical tousled street art. Enim occaecat ennui sunt DIY four loko copper mug leggings ut franzen dolore tofu church-key lo-fi bespoke. Consequat velit quinoa pok pok fanny pack sriracha hot chicken fam prism banjo. Palo santo meggings letterpress readymade, live-edge ut duis nisi schlitz iPhone umami exercitation sustainable culpa.",
      },
      {
        id: "cmp2",
        name: "Woodland Path",
        image:
          "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=751&q=80",
        description:
          "I'm baby incididunt chambray next level dolore, offal non craft beer meditation consectetur brooklyn ut yuccie yr. Exercitation vegan dolore ramps intelligentsia scenester, 3 wolf moon roof party adaptogen fanny pack deep v fashion axe selvage. Banh mi microdosing cold-pressed synth bushwick asymmetrical fam etsy drinking vinegar ethical tousled street art. Enim occaecat ennui sunt DIY four loko copper mug leggings ut franzen dolore tofu church-key lo-fi bespoke. Consequat velit quinoa pok pok fanny pack sriracha hot chicken fam prism banjo. Palo santo meggings letterpress readymade, live-edge ut duis nisi schlitz iPhone umami exercitation sustainable culpa.",
      },
      {
        id: "cmp3",
        name: "Emerald Bay",
        image:
          "https://images.unsplash.com/photo-1552083375-1447ce886485?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80",
        description:
          "I'm baby incididunt chambray next level dolore, offal non craft beer meditation consectetur brooklyn ut yuccie yr. Exercitation vegan dolore ramps intelligentsia scenester, 3 wolf moon roof party adaptogen fanny pack deep v fashion axe selvage. Banh mi microdosing cold-pressed synth bushwick asymmetrical fam etsy drinking vinegar ethical tousled street art. Enim occaecat ennui sunt DIY four loko copper mug leggings ut franzen dolore tofu church-key lo-fi bespoke. Consequat velit quinoa pok pok fanny pack sriracha hot chicken fam prism banjo. Palo santo meggings letterpress readymade, live-edge ut duis nisi schlitz iPhone umami exercitation sustainable culpa.",
      },
      {
        id: "cmp4",
        name: "Yosemite Park",
        image:
          "https://images.unsplash.com/photo-1426604966848-d7adac402bff?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80",
        description:
          "I'm baby incididunt chambray next level dolore, offal non craft beer meditation consectetur brooklyn ut yuccie yr. Exercitation vegan dolore ramps intelligentsia scenester, 3 wolf moon roof party adaptogen fanny pack deep v fashion axe selvage. Banh mi microdosing cold-pressed synth bushwick asymmetrical fam etsy drinking vinegar ethical tousled street art. Enim occaecat ennui sunt DIY four loko copper mug leggings ut franzen dolore tofu church-key lo-fi bespoke. Consequat velit quinoa pok pok fanny pack sriracha hot chicken fam prism banjo. Palo santo meggings letterpress readymade, live-edge ut duis nisi schlitz iPhone umami exercitation sustainable culpa.",
      },
      {
        id: "cmp5",
        name: "Frozen Mountain",
        image:
          "https://images.unsplash.com/photo-1418985991508-e47386d96a71?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80",
        description:
          "I'm baby incididunt chambray next level dolore, offal non craft beer meditation consectetur brooklyn ut yuccie yr. Exercitation vegan dolore ramps intelligentsia scenester, 3 wolf moon roof party adaptogen fanny pack deep v fashion axe selvage. Banh mi microdosing cold-pressed synth bushwick asymmetrical fam etsy drinking vinegar ethical tousled street art. Enim occaecat ennui sunt DIY four loko copper mug leggings ut franzen dolore tofu church-key lo-fi bespoke. Consequat velit quinoa pok pok fanny pack sriracha hot chicken fam prism banjo. Palo santo meggings letterpress readymade, live-edge ut duis nisi schlitz iPhone umami exercitation sustainable culpa.",
      },
    ],
    user: {},

  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})

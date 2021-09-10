import Vue from "vue";
import Vuex from "vuex";
import UserModule from "./modules/user.module";
import MainScreenModule from "./modules/main_screen.module";
import WorkspaceModule from "./modules/workspace.module";
import TextChannelModule from "./modules/text_channel.module";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    UserModule,
    MainScreenModule,
    WorkspaceModule,
    TextChannelModule
  }
});

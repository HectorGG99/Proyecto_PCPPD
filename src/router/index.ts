import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "../views/Home.vue";
import Register from "../views/Register.vue";
import MainScreen from "../views/MainScreen.vue";
import EditInformation from "../views/EditInformation.vue";
import Workspace from "../views/Workspace.vue";
import MessagesPage from "../components/modules/Workspace/ViewMessages.vue";
import NotFound from "../views/PageNotFound.vue";
import NotChannels from "../components/modules/Workspace/NotChannels.vue";
import CodeChannel from "../components/modules/Workspace/Channels/Code/ViewCode.vue";
import NavigationDrawer from "../components/modules/Workspace/ViewNavigationDrawer.vue";
import ViewTreeView from "../components/modules/Workspace/Channels/Code/Files/RepoFilesView.vue";
import { auth } from "@/utils/firebase";
import store from "@/store";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/Mainscreen",
    name: "MainScreen",
    component: MainScreen,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/Editinformation",
    name: "Edit",
    component: EditInformation,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/space/:id",
    name: "Space",
    component: Workspace /* { default: Workspace, Navigation: NavigationDrawer } */,
    meta: {
      requiresAuth: true
    },

    children: [
      {
        name: "messages",
        path: ":idChannel",
        components: /*  MessagesPage */ {
          default: MessagesPage,
          NavigationDrawer: NavigationDrawer
        },
        props: {
          default: true,
          NavigatonDrawer: false
        },
        meta: {
          requiresAuth: true
        }
      },

      {
        name: "notChannels",
        path: "",
        /* component: NotChannels, */
        components: /*  MessagesPage */ {
          default: NotChannels,
          NavigationDrawer: NavigationDrawer
        },
        meta: {
          requiresAuth: true
        }
      },
      {
        name: "codeChannel",
        path: "code/:idChannelCode",
        components: /* CodeChannel */ { default: CodeChannel, tree: ViewTreeView },
        props: {
          default: true,
          tree: true
        },
        meta: {
          requiresAuth: true
        }
      }
    ]
  },
  {
    path: "*",
    name: "notFound",
    component: NotFound
  }
];

const router = new VueRouter({
  mode: "history",
  routes
});
router.beforeEach((to, from, next) => {
  const codeChanged: boolean = store.getters["CodeChannelModule/getCodeChanged"];

  if (!codeChanged) {
    next();
  }

  store.commit("CodeChannelModule/setShowDialogState", codeChanged);
});

router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some(x => x.meta.requiresAuth);
  // await store.dispatch("UserModule/fetchCurrentUser");
  // const currentUser = store.getters["UserModule/getUser"];

  auth.onAuthStateChanged(user => {
    if (!user && requiresAuth) {
      next({ name: "Home" });
    } else if (!requiresAuth && user) {
      next("/Mainscreen");
    } else if (!requiresAuth && !user) {
      next();
    }
    // else if()
    else next();
  });
});

export default router;

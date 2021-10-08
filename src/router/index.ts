import store from "@/store";
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
import CodeChannel from "../components/modules/Workspace/Channels/Code/EditCode.vue";
import { auth } from "@/utils/firebase";

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
    component: Workspace,
    meta: {
      requiresAuth: true
    },
    children: [
      {
        name: "messages",
        path: ":idChannel",
        component: MessagesPage,
        props: true,
        meta: {
          requiresAuth: true
        }
      },
      {
        path: "",
        component: NotChannels
      },
      {
        name: "codeChannel",
        path: "code/:idChannelCode",
        component: CodeChannel,
        props: true,
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

router.beforeEach(
  /* async */ (to, from, next) => {
    const requiresAuth = to.matched.some(x => x.meta.requiresAuth);
    /*  await store.dispatch("UserModule/fetchCurrentUser");
  const currentUser = store.getters["UserModule/getUser"]; */

    /*  if (!currentUser && requiresAuth) {
    next({ name: "Home" });
  } else if (!requiresAuth && currentUser) {
    next("/Mainscreen");
  } else if (!requiresAuth && !currentUser) next();
  else next(); */

    /* console.log(store.getters["UserModule/getUser"]); */

    /* console.log(store.state["UserModule/user"]); */
    auth.onAuthStateChanged(user => {
      console.log(user);
      if (!user && requiresAuth) {
        next({ name: "Home" });
      } else if (!requiresAuth && user) {
        next("/Mainscreen");
      } else if (!requiresAuth && !user) next();
      else next();
    });
  }
);

export default router;

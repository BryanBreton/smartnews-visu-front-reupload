import Vue from "vue"
import Router from "vue-router"
Vue.use(Router)

const pageAppairage = "appairage"

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "accueil",
      component: () => import("./App.vue")
    },
    {
      path: `/${pageAppairage}`,
      name: pageAppairage,
      component: () => import("@/views/Appairage.vue")
    },
    {
      path: "/PleinePage",
      name: "PP",
      // route level code-splitting
      // this generates a separate chunk (accueil.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "accueil" */ "./views/PP.vue")
    },
    {
      path: "/HautBas",
      name: "HB",
      component: () => import("@/views/HB.vue")
    },
    {
      path: "/HautBasGaucheBasDroit",
      name: "HBGBD",
      component: () => import("@/views/HBGBD.vue")
    },
    {
      path: "/GaucheHautDroitBasDroit2",
      name: "G23-1HD13-25BD13-35",
      component: () => import("@/views/G23-1HD13-25BD13-35.vue")
    },
    {
      path: "/GaucheHautDroitBasDroit1",
      name: "GHDBD",
      component: () => import("@/views/GHDBD.vue")
    },
    {
      path: "/bandeau",
      name: "BA1-17G23-67D13-67",
      component: () => import("@/views/BA1-17G23-67D13-67.vue")
    },
    {
      path: "/GaucheHautDroitBasDroit3",
      name: "G13-1HD23-12BD23-12",
      component: () => import("@/views/G13-1HD23-12BD23-12.vue")
    },
    {
      path: "/4zones2",
      name: "HGHDBG13-12BD23-12",
      component: () => import("@/views/HGHDBG13-12BD23-12.vue")
    },
    {
      path: "/4zones1",
      name: "HGHDBGBD",
      component: () => import("@/views/HGHDBGBD.vue")
    },
    {
      path: "/GaucheHautDroitBasDroit4",
      name: "G23-1HD13-12BD13-12",
      component: () => import("@/views/G23-1HD13-12BD13-12.vue")
    },
    {
      path: "/GaucheDroite",
      name: "GD",
      component: () => import("@/views/GD.vue")
    }
  ]
})

router.beforeEach(async (to, from, next) => {
  const { path } = to

  const tokenExists = localStorage.getItem("token") !== null

  if (path === `/${pageAppairage}`) {
    if (tokenExists) {
      // redirection accueil
      next({ name: "accueil" })
    } else {
      next()
    }
  } else {
    if (tokenExists) {
      next()
    } else {
      next({ name: pageAppairage })
    }
  }

})

export default router
import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import WorkDetailView from '../views/WorkDetailView.vue'

function prefersReducedMotion(): boolean {
  return typeof window !== 'undefined'
    && window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export const router = createRouter({
  history: createWebHashHistory(),
  scrollBehavior(to, _from, savedPosition) {
    if (savedPosition) return savedPosition
    const behavior = prefersReducedMotion() ? 'auto' : 'smooth'
    if (to.hash) return { el: to.hash, behavior }
    return { top: 0, behavior }
  },
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/work/:slug', name: 'work-detail', component: WorkDetailView },
    { path: '/:pathMatch(.*)*', redirect: '/' },
  ],
})

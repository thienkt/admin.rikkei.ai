// middleware/auth.global.ts
import {getCurrentUser} from "vuefire";

export default defineNuxtRouteMiddleware(async (to, from) => {
    const user = await getCurrentUser()
    console.log({user})
    if (!user && to.path !== '/') {
        return navigateTo({path: '/', query: {redirect: to.fullPath,},})
    }

    if (user && to.path === '/') {
        return navigateTo({path: '/dashboard'})
    }
})
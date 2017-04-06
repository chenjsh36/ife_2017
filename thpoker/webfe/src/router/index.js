import Vue from 'vue'
import Router from 'vue-router'
// import Hello from '@/components/Hello'
import Hall from '@/components/Hall'
import Signin from '@/components/Signin'
import Register from '@/components/Register'

Vue.use(Router)

export default new Router({
    routes: [
        // {
        //     path: '/',
        //     name: 'Hello',
        //     component: Hello
        // },
        {
            path: '/',
            name: 'Hall',
            component: Hall
        },
        {
            path: '/user/signin',
            component: Signin
        },
        {
            path: '/user/register',
            component: Register
        },
    ]
})

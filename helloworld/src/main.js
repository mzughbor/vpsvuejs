import { createApp } from 'vue'
import App from './App.vue'



// Import Bootstrap and BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'




import {createRouter,createWebHistory} from 'vue-router'
import ExamesPage from './components/ExamesPage.vue'
import HomePageVue from './components/HomePage.vue'
import Admin from './components/AdminComponent.vue'
import User from './components/UserComponent.vue'
import AdminUsers from './components/AdminUsersComponent.vue'
import AdminLessons from './components/AdminLessons.vue'
import AdminArticales from './components/AdminArticales.vue'
import AdminUsersTable from './components/AdminUserTable.vue'


/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { faUserSecret,faUserTie } from '@fortawesome/free-solid-svg-icons'

/* add icons to the library */
library.add(faUserSecret)
library.add(faUserTie)


const routes=[
    {
        path:'/', 
        name:'root', 
        component:User,
        children:
           [
            {
                path:'/training', 
                name:'training', 
                component:HomePageVue,
                // children:
                //    [
                //     {path:'/training/lesson/:id', name:'lesson', component:WelcomeScreen},
                //     {path:'/training/lesson/:id/train', name:'lessontrain', component:TestCanvasVue}
                //   ]
                
            },
            {
                path:'/exames', 
                name:'exames', 
                component:ExamesPage,
               
                
            },
          ]
        
    },
    
    {
        path:'/admin', 
        name:'admin', 
        component:Admin,
        children:
           [
                {path:'/admin/users', name:'admin.users', component:AdminUsers },
                {path:'/admin/users/table', name:'admin.users.table', component:AdminUsersTable },
                {path:'/admin/lesssons', name:'admin.lessons', component:AdminLessons },
                {path:'/admin/articales', name:'admin.articales', component:AdminArticales }
          ]
    }


]

const router=createRouter({
    history: createWebHistory(),
    routes,
})

const app = createApp(App)
app.component('font-awesome-icon', FontAwesomeIcon)
app.use(router)
app.mount('#app')


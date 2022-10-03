<template>
    <div v-if="apporved" class="" dir="rtl">
        <div class="row justify-content-start align-items-start">
            <div class="col-2" style="height:100vh; margin:0; padding:0;">
                <ul class="nav flex-column align-items-center bg-light p-2" style="border: solid 2px skyblue;border-radius:5px; height:100vh; margin:0; padding:0; ">
                    <li class="nav-item">
                        <img class="rounded-4" src="../assets/logo.png" alt="">

                    </li>
                    <li class="nav-item">
                       <router-link 
                        :to="{name:'admin.users'}"
                        class="nav-link" >المستخدمين</router-link>
                    </li>
                    <li class="nav-item">
                       <router-link 
                        :to="{name:'admin.users.table'}"
                        class="nav-link" >تقرير المستخدمين</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link :to="{name:'admin.lessons'}" class="nav-link" >الدروس</router-link>
                    </li>
                    <li class="nav-item" >
                        <router-link  class="nav-link" :to="{name:'admin.articales'}" >المقالات</router-link>
                    </li>
                    <li class="nav-item" >
                        <router-link  class="nav-link" :to="{path:'/'}" >التطبيق</router-link>
                    </li>
                    <li class="nav-item" >
                        <a  class="nav-link"  @click="showPsswordForm=!showPsswordForm" >تغيير كلمة السر</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" @click="signout">تسجيل الخروج</a>
                    </li>
                </ul>
            </div>
            <!-- <AdminUsersComponent :users="users" :usersResults="usersResults"/> -->
           <div class="col">
            <router-view v-if="!showPsswordForm"></router-view>
            <ChangePassword v-if="showPsswordForm"/>
           </div>
        </div>
    </div>
</template>

<script>


import DBservice from '../../DBService';
import ChangePassword from './ChangePassword.vue';




    export default {
    data: () => {
        return {
            users: {},
            usersResults: {},
            userSelectedData: {},
            msg:"me",
            apporved:false,
            showPsswordForm:false
        };
    },
   
    components: { ChangePassword }
   
    ,
    methods: {
        signout() {
          
            localStorage.clear();
            window.location.assign("/")
        }
    },
    
    async beforeMount(){
        const userAdmin = await DBservice.userIsAdmin(localStorage.getItem('userId'))
        console.log(userAdmin)
        if(!userAdmin)
        {
            window.location.assign("/")
        }
        this.apporved=true;
    }
}
</script>

<style lang="css" scoped>
 router-link{
    color:white;
 }
</style>
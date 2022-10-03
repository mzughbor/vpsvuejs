<template>
    <div class="ui-header">
        <div data-topbar="true" class="contain-to-grid ">
            <nav class="top-bar">
                <div class="navbar-brand right h-100 rounde-3"><img class="h-100 rounded-5" src="../assets/logo.png"
                        alt="logo"></div>
                <section class="top-bar-section">
                    <ul class="right" v-if="logedin">
                        <li style="color:white">


                            <a> {{user}} <span>
                                    <font-awesome-icon icon="fa-solid fa-user-tie" size='2x' />
                                </span> </a>

                        </li>
                        <li id="lessons" @click="changeClass('lessons')">

                            <router-link to="/training">الدروس</router-link>


                        </li>
                        <li id="exams" @click="changeClass('exams')">

                            <router-link to="/exames">اختبارات</router-link>


                        </li>
                        <li id="exams" @click="changeClass('exams')">

                            <router-link to="/exames">اختبارات</router-link>


                        </li>
                        <li id="exams" @click="changeClass('exams')">

                            <a href="https://98rl.co" target="_blank">موقع المدرب تركي النخيلان</a>


                        </li>
                    </ul>
                    <div>
                        <!---->
                        <ul class="left">
                            <li>
                                <div>

                                    <button v-if="logedin" @click='logout' class="login">تسجيل خروج</button>

                                </div>
                            </li>

                        </ul>

                    </div>
                </section>
            </nav>
        </div>
    </div>

    <!-- لوحة تسجيل الدخول -->
    <div v-show="showRegisteratoin">
        <registerandloginVue />
    </div>
</template>

<script>
import registerandloginVue from './RegisterAndLogin.vue';


export default {
    data: function () {
        return {
            showRegisteratoin: false,
            name: "",
            password: "",
            email: "",
            logedin: false,
            user: null
        };
    },
    methods: {
        logout() {
            localStorage.clear();
            this.logedin = false;
            this.user = null;
            window.location.reload(true);
        },
        changeClass(element) {
            let elements = document.querySelectorAll("ul.right>li")
            for (let el of elements) {
                el.setAttribute("class", "")
            }
            document.getElementById(element).setAttribute("class", "active")

        }
    },
    mounted() {
        this.user = localStorage.getItem("user");

        if (localStorage.getItem("user"))
            this.logedin = true;
        else
            this.logedin = false;
    },
    components: { registerandloginVue }
}
</script>

<style scoped>

</style>
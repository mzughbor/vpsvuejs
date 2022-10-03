<template>
   

        <div class="tb-dialog-container">
           
            <div class="tb-dialog-header">
                <div> <a href="#" class="pull-left"><i class="fa fa-times"></i></a>
                </div>
            </div>
            <div class="tb-dialog-body">
                <div>
                    <div class="row login-container">
                        <div class="login-or hide-for-small-only"><span
                                class="or">أو</span></div>
                        <!---->
                        <div class="column medium-6 login-column">
                            <h3><span>إنشاء حساب جديد</span></h3>
                            <form class="log-in-form" @submit.prevent="signup">
                                <label>اسم الدخول
                                    <input type="text" name="username"
                                        autocomplete="off" autocorrect="off"
                                        autocapitalize="none" spellcheck="false" 
                                        v-model="name"
                                        
                                        >
                                    <p class="error-msg" style="display: none;">رجاءا
                                        أدخل اسم الدخول</p>
                                    <p class="error-msg" style="display: none;">
                                        اسم الدخول غير صحيح.
                                        <br>
                                        قواعد اسم الدخول:
                                        <br>
                                        * أطول من 3 أحرف وأقل من 50 حرف.
                                        <br>
                                        * يتكون من أحرف أو أرقام عربية أو أجنبية.
                                    </p>
                                    <p class="error-msg" style="display: none;">اسم
                                        الدخول غير متاح</p>
                                </label> 
                                
                                <label>البريد الالكتروني
                                    <input type="email" name="email" v-model="email">
                                    <p class="error-msg" style="display: none;">رجاءا
                                        أدخل البريد الالكتروني</p>
                                    <p class="error-msg" style="display: none;">البريد
                                        الالكتروني غير صحيح</p>
                                    <p class="error-msg" style="display: none;">البريد
                                        الإلكتروني موجود مسبقا</p>
                                </label> 
                                
                                <label>كلمة السر
                                    <input type="password" name="password" v-model="password"
                                        autocomplete="new-password">
                                    <p class="error-msg" style="display: none;">رجاءا
                                        أدخل كلمة السر</p>
                                    <p class="error-msg" style="display: none;">كلمة
                                        السر يجب أن تتكون على الأقل 4 أحرف</p>
                                </label> 
                                
                                
                                <label><input type="checkbox"
                                        name="remember-me">
                                    تذكرني
                                </label>


                                <p class="error-msg" style="display: none;"></p>
                                <div>
                                    
                                    
                                    <button type="submit"
                                        class="button expand success"><i
                                            class="fa fa-fw fa-spin fa-spinner"
                                            style="display: none;"></i>
                                        إنشاء حساب جديد</button> 
                                    
                                    </div>
                            </form>
                            
                        </div>
                        <div class="column medium-6 register-column">
                            <form  class="log-in-form" @submit.prevent="login" >
                            <h3><span>تسجيل الدخول</span></h3>
                         <label>اسم الدخول أو الإيميل
                                    <input type="text" name="username"
                                        required="required" autocorrect="off"
                                        autocapitalize="none"
                                        spellcheck="false" v-model="name"></label> <label>كلمة السر
                                    <input type="password" name="password"
                                        required="required" v-model="password"></label> <label><input
                                        type="checkbox" name="remember-me">
                                    تذكرني
                                </label>
                                <!---->
                                <div>
                                    
                                    <button type="submit" class="button expand"><i
                                            class="fa fa-fw fa-spin fa-spinner"
                                            style="display: none;"
                                           
                                            
                                            ></i>
                                        تسجيل الدخول</button>
                                    </div>
                              </form>
                        <br>
                        </div>
                    </div>
                </div>
            </div>
            <div class="tb-dialog-footer">
                <div></div>
            </div>
        </div>
  
</template>

<script>
import dbservice from '../../DBService'
    export default {
        data:function(){
            return {
                name: "",
                password: "",
                email: ""
            }
        },
        methods: {
         async login() {
           

            let user= await dbservice.getUser(this.name,this.password);
          
            if( user===undefined)
                alert("لايوجد حساب بهذا الاسم أو الايميل أو كلمة السر خاطئة")
            else{
                alert(`مرحباً بك  ${user.name}`)
                localStorage.setItem("user",user.name)
                localStorage.setItem("userId",user._id)
                if(user.admin)
                {
                    window.location.assign('/admin')
                }
                else
                window.location.reload(true)
            }

           
        },
         async signup() {
            let id=await dbservice.insertUser(this.name,this.email,this.password)
           if( id!=null)
           {

                  await dbservice.addresultsRecord(id)
                  
                  this.login(this.name,this.password)
                  
           }
           else{
            alert("اسم المستخدم موجود مسبقاً")
           }

        }
        ,
        submit(){
            console.log()
        }
    }
}

</script>

<style scoped>

</style>
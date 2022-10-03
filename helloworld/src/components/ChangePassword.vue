<template>
    <div>
        <div class="container">
            <form class="row align-items-center h-100 my-5">
                <div class="col ">
                    <div class="mb-3 row">
                        <label for="oldPassword" class="col-3 col-form-label fs-6">كلمة السر القديمة</label>
                        <div class="col-8">
                            <input v-model="oldpass" type="password" class="form-control" name="oldPassword" id="oldPassword" placeholder="كلمة السر القديمة">
                        </div>
                    </div>
                <div class="mb-3 row">
                    <label for="newpassword" class="col-3 col-form-label fs-6">كلمة السر الجديدة</label>
                    <div class="col-8">
                        <input v-model="newpass" type="password" class="form-control" name="newpassword" id="newpassword" placeholder="كلمة السر الجديدة">
                    </div>
                </div>
                <div class="mb-3 row">
                    <label for="conpassword" class="col-3 col-form-label fs-6">تأكيد كلمة السر</label>
                    <div class="col-8">
                        <input v-model="conpass" type="password" class="form-control" minlength="8" name="conpassword" id="conpassword" placeholder="تأكيد كلمة السر" required>
                    </div>
                </div>
              
                <div class="mb-3 row">
                    <div class="offset-sm-4 col-sm-8">
                        <button type="submit" class="btn btn-primary" @click.prevent="changePassword">تغيير</button>
                    </div>
                </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import DBservice from '../../DBService'

    export default {
        data() {
            return {
                oldpass: "",
                newpass:"",
                conpass:"",
            }
        },
        methods: {
            async changePassword() {
                if(this.newpass.length+this.conpass.length<16)
                    alert("كلمة السر يجب أن تكون أطول من 8 محارف")
                else
                if(this.newpass!==this.conpass)
                    alert("كلمات السر غير متطابفة")
                else{
                  alert(await DBservice.resetPassword(this.newpass,this.oldpass))
                
                }
            }
        },

    }
</script>

<style lang="scss" scoped>

</style>
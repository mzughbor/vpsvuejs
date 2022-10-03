<template>
      
        <div class="lesson-menu " >  
            
           
           
            <ul class="lesson-menu-list">
                <button v-if="show" class="btn btn-primary" type="button" disabled>
                <span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
                Loading...
            </button>
              <li class="lesson-level-title">صف الارتكاز</li>
              
              <router-link to=""> <li class="lesson-menu-item" @click="sendMessage(1)"><a 
                    class="link not-active"><span class="status">•</span><span class="text">ب ت ن ي
                        المسافة</span></a></li></router-link>
              
                <!--  -->
              <router-link to=""> <li class="lesson-menu-item"  @click="sendMessage(2)"><a 
                        class="link not-active"><span class="status">•</span><span class="text">م س ك
                            ش</span></a></li></router-link>
              <router-link to=""> <li class="lesson-menu-item"  @click="sendMessage(3)"><a
                        class="link "><span class="status">•</span><span class="text">ا
                            ل</span></a></li></router-link>
              <router-link to=""> <li class="lesson-menu-item"  @click="sendMessage(4)"><a 
                        class="link not-active"><span class="status">•</span><span class="text">أ
                            ط</span></a></li></router-link>
              <router-link to=""> <li class="lesson-menu-item"  @click="sendMessage(5)"><a 
                        class="link not-active"><span class="status">•</span><span class="text">، :
                            "</span></a></li></router-link>
                <li class="lesson-level-title">الصف العلوي</li>
            
              <router-link to=""> <li class="lesson-menu-item"  @click="sendMessage(6)"><a class="link not-active"><span class="status">•</span><span class="text">ع
                            ق</span></a></li></router-link> 
              <router-link to=""> <li class="lesson-menu-item"  @click="sendMessage(7)"><a class="link not-active"><span class="status">•</span><span class="text">ه
                            ث</span></a></li></router-link>          
              <router-link to=""> <li class="lesson-menu-item"  @click="sendMessage(8)"><a class="link not-active"><span class="status">•</span><span class="text">خ
                            ص</span></a></li></router-link>
              <router-link to=""> <li class="lesson-menu-item"  @click="sendMessage(9)"><a class="link not-active"><span class="status">•</span><span class="text">ح
                            ض</span></a></li></router-link>
              <router-link to=""> <li class="lesson-menu-item"  @click="sendMessage(10)"><a class="link not-active"><span class="status">•</span><span class="text">ج د
                            ذ</span></a></li></router-link>
              <router-link to=""> <li class="lesson-menu-item"  @click="sendMessage(11)"><a class="link not-active"><span class="status">•</span><span class="text">غ ف
                            إ</span></a></li></router-link>
                <li class="lesson-level-title">الصف السفلي</li>
              <router-link to=""> <li class="lesson-menu-item"  @click="sendMessage(12)"><a 
                        class="link not-active"><span class="status">•</span><span class="text">ة
                            ر</span></a></li></router-link>
              <router-link to=""> <li class="lesson-menu-item"  @click="sendMessage(13)"><a 
                        class="link not-active"><span class="status">•</span><span class="text">و
                            ؤ</span></a></li></router-link>
              <router-link to=""> <li class="lesson-menu-item"  @click="sendMessage(14)"><a 
                        class="link not-active"><span class="status">•</span><span class="text">ز
                            ء</span></a></li></router-link>
              <router-link to=""> <li class="lesson-menu-item"  @click="sendMessage(15)"><a 
                        class="link not-active"><span class="status">•</span><span class="text">ظ
                            ئ</span></a></li></router-link>
              <router-link to=""> <li class="lesson-menu-item"  @click="sendMessage(16)"><a 
                        class="link not-active"><span class="status">•</span><span class="text">ى آ .
                            ؟</span></a></li></router-link>
                <!-- <li class="lesson-level-title">التشكيل</li>
                <router-link to="/training/lesson/17"><li class="lesson-menu-item"  @click="sendMessage(1)"><a 
                        class="link not-active"><span class="status">•</span><span class="text">الفتحة
                            التنوين بالفتحة</span></a></li></router-link>
                <router-link to="/training/lesson/18"><li class="lesson-menu-item"><a 
                        class="link not-active"><span class="status">•</span><span class="text">الضمة
                            التنوين بالضمة</span></a></li></router-link>
                <router-link to="/training/lesson/19"><li class="lesson-menu-item"><a 
                        class="link not-active"><span class="status">•</span><span class="text">الكسرة
                            التنوين بالكسرة</span></a></li></router-link>
                <router-link to="/training/lesson/20"><li class="lesson-menu-item"><a 
                        class="link not-active"><span class="status">•</span><span class="text">الشّدة
                            السكون</span></a></li></router-link> -->
            </ul>
        </div>

</template>

<script>
import DBservice from '../../DBService';

export default {
    emits:["lessonChanged"],
   data:()=>{
    return {
        message:'menu',
        show:false,
        currentid:-1,
        data:null
    }
   },
   methods: {
    sendMessage(i) {
            if(this.data==null)
                return
          
            let resultData=this.data.filter( lesson=> {return lesson.lessonId==i})
            this.currentid=i;
   
            this.$emit("lessonChanged",resultData)
        }
    
   },
   async mounted () {
            if(this.data!=null)
             return
           this.show=true;
            this.data=await DBservice.getLesson(0);
            this.show=false;

   },
}
</script>

<style lang="scss" scoped>
    .lesson-menu-item{
        font-size: 1.5em;
    }
    .lesson-menu{
        display: block;
      


    }
    .lesson-menu-list{
        height:100vh;
        overflow-y: auto;
    }

   
</style>
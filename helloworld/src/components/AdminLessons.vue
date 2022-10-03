<template>
   
<div v-if="showForm" class="container-fluid bg-light w-50 rounded-2 " style="position:absolute; top:5em;z-index: 1000;">
   <div class="container">
    <form @submit.prevent>
        
            
                <div class="mb-3">
                  <label for="title" class="form-label text-medium">العنوان</label>
                  <textarea class="form-control" name="title" id="title" rows="5" v-model="editedFormTitle"></textarea>
                </div>
            
            <div class="mb-3">
              <label for="traintext" class="form-label">نص التدريب</label>
              <textarea class="form-control" name="traintext" id="traintext" rows="5" v-model="editedFormTrainText"></textarea>
            </div>
        <div class="mb-3 row">
            <div class="offset-sm-4 col-sm-8">
                <button type="submit" class="btn btn-success"  @click.prevent="saveLesson">حفظ</button>
                <button type="submit" class="btn btn-danger mx-3"  @click.prevent="saveLesson(false)">إلغاء</button>
            </div>
        </div>
    </form>
   </div>
</div>

        <div class="row justify-content-center align-items-start g-2">
            <div class="col-3 overflow-auto " style="height:100vh; scroll-behavior:smooth ;">
                <!-- Hover added -->
                <div class="list-group">
                    <!-- <button type="button" class="list-group-item list-group-item-action active" aria-current="true">Active item</button> -->
                    <button v-for="id,index of lessons" :id="id" :key="index" type="button"
                        class="list-group-item list-group-item-action my-1" @click="userSelectedEvent(index,$event)">الدرس {{id}}</button>
                </div>
            </div>
            <div class="col overflow-auto px-3" style="height:100vh;">
                <div v-if="lessonSelected.length>0" >
               


                  
                <div v-for="lesson,i of lessonSelected" :key="i" class="card h-50 mb-1">
                    <div class="card-header">
                        <p> التمرين {{i+1}}</p>
                    </div>
                    <div class="card-body ">
                        <h5 class="card-title">نص التدريب</h5>
                        <p class="card-text overflow-hidden">{{lesson.traintext}}</p>
                        <a class="btn btn-success mx-2" @click="openEditForm(false,i)">تعديل</a>
                        <a class="btn btn-danger" @click="deleteLesson(i)">حذف</a>
        
                    </div>
                </div>
            </div>
            </div>
            <div   class="col-3">
               <button v-if="lessonSelected.length>0" type="button" class="btn btn-info " @click="openEditForm(true,0)" >+ إضافة تمرين</button>
             
            </div>
        </div>
        

</template>

<script>
import DBservice from '../../DBService'

import data from './data/lessons'
    export default {
           props:['msg'],
            data:()=>{
                return {
                    lessons:{},
                    lessonsExcercises:null,
                    lessonSelected:{},
                    editedFormTitle:'',
                    editedFormTrainText:'',
                    editedFormLessonId:"",
                    lessonSelectedId:'',
                    exercId:'',
                    
                    showForm:false,
                }
            },
          
            methods: {
                userSelectedEvent(index,event) {
                    if(this.lessonsExcercises==null)
                        return
                 //change user class
                 const activeButton=document.querySelectorAll('div.list-group>button.active')
                 if(activeButton.length!=0)
                    activeButton[0].classList.remove('active')
                 event.target.classList.add("active")

                  //fetch user data
                  this.lessonSelected=this.lessonsExcercises.filter((lesson)=>
                  {
                   
                    return lesson.lessonId==event.target.id

                  })
                 
                  this.lessonSelectedId=index

                },
                saveLesson(saveCommand){
                    if(!saveCommand)
                    {
                        this.showForm=false;
                        return
                    }
                    if(this.editedFormLessonId.length<=0)
                    {
                        this.lessonSelected[this.exercId].welcomeText=this.editedFormTitle;
                        this.lessonSelected[this.exercId].traintext=this.editedFormTrainText;
                        //update lesson in data base
                       
                       DBservice.updateLesson(this.lessonSelected[this.exercId])
                   }
                    else{
                       
                        const newLesson={
                            welcomeText:this.editedFormTitle,
                            traintext:this.editedFormTrainText,
                            lessonId:this.editedFormLessonId
                        }
                        this.lessonSelected.push(newLesson)
                        //add lesson to data base.
                       // console.log(this.lessonSelected[this.lessonSelected.length-1])
                        DBservice.addLesson( this.lessonSelected[this.lessonSelected.length-1])

                    }
                    this.showForm=false;

                },
                openEditForm(add,index){
                
                    if(!add)
                    {
                        
                        this.editedFormTitle=this.lessonSelected[index].welcomeText;
                        this.editedFormTrainText=this.lessonSelected[index].traintext;
                        this.exercId=index;
                        this.editedFormLessonId=""
                    }
                    else{
                        this.editedFormTitle=""
                        this.editedFormTrainText=""
                        this.editedFormLessonId=this.lessonsExcercises[this.lessonSelectedId].lessonId
                    }
                    this.showForm=true;
                },
                deleteLesson(index){

                    DBservice.deletlesson(this.lessonSelected[index]._id)
                    this.lessonSelected=this.lessonSelected.filter((lesson)=>{
                        return lesson._id!=this.lessonSelected[index]._id
                    })
                }
            }
            ,
            async beforeMount() {
                this.lessons=new Set();
               data.map((lesson)=>{
                    
                    this.lessons.add(lesson.lessonId)
               });
             this.lessonsExcercises=await DBservice.getLesson(0)
              
                
    },
           
    }

  
</script>

<style lang="scss" scoped>

</style>
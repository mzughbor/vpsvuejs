<template>
   
   <!-- edit form  -->
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

<!-- page -->
        <div class="row justify-content-center align-items-start g-2">
        
            <div class="col overflow-auto px-3" style="height:100vh;">
                <div v-if="lessonsExcercises.length>0" >
               
                     
                <div v-for="lesson,i of lessonsExcercises" :key="i" class="card h-25 mb-1 p-0">
                    <div class="card-header m-0 p-2 ">
                        <p>{{i+1}}- {{lesson.title}}</p>
                    </div>
                    <div class="card-body p-0 h-25">
                
                        <p class="card-text overflow-hidden p-2 text-break " style="font-size:12px">{{lesson.paragraph}}</p>
                        
        
                    </div>
                    <div class="card-footer text-muted m-0 p-2">
                        <a class="btn btn-success btn-sm mx-1" @click="openEditForm(false,i)">تعديل</a>
                        <a class="btn btn-danger btn-sm " @click="deleteLesson(i)">حذف</a>
                    </div>
                </div>
            </div>
            </div>
            <div   class="col-3">
               <button v-if="lessonsExcercises.length>0" type="button" class="btn btn-info " @click="openEditForm(true,0)" >+ إضافة تمرين</button>
             
            </div>
        </div>
        

</template>
    
<script>
    import DBservice from '../../DBService'
    
        export default {
               props:['msg'],
                data:()=>{
                    return {
                        lessons:{},
                        lessonsExcercises:[],
                      
                        editedFormTitle:'',
                        editedFromParagraph:'',
                        editedFormAdd:true,
                        lessonSelectedId:'',
                        exercId:'',
                        
                        showForm:false,
                    }
                },
                methods: {
                   
                    saveLesson(saveCommand){
                        if(!saveCommand)
                        {
                            this.showForm=false;
                            return;
                        }
                        if(!this.editedFormAdd)
                        {
                            this.lessonsExcercises[this.exercId].title=this.editedFormTitle;
                            this.lessonsExcercises[this.exercId].paragraph=this.editedFromParagraph;
                            //update lesson in data base
                           DBservice.updateArticale(this.lessonsExcercises[this.exercId])
                       }
                        else{
                           
                            const newLesson={
                                title:this.editedFormTitle,
                                paragraph:this.editedFromParagraph,
                                
                            }
                            this.lessonsExcercises.push(newLesson)
                            //add lesson to data base.
                           // console.log(this.lessonSelected[this.lessonSelected.length-1])

                            DBservice.addArticle( this.lessonsExcercises[this.lessonsExcercises.length-1])
    
                        }
                        this.showForm=false;
    
                    },
                    openEditForm(add,index){
                    
                        if(!add)
                        {
                            
                            this.editedFormTitle=this.lessonsExcercises[index].title;
                            this.editedFromParagraph=this.lessonsExcercises[index].paragraph;
                            this.exercId=index;
                            this.editedFormAdd=false
                        }
                        else{
                            this.editedFormTitle=""
                            this.editedFromParagraph=""
                            this.editedFormAdd=true
                        }
                        this.showForm=true;
                    },
                    deleteLesson(index){
    
                        DBservice.deletArticale(this.lessonsExcercises[index]._id)
                        this.lessonsExcercises=this.lessonsExcercises.filter((lesson)=>{
                            return lesson._id!=this.lessonsExcercises[index]._id
                        })
                    }
                }
                ,
                async beforeMount() {
                  
                 this.lessonsExcercises=await DBservice.getAllArticales()
                  
                    
        },
               
        }
    
      
    </script>
    
<style lang="scss" scoped>
    
    </style>
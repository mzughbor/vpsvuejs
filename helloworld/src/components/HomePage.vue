<template>
    <div id="main" style="height:100vh; width:100% ;">
        <div id="menulist" style="height:100vh">
            <LessonsMenu  @lessonChanged="changeData" />
        </div>
    
        <div id="panel " style="background: white; padding: 0 5em; ">
           
            <div class="row">
               
                 <div class="card  bg-light ">
             
                   <div class="card-body p-0">
                   
                     <p class="card-text text-success">
                      <span>الدروس &gt;</span><span v-if="id>0">{{lessons[id-1]}}&gt;{{excersises[exerciseId]}}&gt;</span>
                     </p>
                   </div>
                 </div>
                

 
           
               
            </div>
            <div v-if="welcomeText.length>0" >
                <p><span v-for="line,i of welcomeText.split('\n')" :key="i">{{line}} <br /></span></p>
                <button v-if="progressTraining" @click="hideWelcome">إبدأ التمرين</button>
                <div v-else class="table-responsive-sm">
                    <table class="table table-success ">
                        <thead>
                            <tr>
                                <th scope="col">رقم التمرين</th>
                                <th scope="col">الدقة</th>
                                <th scope="col">الزمن</th>
                                <th scope="col">السرعة</th>
                            </tr>
                        </thead>
                        <tbody >
                            <tr v-for="result,index of localResult" :key="index" class="">
                                <td scope="row">{{index+1}}</td>
                                <td>{{result.percision}}</td>
                                <td>{{result.time}}</td>
                                <td>{{result.speed}}</td>
                                
                            </tr>

                        </tbody>
                        <tfoot>
                            <tr>
                                <th>إجمالي النتيجة</th>
                                <td>{{totalResult.percision.toFixed(2)}}</td>
                                <td>{{totalResult.time.toFixed(2)}}</td>
                                <td>{{totalResult.speed.toFixed(2)}}</td>
                            </tr>
                        </tfoot>
                    </table>
                 
                </div>
                
            </div>
        
            <TestCanvas v-if="trainText.length>0" 
                :trainText="trainText"  
                :lessonId="id"
                @endTraining="updateResult"/>       
        </div>

        <div class="resutls  col " style="height:100vh" >
           <div class="row  mb-1 overflow-auto " style="height:48%; font-size: smaller;"> <TrainerResluts :result="result" :speed="speed"/></div>
            <div class="row mb-1 overflow-auto " style="height: 45%;">
                <Best10Users />
          </div>
        </div>
     
    </div>
   
</template>

<script >


import TrainerResluts from "./TrainerResluts.vue"
import LessonsMenu from "./LessonsMenu.vue"
import TestCanvas from "./TestCanvas.vue"
import DBservice from "../../DBService"
import Best10Users from "./Best10Users.vue"

export default {
   
    data:()=>{
        return {
            message:"",
            startTrain:false,
            id:-1,
            exerciseId:0,
            welcomeText:"",
            trainText:"",
            data:null,
            result:{
                "#":"loading"
            },
            progressTraining:true,
            lessons:[],
            excersises:[],
            localResult:[],
            totalResult:{percision:0,speed:0,time:0},
            speed:0
           
        }
    },
    components:{ TrainerResluts, LessonsMenu, TestCanvas, Best10Users }
   
   ,
    methods:{
         changeData(data){
            if(data!=null)
            {
                console.log(data)
                this.data=data;
                this.localResult=[];
                this.id=this.data[0].lessonId;
            }
         
            this.progressTraining=true;
            this.welcomeText=this.data[this.exerciseId].welcomeText;
            this.trainText='';
         }
         ,
         hideWelcome(){
            this.welcomeText='';
            this.trainText=this.data[this.exerciseId].traintext;
         },
         async updateResult(newData){
           
            if (this.result['#']!=undefined)
            {
                let data=await DBservice.getresults(localStorage.getItem('userId'));

               
                if(data===undefined || data===null)
                this.result={"#":"لم تقم بأي تدريب"}
                else
                
                    {
                        this.result=data.result;
                        this.speed=data.speed;
                    }

            }
            else{

                this.localResult.push(newData)
                
                this.exerciseId++
                if(this.exerciseId<this.data.length)
                    this.changeData(null)
                else
                {
                    this.exerciseId=0;
                    this.welcomeText="انتهى التمرين"
                    this.progressTraining=false;
                    this.trainText=""
                  
                    for(let result of this.localResult){
     
                        this.totalResult.percision+=Number.parseFloat(result.percision)/this.localResult.length
                        this.totalResult.speed+=Number.parseFloat(result.speed)/this.localResult.length
                        this.totalResult.time+=Number.parseFloat(result.time)/this.localResult.length
                    }
                   
                    this.result[this.id]= this.totalResult;
                   this.speed=0;
                    for (let key of Object.keys(this.result)) {
                       
                       this.speed += this.result[key].speed / Object.keys(this.result).length
                    }
                    DBservice.updateMark(localStorage.getItem('userId'),this.totalResult, Number.parseInt(this.id),this.speed)
                   
                    
                   
                }
            }
        }
        }
    ,
    
    mounted () {
        this.exerciseId=0;
        this.logedin=localStorage.getItem('userId')!=null
        this.startTrain=false
        this.welcomeText=''
        this.updateResult();
        this.lessons=["الدرس الأول","الدرس الثاني","الدرس الثالث","الدرس الرابع","الدرس الخامس",]
        this.excersises=["التمرين الأول","التمرين الثاني","التمرين الثالث","التمرين الرابع","التمرين الخامس"]
    },
    updated(){
        this.logedin=localStorage.getItem('user')!=null
        this.startTrain=false
    }
}
</script>


<style>
    #main{
        display: grid;

        grid-template-columns: 1fr 4fr 1fr ;
        column-gap: 5em;
        height: 100vh;

    }
    #menulist{
        margin-bottom: 2em;
    }

   
</style>

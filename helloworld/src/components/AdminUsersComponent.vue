<template>
   
       
           <div class="row justify-content-center align-items-start g-2">
            <div class="col-2">
               <!-- Hover added -->
               <div class="list-group">
                <input type="date" name="date" id="date" v-model="createdate" >
                <!-- <button type="button" class="list-group-item list-group-item-action active" aria-current="true">Active item</button> -->
                <button v-for="user,index of users" :key="index" :id="index" type="button" class=" text-center list-group-item list-group-item-action my-0" @click="userSelectedEvent">{{user.name}}</button>
               </div>
            </div>
            <div class="col">
                <div  v-if="userSelectedData.name!=undefined && userSelectedData.result!=undefined"  class="table-responsive-sm">
                    <table class="table table-striped-columns
                    table-hover	
                    table-bordered
                    table-secondary
                    align-middle">
                        <thead class="table-light">
                            <caption class="row justify-content-center">نتائج المستخدم {{userSelectedData.name}}</caption>
                            <tr>
                                <th>الدرس</th>
                                <th>الدقة</th>
                                <th>الزمن</th>
                                <th>السرعة</th>

                            </tr>
                            </thead>
                            <tbody class="table-group-divider">
                                <tr v-for="key,i of Object.keys(userSelectedData.result)"  :key="i" class="table-primary" >
                                    <td scope="row">{{key}}</td>
                                    <td>{{userSelectedData.result[key].percision.toFixed(2)}}</td>
                                    <td>{{userSelectedData.result[key].time.toFixed(2)}}</td>
                                    <td>{{userSelectedData.result[key].speed.toFixed(2)}}</td>
                                   
                                </tr>
                              
                            </tbody>
                            <tfoot>
                                 <tr>
                                    <th>السرعة الإجمالية</th>
                                    <td colspan="3">{{userSelectedData.speed.toFixed(2)}}</td>
                                </tr>
                            </tfoot>
                    </table>
                </div>
                <div v-else-if="userSelectedData.name!=undefined && userSelectedData.result==undefined" >
                    <div class="card text-center">
                      <div class="card-body">
                        <h4 class="card-title">نتائج المستخدم {{userSelectedData.name}}</h4>
                        <p class="card-text">لم يقم باختبارات حتى الان</p>
                      </div>
                    </div>
                </div>
                
            </div>
            <div class="col-2">

                <button v-if="userSelectedData.name!=undefined" class="btn btn-sm btn-danger"  @click.prevent="deleteUser">حذف المستخدم</button>
            </div>
           </div>
</template>

<script>
 import DBservice from '../../DBService'

    export default {
           props:['msg'],
            data:()=>{
                return {
                    users:{},
                    data:{},
                    usersResults:{},
                    userSelectedData:{},
                    createdate:new Date().toISOString().substring(0,10)
                    
                }
            },
            watch: {
                createdate(newValue) {
                    this.users=this.data.filter((user)=> user.createAt<=(newValue));
                    this.userSelectedData={}
                    
                }
            },
            
            methods: {
                 deleteUser(){
                    DBservice.deletresult(this.userSelectedData._id)
                    DBservice.deletuser(this.userSelectedData.userId)
                   
                    this.data=this.data.filter(user=>user._id!=this.userSelectedData.userId)
                    this.users=this.data
                    this.userSelectedData={}
                },
                async userSelectedEvent(event) {
                 //change user class
                 const activeButton=document.querySelectorAll('div.list-group>button.active')
                 if(activeButton.length!=0)
                    activeButton[0].classList.remove('active')
                 event.target.classList.add("active")
               

                  //fetch user data
                  this.userSelectedData=await Array.from( this.usersResults).filter((user)=>
                  {         
                   
                    return user.userId==this.data[event.target.id]._id

                  })
                  if(this.userSelectedData.length!=0)
                    this.userSelectedData={...this.userSelectedData[0],name:event.target.innerHTML}
                  else
                    this.userSelectedData={name:event.target.innerHTML}
                 
                }
            }
           
            ,
            async beforeMount() {
               
            this.data = await DBservice.getAllusers();
            this.usersResults = await DBservice.getresults();
            this.data.sort((a,b)=>a._id.localeCompare(b._id))
            this.usersResults.sort((a,b)=>a.userId.localeCompare(b.userId))
            this.usersResults=Array.from(this.usersResults)
         
            
            for(let i=0 ; i<this.data.length;i++){
                this.data[i].speed=this.usersResults[i].speed
            }

           this.data.sort((a,b)=>b.speed-a.speed)
       
           this.users=this.data

    },
           
    }
</script>

<style lang="scss" scoped>

</style>
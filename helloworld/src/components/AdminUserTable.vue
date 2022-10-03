<template>
   
       
           <div class="row justify-content-center align-items-start g-2">
            <div class="col-2">
               <!-- Hover added -->
               <label >فرز حسب التاربخ <input type="checkbox" v-model="showFilter" ></label>
               <div class="list-group" v-if="showFilter">
                <label >
                    من تاريخ <input type="date" name="date" id="date" v-model="firstDate" />
                </label>
                <label >
                    الى تاريخ <input type="date" name="date" id="date" v-model="ToDate" />
                </label>
                
               </div>
            </div>
            <div class="col">
                <div   class="table-responsive-sm">
                    <h5 class="text-center">ترتيب المستخدمين حسب السرعة </h5>
                    <table class="table table-striped-columns
                    table-hover	
                    table-bordered
                    table-secondary
                    align-middle">
                        <thead class="table-light text-center">
                          
                            <tr >
                                <th>الاسم</th>
                                <th>السرعة</th>
                            </tr>
                            </thead>
                            <tbody class="table-group-divider">
                                <tr v-for="key,i of Object.keys(users)"  :key="i" class="table-primary" >
                                    <td scope="row">{{users[key].name}}</td>
                                    <td>{{users[key].speed.toFixed(2)}}</td>
                                   
                                </tr>
                              
                            </tbody>
                          
                    </table>
                </div>
              
                
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
                    firstDate:new Date().toISOString().substring(0,10),
                    ToDate:new Date().toISOString().substring(0,10),
                    showFilter:false,
                    max_speed:1,
                    counter:0,
                    
                }
            },
            watch: {
                ToDate(newValue) {
                  
                    this.users=this.data.filter((user)=> user.createAt<=(newValue) && user.createAt>=this.firstDate);
            
                },
                firstDate(newValue) {
                  
                    this.users=this.data.filter((user)=> user.createAt>=(newValue) && user.createAt<=this.ToDate);
                   
                },
                showFilter(newValue){
                    if(!newValue){
                        this.users=this.data
                    }
                    else{
                        this.users=this.data.filter((user)=> user.createAt>=this.firstDate && user.createAt<=this.ToDate);
                    }
                }
            },
            computed: {
                divStyle() {

                    console.log(this.users[this.counter])
                   
                    return{
                        width:"10px"
                    }
                }
            },
            methods: {
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
                this.usersResults = await DBservice.getresults();
                this.data = await DBservice.getAllusers();

                this.usersResults = Array.from(this.usersResults);
                this.usersResults.sort((a, b) => a.userId.localeCompare(b.userId))

                this.data.sort((a, b) => a._id.localeCompare(b._id))

                for (let i = 0; i < this.data.length; i++) {
                    this.data[i].speed = this.usersResults[i].speed
                }
                this.data.sort((a, b) => b.speed - a.speed)
                this.users=this.data
                this.max_speed=this.users[0].speed

    },
           
    }
</script>

<style lang="scss" scoped>

</style>
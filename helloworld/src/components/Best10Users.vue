<template>
    <!-- <div v-for="key,i of Object.keys(result)" :key="i">
        <h6> {{key}}    {{result[key]}}</h6>
    </div> -->


   
    <table class="table  " style="font-size:10px; ">
        
        <thead style="position: sticky; top:0;">
          <tr ><th colspan="2"><h4 class="text-center" style="font-size:14px; ">أفضل 10 متدربين</h4></th> </tr>
          <tr>
            <th scope="col" style="font-size:12px; ">الاسم</th>
            <th scope="col" style="font-size:12px; ">السرعة</th>
          </tr>
        </thead>
        <tbody style="font-size:12px; ">
          <tr v-for="result,i of results" :key="i">
            <th scope="row" style="font-size:12px; ">{{result.name}}</th>
            <td style="font-size:12px; ">{{result.speed.toFixed(2)}}</td>
          </tr>
       


        </tbody>
      
      </table>
</template>

<script>


  import DBservice from '../../DBService'
    export default {
       
        data(){
          return {
            totalspeed:0.0,
            results:[],
            numberOfbest:10
                    }
        }

        ,
        async mounted () {
      
        let lresults=await DBservice.getresults();
        let users=await DBservice.getAllusers();

        lresults=Array.from(lresults);
        lresults.sort((a,b)=>  a.userId.localeCompare(b.userId))
          
        users.sort((a,b)=>a._id.localeCompare(b._id))

          for(let i=0 ; i<lresults.length;i++){
            lresults[i].name=users[i].name
          }
          lresults.sort((a,b)=> b.speed-a.speed)
          for(let i=0 ;i<lresults.length &&  i<this.numberOfbest;i++){
           this.results.push(lresults[i])
          }
        


          // this.results.map((r)=>{
          //   console.log(r)
          //   for(let user of users){
          //     if(r.userId===user._Id)
          //     {
          //       r.name=user.name
                
          //     }
          //   }
          // })
          // console.log(this.results)
          

         
        }
    }
</script>

<style scoped>

</style>
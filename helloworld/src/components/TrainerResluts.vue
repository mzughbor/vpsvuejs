<template>
    <!-- <div v-for="key,i of Object.keys(result)" :key="i">
        <h6> {{key}}    {{result[key]}}</h6>
    </div> -->

    <table class="table" style="font-size:14px;">
        
        <thead style="position:sticky; top:0" >
          
          <tr><th colspan="2"><h4 class="text-center" style="font-size:14px;" >نتائج التمارين السابقة</h4></th></tr>
          <tr style="font-size:12px; ">
            <th scope="col" style="font-size:12px; ">رقم الدرس</th>
            <th scope="col" style="font-size:12px; ">السرعة</th>
          </tr>
        </thead>
       
        <tbody class="mt-5" style="font-size:14px;">  
         
          <tr v-for="key,i of Object.keys(result)" :key="i" style="font-size:14px;">
            <th class="col" style="font-size:12px; ">{{key}}</th>
            <td class="col" style="font-size:12px; ">{{result[key].speed}}</td>
          </tr>
          


        </tbody>
    
        <tfoot style="position:sticky; bottom:0">
          <tr><th class="text-center" style="font-size:12px; ">إجمالي السرعة</th><td style="font-size:12px; ">ِ{{speed.toFixed(2)}}</td></tr>
        </tfoot>
      </table>
   
</template>

<script>
    // import dbservice from '../../DBService'
    export default {
        props: ["result","speed"],
        data(){
          return {
            totalspeed:0.0
          }
        }

        ,
        beforeUpdate () {
          
         
         
        }
    }
</script>

<style scoped>

</style>
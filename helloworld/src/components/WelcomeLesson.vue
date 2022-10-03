<template>
    <div v-if="welcomeText.length>0">
        <p ><span v-for="line,i of welcomeText.split('\n')" :key="i">{{line}} <br/></span></p>
        <button @click="changeLocation">إبدأ التمرين</button>
    </div>
    <div  v-if="welcomeText.length==0" class="loader"></div>
    <!-- <div v-if="text.length==0"><h1>جاري التحميل.....</h1></div> -->
    <div >
        
    </div>
</template>

<script>
    //import DBservice from '../../DBService'

    export default {
        props: {
            welcomeText: {
                type: String,
                default: ""
            },
        },
        data:()=>{
            return {
             
            }
        }
        ,
        methods: {
            changeLocation(){
                
                this.$router.push(this.$route.fullPath+"/train")

                
              }
                
            
        },
       
        async mounted () {
            // let id= Number.parseInt(this.$route.params.id)
           
            // const data=await DBservice.getLesson(id);

            //this.text= data[0].welcomeText
        },
        async updated(){

            // let id= Number.parseInt(this.$route.params.id)
          
            // const data=await DBservice.getLesson(id);
            //this.text= data[0].welcomeText
        }
       
    }
    
</script>

<style scoped>
 
</style>
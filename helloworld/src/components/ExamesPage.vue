<template>
    <div>
        <div  v-if="stillLoadin" class="row">
                <button class="btn btn-primary" type="button" disabled>
                <span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
                Loading...
            </button>
        </div>
        <div  class="container"  >
            
            
            <div class="row justify-content-center align-items-center g-2 " >
                <div class="col-3">
    
                </div>
                <div v-if="!stillLoadin && !trainingStarted" class="col overflow-auto"  style="height:85vh">
                    <div  v-for="article,index of this.articales" :key={index} class="card mb-2 overflow-hidden p-1" style="height:15vh;font-size:">
                        <div class="card-body p-0" style="font-size:small" >
                            <h6 class="card-title " @click="startExam(index)" style="cursor:pointer ; font-size:medium;height: 20%; ">{{article.title}}</h6>
                            <p class="card-text p-2" style=" font-size:small">
                                <span v-for="line,i of article.paragraph.split('\n')" :key="i">{{line}}<br /></span>
                            </p>
                        </div>
                    </div>
                  

                  
                </div>
                <TestCanvas class="col" v-if="trainingStarted" 
                        :trainText="trainText" 
                        :lessonId="trainText" 
                        @endTraining="updateResult" />
                <div class="col-3">
    
                </div>
    
            </div>
        </div>
    </div>
</template>

<script>
import DBservice from '../../DBService';
import TestCanvas from './TestCanvas.vue';

    export default {
    data() {
        return {
            articales: null,
            stillLoadin: false,
            trainingStarted:false,
            trainText:""
        };
    },
    methods:{
        startExam(index){
            this.trainingStarted=true;
            this.trainText=this.articales[index].paragraph
        },
        updateResult(result){
            this.trainingStarted=false;
            console.log(result)
        }
    },
    async mounted() {
        this.stillLoadin = true;
        this.articales = await DBservice.getAllArticales();
        this.stillLoadin = false;
    },
    components: { TestCanvas }
}
</script>

<style lang="scss" scoped>

</style>
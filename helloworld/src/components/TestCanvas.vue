<template>  
    <div class="row">
        <div class="column medium-12">
            

            <div  class="panel radius">
                <div class="test-canvas status-0 " style="height: 170px;">
                    <div style=" height: 100%;">
                       <div v-for="(line,j) of this.inputs" class="line" :key="j">
                         <span v-for="(element,i) of line" :key="i" :class="element.class" >{{element.char}}</span>
                       </div>
                    </div>
                  
                </div>
                <div >
                    <h5 >
                        <span style="margin-right:2em" v-if="endTraining" :class="(result.percision>50) ?'success':'errorkey'">الزمن: {{result.time}}</span>
                        <span style="margin-right:2em" v-if="endTraining" :class="(result.percision>50) ?'success':'errorkey'">الدقة {{result.percision}}</span>
                        <span style="margin-right:2em" v-if="endTraining" :class="(result.percision>50) ?'success':'errorkey'">السرعة {{result.speed}}</span>
                        <span v-if="endTraining" @click="nextExercise"  class="btn b-1 b-primary text-primary   mx-3">استمرار</span>
                    </h5>
                  </div>
            </div>
            
            <HandsAndKeyBoard :char="nextchar"/>
        </div>
    </div>
        
    
</template>

<script>
import HandsAndKeyBoard from "./HandsAndKeyBoard.vue";

//import dbservice from '../../DBService'





    export default {
    props: {
        trainText: {
            type: String,
            default: ""
        },
        lessonId:{
            type:Number
        }
    },
    emits:["endTraining"]
    ,
    data: function () {
        return {
            error_keys: [],
            success_keys: [],
            inputs: [],
            minutes: 0,
            seconds: 0,
            startcounting: false,
            lineIndex: 0,
            charIndex: 0,
            textcharindex: 0,
            endTraining: false,
            timeout: null,
            nextchar:'',
            startime:null,
            result:{},
            wrongInsertion:false
         
           
         
        };
    },
    methods: {
        
        async updateText(event) {

            console.log(this.trainText.charAt(this.textcharindex))
            //intialize time and start counting the result
            if (!this.startcounting) {
                {
                    this.startime=new Date();
                    this.startcounting = !this.startcounting;
                }
            }

            //check the letter that the user entered
            if (event.key === this.trainText.charAt(this.textcharindex)) {
                this.inputs[this.lineIndex][this.charIndex].class = "success";
                this.success_keys.push(this.textcharindex);
                this.wrongInsertion=false;
            }
            else {
                if(this.wrongInsertion)
                    return
                this.inputs[this.lineIndex][this.charIndex].class = "errorkey";
                this.error_keys.push(this.textcharindex);
                this.wrongInsertion=true;
                return
            }


            if (this.trainText.charAt(this.textcharindex + 1) === "\n") {
                this.lineIndex++;
                this.charIndex = 0;
                this.textcharindex++;
            }
            else {
                this.charIndex++;
            }
            this.textcharindex++;
            try {
                this.inputs[this.lineIndex][this.charIndex].class = "current";
                this.nextchar=this.trainText[this.textcharindex]
            }

            
            catch (error) {
               this.setEndingTraining();
              
                return;
            }
        },
        setEndingTraining() {


           this.endTraining=!this.endTraining;
            const time=-((this.startime-new Date())/1000).toFixed(2);
            const precision=100-((this.error_keys.length / this.trainText.length * 100)) .toFixed(2)
            const speed=(this.trainText.length/time).toFixed(0);
            this.result={time:time.toFixed(2),percision: precision,speed:speed};
            window.removeEventListener("keypress", this.updateText);
            //dbservice.updateMark(localStorage.getItem('user'),precision, Number.parseInt(this.lessonId))
           
        },
        nextExercise(){
            this.$emit("endTraining",this.result)
        }
    },
    updated(){
        this.nextchar=this.trainText[this.textcharindex];
    },
    mounted() {
       
        window.addEventListener("keypress", this.updateText);
        let j = 0;
        let i = 0;
        for (let line of this.trainText.split("\n")) {
            this.inputs.push([]);
            for (let c of line) {
                this.inputs[this.inputs.length -1].push({ char: c, class: (this.textcharindex == (i + j) ? "current" :
                        this.error_keys.includes(i + j) ? "errorkey" :
                            this.success_keys.includes(i + j) ? "success" : "waiting") });
                i++;
            }
            j++;
        }
    },
    created() {
        this.minutes = Math.floor(this.timer / 60);
        this.seconds = this.timer % 60;
        // let id= Number.parseInt(this.$route.params.id)
  
       
        this.nextchar=this.trainText[0];
       
    },
    components: { HandsAndKeyBoard }
}
</script>

<style>
    .current{
        background-color: skyblue;
    }
    .success{
        color: greenyellow;
    }
    .errorkey{
        color: red;
    }
  
  
</style>
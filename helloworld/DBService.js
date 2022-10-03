import axios from 'axios'

const usersUrl='/api/users'
const resultsUrl='/api/results'
const LESSONS_URL='/api/lessons'
const ARTICALES_URL='/api/articales'


class DBservice{

    static async getAllusers(){
      
            try {
                const data=await axios.get(usersUrl)
                return data.data;
               
            } catch (error) {
               return null;
            }
      
    }
    static async resetPassword(newpassord,oldpassword){

        const users= await this.getAllusers();

            
        const data = users.filter((user)=>{
            return (user.admin && localStorage.getItem('userId')===user._id && user.password===oldpassword);
        });
        if(data.length!=1){
            return "فشلت العملية لخطأ في البيانات"
        }
        else{
            const user={
                query:{
                    _id:data[0]._id
                },
                data:{
                    password:newpassord
                }
            }
            try {

                await axios.put(usersUrl,user)
        
                
             } catch (error) {
                return "فشلت العملية لخطأ في المخدم";
             }
             return "تم العملية بنجاح"
        }
       
    }
    static async getUser(nameOremail='',password){
        if(nameOremail==='' ||password===null || password === '')
            return null;

        
            try {
              
                const users= await this.getAllusers();

            
                const data = users.filter((user)=>{
                    return (nameOremail===user.name || nameOremail===user.email) && password===user.password;
                });

            
               return data[0];
            
            } catch (error) {
              return null;
            }
        
    }
    static async userIsAdmin(userId){
        const users= await this.getAllusers();
        for(let user of users)
        {
            if(user._id==userId)
            {
                return user.admin?true:false;
            }

        }
        return false;
    }
    static async insertUser(name,email,password){
        const res = await this.getUser(name,password);
        if(res!=undefined)
         {
          
            return null;
         }
        else
        {
           let user=await axios.post(usersUrl,{
            name:name,
            password:password,
            email:email,
            createdAt:new Date()
           })
          return user.data.insertedId
        }
      
   

    }

    static async getresults(userId){
      
        try {
            const data=await axios.get(resultsUrl)
           
            if(userId!=undefined)
            return data.data.filter((result)=> result.userId==userId)[0];
            else
            return data.data;
           
        } catch (error) {
           return null;
        }
  
    }
    static async updateMark(userId,mark,lesson,speed){
      
        try {
           
           await axios.put(resultsUrl,{userId:userId,mark:mark,lesson:lesson,speed:speed})
          
           
        } catch (error) {
           return null;
        }
  
    }

    static async addresultsRecord(id){
      
        try {
           await axios.post(resultsUrl,{userId:id})
         
           
        } catch (error) {
           return null;
        }
  
    }

    static async getLesson(lessonid){
        try {
            const data=await axios.get(LESSONS_URL+`/${lessonid}`)
            return data.data;
            
        } catch (error) {
            return null;
        }
    }
    
    static async updateLesson(newLesson){
        try {
            const body={
                query:{
                    _id:newLesson._id,
                },
                data:{
                    traintext:newLesson.traintext,
                    welcomeText:newLesson.welcomeText
                }
            }
            await axios.put(LESSONS_URL,body)
                       
         } catch (error) {
            return null;
         }
   
    }

    static async addLesson(newLesson){
        try {
            const body={
                lessonId:newLesson.lessonId,
                traintext:newLesson.traintext,
                welcomeText:newLesson.welcomeText
            }
            const data=await axios.post(LESSONS_URL,body)
            return data.data;
           
        } catch (error) {
           return null;
        }
    }

    static async deletlesson(idd){
        try {
          
            const body={
            data:{
                id:idd}
            }
            
            await axios.delete(LESSONS_URL,body)
          
           
        } catch (error) {
           return null;
        }
    }
    static async getAllArticales(){
        try {
            const data=await axios.get(ARTICALES_URL)
            return data.data;
           
        } catch (error) {
           return null;
        }
    }

    static async updateArticale(newArticale){
        try {
            const body={
                query:{
                    _id:newArticale._id,
                },
                data:{
                    title:newArticale.title,
                    paragraph:newArticale.paragraph
                }
            }
            await axios.put(ARTICALES_URL,body)
                       
         } catch (error) {
            return null;
         }
   
    }

    static async addArticle(newArticale){
        try {
            const body={
            
                title:newArticale.title,
                paragraph:newArticale.paragraph
            }
            const data=await axios.post(ARTICALES_URL,body)
            return data.data;
           
        } catch (error) {
           return null;
        }
    }

    static async deletArticale(idd){
        try {
          
            const body={
            data:{
                id:idd}
            }
            
            await axios.delete(ARTICALES_URL,body)
          
           
        } catch (error) {
           return null;
        }
    }

    static async deletuser(idd){
        try {
          
            const body={
            data:{
                id:idd}
            }
            
            await axios.delete(usersUrl,body)
          
           
        } catch (error) {
           return null;
        }
    }

    static async deletresult(idd){
        try {
          
            const body={
            data:{
                id:idd}
            }
            
            await axios.delete(resultsUrl,body)
          
           
        } catch (error) {
           return null;
        }
    }
}

export default DBservice;
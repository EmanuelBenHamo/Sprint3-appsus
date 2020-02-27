import mailService from "../services/mail.service.js"

export default {
    template: `
        <section class="mail-details-container">
            <h1 class="text-center"> {{mail.subject}}</h1>
            <div class="top-bar flex space-around">
                <h3>From: {{mail.from}}</h3>
                <h3>To: {{mail.to}}</h3>
                <h4>{{reformattedTime}}</h4>   
            </div>
            <p class="mail-details-body">{{mail.body}}</p>
            
        </section>
    `,
    data(){
        return{
            currId :this.$route.params.id
        }
    },
    props:['mails'],
    computed:{
        reformattedTime(){
            var time = this.mail.sentAt;
            var formattedTime = new Date(time).toLocaleDateString("en-US")
            return formattedTime
        },
        mail(){
            return this.mails.find(mail => {
                return mail.id === this.currId
            }) 
        },
    },
    created(){
        // this.currId = this.$route.params.id
        // console.log(currId)

    },

}
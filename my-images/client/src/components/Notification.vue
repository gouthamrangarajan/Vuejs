<script>
export default {
    name:'Notification',
    render(){
        return null;
    },
    computed:{
        showNotification(){
            return this.$store.state.showNotification;
        },
        msg(){
            return this.$store.state.notificationMsg;
        },
        isSuccess(){
            return this.$store.state.isNotificationSuccess;
        }        
    },
    methods:{

    },
    watch:{
        showNotification(newVal,oldVal){            
            if(newVal){
                var toastHTML = this.msg;
                var classes='white-text';
                if(this.isSuccess){
                    classes+=' green darken-4';                     
                }
                else{
                    classes+= ' red darken-4';
                }
                M.toast({html: toastHTML,classes});
                setTimeout(()=>{
                    this.$store.dispatch('refreshImgInfo');
                },500);
            }
        }
    }
}
</script>
<style scoped>

</style>
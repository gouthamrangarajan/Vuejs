<script>
export default {
    render(){
        return null
    },
    props:{
        value:{
            type:Boolean,
            required:true
        },
        msg:{
            type:String,
            required:true
        },
        success:{
            type:Boolean,
            required:false,
            default:false
        },
        duration:{
          type:Number,
          required:false,
          default:4000
        },
        dismissible:
        {
          type:Boolean,
          required:false,
          default:false
        },
        processing:{
          type:Boolean,
          required:false,
          default:false
        }
    },
    watch:{
      value(newVal,oldVal){
          if(newVal){
              let classes='red darken-4'
              if(this.success){
                  classes='green darken-4'
              }
              else if(this.processing){
                  classes='light-blue darken-2'
              }
              let html=this.msg
              if(this.dismissible)
                html+='<button class="btn-flat toast-action right waves-effect waves-light" onclick="M.Toast.dismissAll()">Close</button>'
              M.toast({html, classes,displayLength:this.duration})
              setTimeout(()=>{
                  this.$emit('input',false)
              },this.duration)
          }
      }
    }
}
</script>

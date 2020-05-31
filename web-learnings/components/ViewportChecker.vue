<script>
import {mapState} from 'vuex'
export default {
  render(){
    return null
  },
  props:{
    checkId:{
      type:String,
      required:true
    },
    action:{
      type:Function,
      required:true
    },
    scrollId:{
      type:String,
      required:false,
      default:''
    }
  },
  data(){
    return{actionExecuted:false,test:''}
  },

  mounted(){
    if(this.scrollId=='')
      if(window)
        window.addEventListener('scroll',this.checkAndExecuteAction)
    else
    {
      if(window){
        let scrollElem=document.getElementById(this.scrollId)
        scrollElem.addEventListener('scroll',this.checkAndExecuteAction)
      }
    }
  },
  destroyed(){
    this.removeEventListener()
  },
  methods:{
    removeEventListener(){
      if(this.scrollId=='')
        if(window)
          window.removeEventListener('scroll',this.checkAndExecuteAction)
      else{
        if(window){
          let scrollElem=document.getElementById(this.scrollId)
          scrollElem.removeEventListener('scroll',this.checkAndExecuteAction)
        }
      }
    },
    checkAndExecuteAction(){
      if(!this.actionExecuted && document)
        setTimeout(()=>{
            let elem = document.getElementById(this.checkId)
            let bounding = elem.getBoundingClientRect()
            if (
              bounding.top >= 0 &&
              bounding.left >= 0 &&
              bounding.right <= (window.innerWidth || document.documentElement.clientWidth) &&
              bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight)
            ){
              try{
                this.action()
                this.actionExecuted=true
              }
              catch(err){
                console.log(err)
              }

            }
          },600)
    }
  },
  computed:{
    ...mapState(['srchTxt'])
  },
  watch:{
    srchTxt:{
      immediate:true,
      handler(){
      if(process.client)
        this.checkAndExecuteAction()
     }
    }
  }

}
</script>

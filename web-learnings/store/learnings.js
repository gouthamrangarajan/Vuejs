export const state=()=>({
  data:[{
    id:1,
    rank:1,
    subtitle:"by Evan You",
    title:"The process: Making Vue 3",
    url:"https://increment.com/frontend/making-vue-3/",
    tags:['Official Documentation','Javascript','Vue','Evan You']
  },
  {
    id:2,
    rank:2,
    isYt:true,
    subtitle:"by Brad Traversy",
    title:'Nuxt Crash Course',
    videoId:'ltzlhAxJr74',
    tags:['Video','Brad','Traversy Media','Nuxt','Javascript']
  },
  {
    id:3,
    rank:1,
    isYt:true,
    subtitle:"by Evan You",
    title:'Design Principles of Vue 3.0',
    videoId:'WLpLYhnGqPA',
    tags:['Video','Evan You','VueConf','Vue','Javascript','Toronto','2019']
  },{
    id:4,
    rank:2,
    isYt:true,
    subtitle:"by Gregg Pollack",
    title:'Introduction to Nuxt js',
    videoId:'LJbXw5iiSkU',
    tags:['Nuxt','Gregg Pollack','Vue','Javascript']
  },{
    id:5,
    rank:1,
    isYt:true,
    subtitle:"by Evan You",
    title:'Vue.js: the Progressive Framework',
    videoId:'p2P3z7p_zTI',
    tags:['Video','Evan You','VueNYC','Vue','Javascript','Vue NYC','2017']
  },{
    id:6,
    rank:1,
    url:"https://vuejs.org/",
    title:'Vue js',
    tags:['Official Documentation','Evan You','Vue','Javascript']
  },{id:7,
    rank:2,
    isYt:true,
    subtitle:"by Eduardo San Martin Morote",
    title:'Light,lazy asynchronous patterns',
    videoId:'5nr8zLo9hAg',
    tags:['Video','Eduardo','Router','Vue','Javascript','Vue Mastery']
  },{id:8,
    rank:4,
    isYt:true,
    subtitle:"by Maximilian Schwarzmuller",
    title:'Vue 3 & A First Look at the Composition API',
    videoId:'V-xK3sbc7xI',
    tags:['Video','Academind','Composition','Vue','Vue 3','Javascript']
  },
  {id:9,
    rank:3,
    url:"https://materializecss.com/",
    title:'Materialize CSS',
    tags:['Materialize','Material design','Google','Official Documentation']
  }],
  nextId:10
})
export const mutations={
  CLEAR(state){
    state.data.splice(0)
  },
  ADD_DATA(state,value){
    value.id=state.nextId
    state.nextId++
    state.data.push(value)
  }
}
export const actions={
  async add({commit},info){
    let {data,successAction,failureAction}=info
    try{
      commit('ADD_DATA',data)
      if(successAction)
        successAction()
    }
    catch(err){
      console.log(err)
      if(failureAction)
        failureAction()
    }
  }
}

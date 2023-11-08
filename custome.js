(function(){

  const customeRedux = (function(){
    function createStore(reducer){
      let state;
      let listners=[];
      const getState=()=> state;
      const dispatch=(action)=>{
        state=reducer(state,action);
        listners.forEach((listner)=>listner())
      }
      const subscribe =(listner)=>{
        listners.push(listner)
      }

      return{
        getState,
        dispatch,
        subscribe,
      }
    }
      return{
         createStore
        }
  })()

  if(!window.customeRedux){
    window.$redux=window.customeRedux=customeRedux;
  }
})()


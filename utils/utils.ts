
export function combineReducers(slices: any) {
    return (state: any, action: any) =>
      Object.keys(slices).reduce(
        (acc, prop) => ({
          ...acc,
          [prop]: slices[prop](acc[prop], action)
        }),
        state
      )
  }
  
 export function reduceReducers(...reducers: any){ 
    return (state: any, action: any) =>
      reducers.reduce((acc: any, nextReducer: any) => nextReducer(acc, action), state)
  }

  export const combineDispatch = (...dispatches: any) => (action: any) =>
  dispatches.forEach((dispatch: any) => dispatch(action));

  export const stateToPersist = (payload: any[], initialState: any) => {
    const res: any = {}
    if(payload.length > 0)
    {payload.map((state: string | number)=>{
        res[state] = initialState[state]
    })
    return res;
    }
    else return res;
  }

  export const getStateDispatch = (payload: any) => {
    let dispatch = (...args: any) => {};
    let state: any = {};
    payload.forEach((item: any) => {
      if(typeof item === "object"){
        state = item;
      } else {
        dispatch = item;
      }
    })
    return {state, dispatch}
  }
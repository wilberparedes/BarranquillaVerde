function location(state =false, action){
    switch(action.type){
        case 'SET_POSITION' : {
            return {...state, ...action.payload}
        }
        case 'SET_DESTINATION' : {
            return{...state, ...action.payload}
        }
        case 'SET_ROUTE' : {
            return{...state, route: action.payload.coords}
        }
        case 'REMOVE_POSITION':{
            return false;
        }
        default:
            return state;
    }
}

export default location;
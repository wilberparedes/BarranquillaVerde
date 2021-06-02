function user(state = false, action){
    switch(action.type){
        case 'SET_USER' : {
            return {...state, dataUser: action.payload}
        }
        case 'SET_ALL' : {
            return {...state, allData: action.payload}
        }
        case 'SET_UUID' : {
            return {...state, ...action.payload}
        }
        case 'SET_TOKEN' : {
            return {...state, ...action.payload}
        }
        case 'REMOVE_USER':{
            return false;
        }
        default:
            return state;
    }
}

export default user;
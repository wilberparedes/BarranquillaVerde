import { combineReducers } from 'redux';

import user from './user';
import location from './location';

const rootReducer = combineReducers({
    user,
    location
})

export default rootReducer;
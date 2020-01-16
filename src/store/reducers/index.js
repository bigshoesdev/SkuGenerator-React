import { combineReducers } from 'redux';
import auth from './auth';
import persist from './persist';
import product from './product';
import keyword from './keyword';
import category from './category';
import variant from './variant';
import setting from './setting';
import artist from './artist'

const rootReducer = combineReducers({
    auth,
    persist,
    keyword,
    product,
    category,
    variant,
    setting,
    artist,
});
export default rootReducer;

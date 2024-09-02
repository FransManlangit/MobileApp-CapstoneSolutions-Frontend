import { legacy_createStore as createStore, combineReducers, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly'
import cartItems from './reducers/CartItems'
import productItems from './reducers/ProductItems'

const reducers = combineReducers({
    cartItems: cartItems,
    productItems: productItems
})


const store = createStore(
    reducers,
    composeWithDevTools(applyMiddleware(thunkMiddleware))
)

export default store;
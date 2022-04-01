import {combineReducers} from 'redux'
import Reducer from '../Reducers'
import thunk from 'redux-thunk'
import { createStore, applyMiddleware, compose } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'

export default function configureStore(){
    return createStore(
        combineReducers({
            ...Reducer
        }),
        compose(applyMiddleware(thunk))
    )
}




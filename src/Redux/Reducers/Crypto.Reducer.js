import { AFISHO_CRYPTO } from "../Actions/crypto.actions";
import  {ERROR_CRYPTO} from '../Actions/crypto.actions'
import { LOADING_CRYPTO} from "../Actions/crypto.actions";

function CryptoReducer(state={
    loading:false, error:false, data:[]
}, action
){
    console.log(action.data);
    switch(action.type){
        case AFISHO_CRYPTO:{
            return {
                ...state,
                loading:false,
                error:false,
                data:action.data
            }
        }

        default: return state
    }
}

export default CryptoReducer
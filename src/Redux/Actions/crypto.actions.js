import axios from 'axios';


export const AFISHO_CRYPTO='AFISHO_CRYPTO';
export const ERROR_CRYPTO='ERROR_CRYPTO';
export const LOADING_CRYPTO='LOADING_CRYPTO';


export const getCrypto=()=>{

  
    return async (dispatch)=>{
        await axios.get("https://data.messari.io/api/v1/assets?fields=id,slug,symbol,metrics/market_data/price_usd")
        .then((result)=>{
           

   
            console.log(result)
        if(result===null){
            dispatch({
                type:LOADING_CRYPTO,
                data:result,
                payload:result,
                loading:true,
                error:false
            })
        }
        else{
            dispatch({
                type:AFISHO_CRYPTO,
                data:result,
                payload:result,
                loading:false,
                error:false
            })
        }
            
        })
        

    }
}
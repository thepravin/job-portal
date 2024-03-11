import {createSlice} from "@reduxjs/toolkit"


const isAuthorizedSlice = createSlice({
    name:"isAuthorized",
    initialState:{
        isAuthorized : false
    },
    reducers:{
        setIsAuthorized:(state)=>{
            state.isAuthorized = !isAuthorizedSlice
        }
    }
})



export const {setIsAuthorized} = isAuthorizedSlice.actions;
export default isAuthorizedSlice.reducer
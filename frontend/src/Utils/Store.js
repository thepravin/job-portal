
import {configureStore} from "@reduxjs/toolkit"
import isAuthorizedSlice from "./isAuthorizedSlice";
import userSlice from "./userSlice";

const store = configureStore({
    reducer:{
        isAuthorized : isAuthorizedSlice,
         user:userSlice,
    }
})

export default store;
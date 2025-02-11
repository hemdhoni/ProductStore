import { configureStore } from "@reduxjs/toolkit"
import themeReducer from "./slices/themeSlice"
import productReducer from "./slices/productSlice"
import modelReducer from "./slices/modelSlice"

export default configureStore({
    reducer:{
        themes:themeReducer,
        products:productReducer,
        model:modelReducer
    }
})


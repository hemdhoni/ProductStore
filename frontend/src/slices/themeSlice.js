import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    theme:localStorage.getItem("preferred-theme") || "forest"
}

export const themeSlice = createSlice({
    name:"theme",
    initialState,
    reducers:{
        setTheme:(state ,action)=>{
            localStorage.setItem("preferred-theme" , action.payload)
            state.theme = action.payload
        }
    }
})

export const { setTheme } = themeSlice.actions
export default themeSlice.reducer
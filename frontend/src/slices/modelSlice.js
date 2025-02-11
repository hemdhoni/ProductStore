import { createSlice } from "@reduxjs/toolkit"



const initialState = {
     isopendmodal :false,
     updatemodal:false
}


export const modelSlice = createSlice({
    name:"modelSlice",
    initialState,
    reducers:{
        setOpenModel: (state, action) => {
            state.isopendmodal = action.payload;
          },
          setUpdateModal: (state, action) => {
            state.updatemodal = action.payload;
          },
    }
})

export const {setUpdateModal ,setOpenModel} = modelSlice.actions
export default modelSlice.reducer
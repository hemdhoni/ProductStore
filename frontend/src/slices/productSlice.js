import { createSlice  , createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios"

let baseurl = `http://localhost:8000/`
//async thunk 
export const fetchProducts = createAsyncThunk("fetchproducts" , async()=>{
    const res = await axios.get(`${baseurl}api/products`)
    return res.data;  // Correct way to access the data from Axios response
})

 export const deleteProduct = createAsyncThunk("deleteProduct", async (productId) => {

        const res = await axios.delete(`${baseurl}api/products/delete/${productId}`);
        console.log("res from delete product" , res)
        if (res.data.status) {
            return res.data;  // Return the ID to update the state
        } else {
            return res.data;  // Return the ID to update the state
        
        }

});

export const addProduct = createAsyncThunk("addProduct", async (data) => {
try {
    console.log("add product create async thunk" ,data )
    let productdata = {
        name: data.name,
        image: data.image,  // Since it's a string, keep it as is
        price: data.price
    };
    
    const res = await axios.post(`${baseurl}api/products/createproduct`, productdata, {
        headers: {
            "Content-Type": "application/json"  // Use application/json for string data
        }
    });
    
    // console.log("res from delete product" , res)
    if (res.data.status) {
        // console.log("res.data.message----:> " , res.data.message);  // "data successfully deleted"
        return res.data;  // Return the ID to update the state
    } else {
        throw new Error(res.data.message);  // Throw an error to trigger the rejected case
    }
} catch (error) {
    throw new Error(error.response ? error.response.data.message : "Network error");

}
});
  
export const getProduct = createAsyncThunk("getProduct" ,  async (productid) => {
    
    try {
      
        const res = await axios.get(`${baseurl}api/products/${productid}`)
        if (res.data.status) {
            return res.data;  // Return the ID to update the state
        } else {
            throw new Error(res.data.message);  // Throw an error to trigger the rejected case
        }
    } catch (error) {
        throw new Error(error.response ? error.response.data.message : "Network error");
    
    }

})

export const updateProduct = createAsyncThunk("updateProduct" , async (data , id) => {

    try {
        let productdata = {};

        if (data.name) {
            productdata.name = data.name;
        }
        if (data.image) {
            productdata.image = data.image;
        }
        if (data.price) {
            productdata.price = data.price;
        }
        let res = await axios.put(`${baseurl}api/products/update/${data.id}`, productdata, {
            headers: {
                "Content-Type": "application/json"  // Ensures the request body is sent as JSON
        }});

        console.log()
        if(res.data.status){
            return res.data
        }else{
            return res.data
        }
    } catch (error) {
        throw new Error(error.response ? error.response.data.message : "Network error");
    }
   


})


let initialState = {
     isLoading:false,
     data:[],
     isError:false
}

export const productSlice = createSlice({
     name:"product",
     initialState,
     extraReducers:(builder) =>{
        builder.addCase(fetchProducts.pending , (state , action) => {
            state.isLoading = true
        })
        builder.addCase(fetchProducts.fulfilled , (state , action) =>{
            state.isLoading = false
            state.data = action.payload.data
        })
        builder.addCase(fetchProducts.rejected , (state,action) =>{
            state.isError = true
        })
        // builder.addCase(deleteProduct.fulfilled , (state, action) => {
        //     state.data = state.data.filter((product) => product.id !== action.payload)
        // })
        // builder.addCase(deleteProduct.rejected , (state,action) => {
        //     console.error("Delete failed:", action.error.message);  // Log the error message
        //     state.isError = true;
        // })
     }
})

export default productSlice.reducer
import React , {useEffect, useState} from 'react'
import {ArrowLeftIcon, SaveIcon, Trash2Icon } from "lucide-react"
import { useParams ,  useNavigate } from 'react-router-dom'
import {useDispatch} from "react-redux"
import { getProduct } from '../slices/productSlice'
const ProductPage = () => {
  let [formdata , setFormData] = useState({
      name:"",
      image:"",
      price:""
  })
  let [currentproduct , setCurrentProduct] = useState({}) 
  let dispatch = useDispatch()
  let {id } = useParams()
  
  let navigate = useNavigate()

  let isloading =false
  let error = false
  

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        let response = await dispatch(getProduct(id)).unwrap();
        setCurrentProduct(response.data[0])
        console.log("response from getProduct: ", response);
        setFormData(response.data[0])
      } catch (error) {
        console.error("Error fetching product: ", error);
      }
    };
  
    fetchProduct();
  }, [dispatch]);  // Add `id` and `dispatch` to the dependency array
  

  if(isloading){

    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="loading loading-spinner loading-lg"/>
        </div>

    )
  }

  if(error){
    return (
       <div className="container mx-auto px-4 py-8">
          <div className="alert alert-error">
              {error}
          </div>
       </div>
    )
  }

  return (
     <div className="container mx-auto px-4 py-8 max-w-4xl">
        <button onClick={() => navigate("/")} className="btn btn-ghost mb-8">
          <ArrowLeftIcon className="size-4 mr-2"/>
          Back to Products
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* productImage */}
          <div className="rounded-lg overflow-hidden shadow-lg bg-base-100">
            <img 
              src={currentproduct.image}
              alt={currentproduct.name} 
              className="size-full object-cover" 
            />

          </div>

          {/* product form  */}

          <div className="card bg-base-100 shadow-lg">
            <div className="card-body">
                <h2 className="card-title text-2xl mb-6">Edit Product</h2>
                <form 
                 onSubmit={(e) => {
                    e.preventDefault()
                    // updateProduct(id)
                 }}
                className="space-y-6">

                    <div className="form-control">
                       <label className="label">
                         <span className="label-text text-base font-medium">
                          Product Name
                         </span>
                       </label>
                       <input 
                        type="text" 
                        className="input input-bordered w-full" 
                        value={formdata.name}
                        onChange={(e) => setFormData({...formdata , name:e.target.value})}
                       />
                    </div>

                    <div className="form-control">
                       <label className="label">
                         <span className="label-text text-base font-medium">
                          Price
                         </span>
                       </label>
                       <input 
                        type="text" 
                        className="input input-bordered w-full" 
                        value={formdata.price}
                        onChange={(e) => setFormData({...formdata , price:e.target.value})}
                       />
                    </div>

                    <div className="form-control">
                       <label className="label">
                         <span className="label-text text-base font-medium">
                          Image
                         </span>
                       </label>
                       <input 
                        type="text"
                        placeholder='https://example.com/image.jpg' 
                        className="input input-bordered w-full" 
                        value={formdata.image}
                        onChange={(e) => setFormData({...formdata , image:e.target.value})}
                       />
                    </div>

                    {/* form actions */}

                    <div className="flex justify-between mt-8">
                      <button type='button' className="btn btn-error">
                          <Trash2Icon className='size-4 mr-2'/>
                          Delete Product
                      </button>

                      <button 
                      type='submit'
                      className="btn btn-primary">
                         <SaveIcon 
                          className='size-4 mr-2'
                         />
                         Save Changes
                      </button>
                    </div>

                </form>
            </div>
          </div>
        </div>
     </div>
  )


}

export default ProductPage

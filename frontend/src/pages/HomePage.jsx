import React, {useEffect, useState}from 'react'
import {useSelector  ,  useDispatch} from "react-redux"
import { fetchProducts  } from '../slices/productSlice'
import { PlusCircleIcon, RefreshCwIcon } from "lucide-react"
import ProductCard from '../components/ProductCard'
import AddProductModel from '../components/AddProductModel'
import { setOpenModel } from '../slices/modelSlice'
const HomePage = () => {

  const {products , model} = useSelector(data => data)
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProducts());  // Fetch products when the component mounts
  }, [dispatch]);


  return (
   <main className='mx-auto px-4 py-8 max-w-6xl'>
    <div className="flex justify-between items-center mb-8">
       <button className="btn btn-primary" onClick={() => dispatch(setOpenModel(true))}>
            <PlusCircleIcon  className='size-5 mr-2'/>
            Add Product
       </button>
       <button className='btn btn-ghost btn-circle' onClick={() => dispatch(fetchProducts())}>
          <RefreshCwIcon className='size-5'/>
       </button>
    </div>

    {
      model.isopendmodal && <AddProductModel />
    }

   
    {
      products.isLoading ? 
        (
          <div className="flex justify-center items-center h-64">
          <div className="loading loading-spinner loading-lg" />
          </div>
        )
        :
        (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
             {
              products.data.map(product =>(
                <ProductCard key={product.id} product={product}/>
              ))
             }
          </div>
        )
      
    }
   </main>
  )
}

export default HomePage

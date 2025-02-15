import React, { useState } from 'react'
import { EditIcon  , Trash2Icon} from 'lucide-react'
import {Link} from "react-router-dom"
import { deleteProduct } from '../slices/productSlice'
import { useDispatch } from 'react-redux'
import { fetchProducts } from '../slices/productSlice'
import toast from 'react-hot-toast'
// import {setUpdat}

const ProductCard = ({product}) => {    
  let dispatch = useDispatch()
//   let [message,setMessage] = useState('')
  const deleteProductCard = async (productid) => {
       let data = await  dispatch(deleteProduct(productid)).unwrap()
      //  console.log("data delete product ---:> " , data)
       if(!data.data.status){
        toast.error(data.message)
       }else{
         toast.success(data.message)
       }

  }

  return (
    <div className='card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300'>

            {/* product image */}
            <figure className='relative pt-[56.25%]'>
                    <img 
                     src={product.image}
                     alt={product.name}
                     className='absolute top-0 left-0 w-full h-full object-cover'
                    />
            </figure>

            {/* product info card */}
            <div className="card-body">
                <h2 className="card-title text-lg font-semibold">{product.name}</h2>
                <p className="text-2xl font-bold text-primary">${Number(product.price).toFixed(2)}</p>
            </div>

            {/* Card Actions */}
            <div className="card-actions justify-end m-4">
                <Link to={`/product/${product.id}`} className="btn btn-sm btn-info btn-outline">
                    <EditIcon className="size-4"/>
                </Link>

                <button className="btn btn-sm btn-error btn-outline" onClick={() => deleteProductCard(product.id)}>
                    <Trash2Icon className="size-4"/>
                </button>
            </div>

    </div>
  )
}

export default ProductCard

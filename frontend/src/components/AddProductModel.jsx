import React, { useEffect, useState } from 'react'
import { useSelector  , useDispatch} from 'react-redux'
import { setOpenModel } from '../slices/modelSlice'
import { addProduct  , fetchProducts} from "../slices/productSlice"
import toast from 'react-hot-toast'
const AddProductModel = () => {
    
    let [formdata , setFormData] = useState({
        name:"",
        image:"",
        price:""
    })

    const handleSubmit = async () => {
        let res = await dispatch(addProduct(formdata)).unwrap()
        toast.success(res.message)
        dispatch(fetchProducts())
        dispatch(setOpenModel(false))
    }
    const closeModel = () => {
        setFormData({
            name:"",
            image:"",
            price:""
        })
        dispatch(setOpenModel(false))
    }
    let {model } = useSelector(data => data)
    const dispatch = useDispatch()

    useEffect(()=> {
        model.isopendmodal && document.getElementById('updateproductmodel').showModal()
    } , [model.isopendmodal])

  return (
    
    <div>

        <dialog id="updateproductmodel" className="modal">
                <div className="modal-box">
                    
                        <form method="dialog">
                        <div>
                                        <label htmlFor="name" className="block text-sm/6 font-medium text-gray-900">
                                            Name
                                        </label>

                                        <div className="flex mt-2 items-center rounded-md bg-white pl-3 outline outline-1 -outline-offset-1 outline-gray-300 has-[input:focus-within]:outline has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-indigo-600">
                                    
                                                <input
                                                    id="name"
                                                    name="name"
                                                    type="text"
                                                    placeholder="name"
                                                    value={formdata.name}
                                                    className="block min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6"
                                                    onChange={(event) => setFormData({
                                                        ...formdata,name:event.target.value
                                                    })}
                                                />
                                        </div>
                                
                                </div>

                                <div>
                                        <label htmlFor="image" className="block text-sm/6 font-medium text-gray-900">
                                            Image
                                        </label>

                                        <div className="flex mt-2 items-center rounded-md bg-white pl-3 outline outline-1 -outline-offset-1 outline-gray-300 has-[input:focus-within]:outline has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-indigo-600">
                                    
                                                <input
                                                    id="image"
                                                    name="image"
                                                    value={formdata.image}
                                                    type="text"
                                                    placeholder="image url"
                                                    className="block min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6"
                                                    onChange={(event) => setFormData({
                                                        ...formdata,image:event.target.value
                                                    })}
                                                />
                                        </div>
                                
                                </div>

                                <div>
                                        <label htmlFor="price" className="block text-sm/6 font-medium text-gray-900">
                                            Price
                                        </label>

                                        <div className="flex mt-2 items-center rounded-md bg-white pl-3 outline outline-1 -outline-offset-1 outline-gray-300 has-[input:focus-within]:outline has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-indigo-600">
                                    
                                                <input
                                                    id="price"
                                                    name="price"
                                                    value={formdata.price}
                                                    type="text"
                                                    placeholder="0.00"
                                                    className="block min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6"
                                                    onChange={(event) => setFormData({
                                                        ...formdata,price:event.target.value
                                                    })}
                                                />
                                        </div>
                                
                                </div>
                                <div className='modal-action'>
                                   <button className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800" 
                                   onClick={() => handleSubmit()}
                                   >Save</button>
                                    <button className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                                    onClick={() => closeModel()}
                                    >Close</button>
                                </div>

                        </form>

                </div>
        </dialog>
    </div>
   

  )
}

export default AddProductModel

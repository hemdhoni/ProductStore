import express from "express"
import { 
    createProduct , 
    getProducts,
    getProduct,
    updateProduct,
    deleteProduct
 } 
 from "../controllers/productController.js"
const router = express.Router()


router.get("/" , getProducts)
router.post("/createproduct" , createProduct)

router.get("/:id" , getProduct)
router.put("/update/:id" , updateProduct)
router.delete("/delete/:id" , deleteProduct)

export default router
import { sql } from "../config/db.js"

//getProducts
export const getProducts = async (req,res) => {
    try {
       let data =  await sql`SELECT * FROM products ORDER BY created_at DESC`

        res.status(200).json({
            data:data,
            message:"getting all products successfully !"
        })
    } catch (error) {
        res.status(500).json({
            data:{},
            message:`error while getting all products:${error.message}`
        })
    }
}


//createProduct
export const createProduct = async (req,res) => {
    try {   
        console.log("req.body in create Product ===" , req.body)
          let {name , image, price } = req.body
          price = parseInt(price)
          await sql`
            INSERT INTO products (name , image , price)
            VALUES (${name} , ${image} , ${price})
          `
         res.status(200).json({
             status:true,
             data:{},
             message:"Product created successfully !"
         })
     } catch (error) {
         res.status(500).json({
             status:false,
             data:{},
             message:`error creating product :${error.message}`
         })
     }
}

//getProduct
export const getProduct = async (req,res) => {

    try {
        let data =  await sql`SELECT * FROM products WHERE id=${req.params.id}`
 
         res.status(200).json({
            status:true,
             data:data,
             message:"getting  product successfully !"
         })
     } catch (error) {
         res.status(500).json({
             status:false,
             data:{},
             message:`error while getting  product:${error.message}`
         })
     }

}

//update product
export const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const {image , name , price } = req.body
        let data =  await sql`SELECT * FROM products WHERE id=${id}`
        if(data){
            let updateObj = data[0]
            if(name){
                updateObj.name = name
            }
            if(price){
                updateObj.price = price
            }
            if(image){
                updateObj.image = image
            }
            await sql`UPDATE products SET name=${updateObj.name} , price=${parseInt(updateObj.price)} , image=${updateObj.image} WHERE id = ${id}`;
            res.status(200).json({
                status: true,
                message: "Product updated successfully!",
            });
        }else{
            res.status(200).json({
                status: false,
                message: "Product Not Found!",
            });
        }

        // Use a parameterized query to avoid SQL injection
       
    } catch (error) {
        console.log("update products 0-----:> " , error.message)
        res.status(200).json({
            status: false,
            message: `Error updating product: ${error.message}`,
        });
    }
};





// delete product
export const deleteProduct = async (req,res) => {

    try {
        let data =  await sql`DELETE  FROM products WHERE id=${req.params.id} RETURNING *`
        
         if(data.length == 0){
            return res.status(400).json({
                success:false,
                message:"Product not found"
            })
         }
         res.status(200).json({
             data:{},
             status:true,
             message:"DELETE  product successfully !"
         })
     } catch (error) {
        console.log("error      " ,  error.message)
         res.status(200).json({
             data:{},
             status:false,
             message:`error while DELETE  product:${error.message}`
         })
     }

}



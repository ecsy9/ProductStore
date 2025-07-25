import { sql } from "../config/db.js";

export const getAllProducts = async (req,res) => {
    try {
        const products = await sql`
        SELECT * FROM products
        ORDER BY created_at DESC
        `;

        console.log("Fetched products:", products);
        res.status(200).json({ success: true, data: products });
    } catch (error) {
        console.log("Error getProducts:", error);
        res.status(500).json({ success: false, message: "Server error while fetching" });
    }
};


export const createProduct = async (req,res) => {
    const {name,price,image,description} = req.body;

    if (!name || !price || !image || !description) {
        return res.status(400).json({ success: false, message: "Please provide all required fields." });
    }

    try {
        const newProduct = await sql`
        INSERT INTO products (name, price, image, description)
        VALUES (${name}, ${price}, ${image}, ${description})
        RETURNING *`;

        console.log("Created product:", newProduct);
        res.status(201).json({ success: true, data: newProduct[0] });
    } catch (error) {
        console.log("Error createProduct:", error);
        res.status(500).json({ success: false, message: "Server error while creating product" });
    }

};

export const getProduct = async (req,res) => {
    const { id } = req.params;

    try {
        const product = await sql`
        SELECT * FROM products WHERE id = ${id}`;

        if (product.length === 0) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        console.log("Fetched product:", product[0]);
        res.status(200).json({ success: true, data: product[0] });
    } catch (error) {
        console.log("Error getProduct:", error);
        res.status(500).json({ success: false, message: "Server error while fetching product" });
    } 
};

export const updateProduct = async (req,res) => {
    const { id } = req.params;
    const { name, price, image, description } = req.body;

    try {
        const updatedProduct = await sql`
        UPDATE products
        SET name = ${name}, price = ${price}, image = ${image}, description = ${description}
        WHERE id = ${id}
        RETURNING *`;

        if (updatedProduct.length === 0) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        console.log("Updated product:", updatedProduct[0]);
        res.status(200).json({ success: true, data: updatedProduct[0] });
    } catch (error) {
        console.log("Error updateProduct:", error);
        res.status(500).json({ success: false, message: "Server error while updating product" });
    }
};

export const deleteProduct = async (req,res) => {
    const { id } = req.params;

    try {
        const deletedProduct = await sql`
        DELETE FROM products WHERE id = ${id}
        RETURNING *`;

        if (deletedProduct.length === 0) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        console.log("Deleted product:", deletedProduct[0]);
        res.status(200).json({ success: true, data: deletedProduct[0] });
    } catch (error) {
        console.log("Error deleteProduct:", error);
        res.status(500).json({ success: false, message: "Server error while deleting product" });
    }
};

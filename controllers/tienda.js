import { pool } from "../database/mysql.js";

export const insertProduct = async (req, res) => {
    try {
        const {
            title, description, category, price, discountPercentage, rating, stock,
            brand, sku, weight, dimensions_width, dimensions_height, dimensions_depth,
            warrantyInformation, shippingInformation, availabilityStatus, returnPolicy,
            minimumOrderQuantity, createdAt, updatedAt, barcode, qrCode, thumbnail
        } = req.body;

     
        const createdAtFormatted = createdAt ? new Date(createdAt).toISOString().slice(0, 19).replace('T', ' ') : null;
        const updatedAtFormatted = updatedAt ? new Date(updatedAt).toISOString().slice(0, 19).replace('T', ' ') : null;

        const [result] = await pool.query(
            `INSERT INTO Product (
                title, description, category, price, discountPercentage, rating, stock, 
                brand, sku, weight, dimensions_width, dimensions_height, dimensions_depth, 
                warrantyInformation, shippingInformation, availabilityStatus, returnPolicy, 
                minimumOrderQuantity, createdAt, updatedAt, barcode, qrCode, thumbnail
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                title, description, category, price, discountPercentage, rating, stock,
                brand, sku, weight, dimensions_width, dimensions_height, dimensions_depth,
                warrantyInformation, shippingInformation, availabilityStatus, returnPolicy,
                minimumOrderQuantity, createdAtFormatted, updatedAtFormatted, barcode, qrCode, thumbnail
            ]
        );

        res.status(201).json({ message: "Product inserted successfully", productId: result.insertId });
    } catch (error) {
        console.error("Error inserting product:", error);
        res.status(500).json({ error: "Error inserting product" });
    }
};



export const getProductDetailsForCard = async (req, res) => {
    try {
        const { productId } = req.params;

  
        const [results] = await pool.query(
            `SELECT
                title AS producto_titulo,
                price AS producto_precio,
                discountPercentage AS producto_descuento,
                rating AS producto_rating,
                thumbnail AS producto_imagen
            FROM
                Product`,
            [productId]
        );

        if (results.length === 0) {
            return res.status(404).json({ message: "Producto no encontrado" });
        }

      
        res.status(200).json({ productDetails: results[0] });
    } catch (error) {
        console.error("Error fetching product details:", error);
        res.status(500).json({ error: "Error al obtener los detalles del producto" });
    }
};

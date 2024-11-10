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

        res.status(201).json({ message: true});
    } catch (error) {
        console.error("Error inserting product:", error);
        res.status(500).json({ message: false });
    }
};




export const getProductsByQuery = async (req, res) => {
    try {
      
        const { q } = req.params;


        if (!q) {
            return res.status(400).json({ message: "Debe proporcionar un término de búsqueda." });
        }

        
        const searchQuery = `%${q}%`;
        console.log("Valor de búsqueda:", searchQuery); 

      
        const [results] = await pool.query(
            `SELECT 
                title AS producto_titulo,
                description AS producto_descripcion,
                category AS producto_categoria,
                price AS producto_precio,
                discountPercentage AS producto_descuento,
                rating AS producto_rating,
                thumbnail AS producto_imagen
            FROM Product
            WHERE title LIKE ? OR description LIKE ? OR category LIKE ?`,
            [searchQuery, searchQuery, searchQuery]
        );

        console.log("Resultados de la búsqueda:", results); // Depuración: imprime los resultados de la búsqueda

        // Si no se encuentran resultados, devuelve un error 404
        if (results.length === 0) {
            return res.status(404).json({ message: "No se encontraron productos." });
        }

        // Si se encuentran productos, devuelve los resultados en formato JSON
        res.status(200).json({ items: results });

    } catch (error) {
        console.error("Error al buscar productos:", error); // Depuración: imprime el error en caso de fallos
        res.status(500).json({ error: "Error al buscar productos." });
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

      
        res.status(200).json({ productDetails: results });
    } catch (error) {
        console.error("Error fetching product details:", error);
        res.status(500).json({ error: "Error al obtener los detalles del producto" });
    }
};



export const getProductDetailsForCardId = async (req, res) => {
    try {
        const { id } = req.params; // Cambiar a 'id'

        const [results] = await pool.query(
            `SELECT
                title AS producto_titulo,
                price AS producto_precio,
                discountPercentage AS producto_descuento,
                rating AS producto_rating,
                thumbnail AS producto_imagen
            FROM
                Product
            WHERE
                id = ?`, // Agrega la cláusula WHERE para filtrar por ID
            [id]
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

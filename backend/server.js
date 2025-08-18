import { createClient } from "@supabase/supabase-js";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
app.use(
    cors({
        origin: "http://localhost:5173",
    })
);

const port = 5000;

const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_ANON_KEY
);

////////////////////////////////////////////// PRODUCTS SECTION
// Gets the list of products
app.get("/getProducts", async (req, res) => {
    const { data, error } = await supabase.from("products").select("*");

    if (error) {
        console.error("Error retrieving products list:", error);
        return res.status(500).json({ error: error.message });
    }

    // TODO: RETRIEVE MEDIA AS WELL AND STORE IN PRODUCTS

    const products = data.map((product) => ({
        id: product.id,
        name: product.name,
        desc: product.description,
        background: product.background,
        includes: product.includes.split(","),
        time: product.time,
        tags: product.tags.split(" "),
        numSold: product.num_sold,
        price: product.price,
    }));

    res.json(products);
});

// Gets a product given the product id
app.get("/getProductById", async (req, res) => {
    const { productId } = req.query;

    const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", productId)
        .single();

    if (error) {
        console.error("Error retreiving product:", error);
        return res.status(500).json({ error: error.message });
    }

    // TODO: RETRIEVE MEDIA AS WELL AND SEND IT BACK

    const product = {
        id: data.id,
        name: data.name,
        desc: data.description,
        background: data.background,
        includes: data.includes.split(","),
        time: data.time,
        tags: data.tags.split(" "),
        numSold: data.num_sold,
        price: data.price,
    };

    res.json(product);
});

// Get the products from the free_kits table
app.get("/getFreeProducts", async (req, res) => {
    const { data, error } = await supabase.from("free_kits").select("*");

    if (error) {
        console.error("Error retrieving free products list:", error);
        return res.status(500).json({ error: error.message });
    }

    // TODO: RETRIEVE MEDIA AS WELL AND STORE IN PRODUCTS

    const products = data.map((product) => ({
        id: product.id,
        name: product.name,
        desc: product.description,
        includes: product.includes.split(","),
        time: product.time,
        tags: product.tags.split(" "),
        numSold: product.num_sold,
        paidProductId: product.paid_product_id,
    }));

    res.json(products);
});

// Gets a free product given the product id
app.get("/getFreeProductById", async (req, res) => {
    const { productId } = req.query;

    const { data, error } = await supabase
        .from("free_kits")
        .select("*")
        .eq("id", productId)
        .single();

    if (error) {
        console.error("Error retreiving product:", error);
        return res.status(500).json({ error: error.message });
    }

    // TODO: RETRIEVE MEDIA AS WELL AND SEND IT BACK

    const product = {
        id: data.id,
        name: data.name,
        desc: data.description,
        includes: data.includes.split(","),
        time: data.time,
        tags: data.tags.split(" "),
        numSold: data.num_sold,
        paidProductId: data.paid_product_id,
    };

    res.json(product);
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

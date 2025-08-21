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
// Expected req: "free", "paid", or "all"
app.get("/getProducts", async (req, res) => {
    const { type } = req.query;

    const { data, error } = await supabase.from("products").select("*");

    if (error) {
        console.error("Error retrieving products list:", error);
        return res.status(500).json({ error: error.message });
    }

    // TODO: RETRIEVE MEDIA AS WELL AND STORE IN PRODUCTS

    let products = data.map((product) => ({
        id: product.id,
        name: product.name,
        desc: product.description,
        background: product.background,
        includes: product.includes.split(","),
        time: product.time,
        tags: product.tags.split(","),
        numSold: product.num_sold,
        price: product.price,
    }));

    // If paid products should be returned
    if (type === "paid") {
        products = products.filter((product) => product.price > 0);

        // If free products should be returned
    } else if (type === "free") {
        products = products.filter((product) => product.price === 0);
    }

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
        tags: data.tags.split(","),
        numSold: data.num_sold,
        price: data.price,
        paidProductId: data.paid_product_id,
    };

    res.json(product);
});

////////////////////////////////////////////// USER SECTION

app.post("/verifyUser", async (req, res) => {
    const { email, password } = req.body;

    const { data, error } = await supabase.from("users").select("*").eq;
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

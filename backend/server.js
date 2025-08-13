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
        includes: product.includes,
        time: product.time,
        tags: product.tags.split(" "),
        numSold: product.num_sold,
    }));

    res.json(products);
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

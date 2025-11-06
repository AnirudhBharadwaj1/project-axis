import { createClient } from "@supabase/supabase-js";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import OpenAI from "openai";

dotenv.config();

const app = express();
app.use(
    cors({
        origin: "http://localhost:5173",
    })
);
app.use(express.json());

const port = 5000;

const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
);

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

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
        genres: product.genres || [],
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
        genres: data.genres || [],
        numSold: data.num_sold,
        price: data.price,
        paidProductId: data.paid_product_id,
    };

    res.json(product);
});

////////////////////////////////////////////// USER SECTION

// Given email and password, this creates a user and stores it in the users table
// Users Table Columns:
// - id (use auth)
// - purchased (init to "")
// - cart (init to "")
app.post("/createUser", async (req, res) => {
    try {
        const { email, password } = req.body;

        // create user with Supabase Auth
        const { data, error } = await supabase.auth.admin.createUser({
            email,
            password,
            email_confirm: true,
        });

        // if (error) return res.status(400).json({ error: error.message });
        if (error) return res.json({ success: false, error: error.message });

        const { error: insertError } = await supabase.from("users").insert([
            {
                id: data.user.id, // same id as auth user
            },
        ]);

        if (insertError) {
            console.error("Insert error:", insertError);
            return res.json({ success: false, error: insertError.message });
        }

        res.json({ success: true, user: data.user });
    } catch (err) {
        console.error(err);
        res.json({ success: false, error: "Internal server error" });
    }
});

// Given email and password, this verifies a user trying to log in
app.post("/verifyUser", async (req, res) => {
    const { email, password } = req.body;

    try {
        // Sign in with Supabase Auth
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            return res.status(401).json({ error: "Invalid email or password" });
        }

        const user = data.user;

        res.status(200).json({
            success: true,
            id: user.id,
        });
    } catch (err) {
        console.error("Unexpected error verifying user:", err);
        res.status(500).json({ error: "Internal server error" });
    }
});

// Handle logging out a user
app.post("/logOut", async (req, res) => {
    try {
        const { error } = await supabase.auth.signOut();

        if (error) {
            console.error("Error signing out:", error);
            return res.status(500).json({ error: error.message });
        }

        res.json({ success: true });
    } catch (err) {
        console.error("Unexpected error during logout:", err);
        res.status(500).json({ error: "Internal server error" });
    }
});

// Given the uid of a user, get their account details
app.get("/getUser", async (req, res) => {
    const { uid } = req.query;

    const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("id", uid)
        .maybeSingle();

    if (error) {
        console.error("Error retreiving user:", error);
        return res.status(500).json({ error: error.message });
    }

    if (!data) return res.status(404).json({ error: "User not found" });

    const user = {
        purchased: data.purchased ? data.purchased.split(",") : [],
        cart: data.cart ? data.cart.split(",") : [],
    };

    res.json(user);
});

////////////////////////////////////////////// AI SECTION
app.post("/api/chat", async (req, res) => {
    try {
        const { message, prevMessage, productInfo } = req.body;

        const prompt = `
        You are an assistant helping a customer with their queries about purchasing a sound pack from an online store.
        They have just asked you the following:
        "${message}"

        ${
            prevMessage
                ? `Before that, you had responded:
        "${prevMessage}"`
                : ""
        }

        Now, you need to decide three things:

        1) What the "action" field should be. For this field, there are three options you can choose from:
        - "redirect": This option is for if the user wishes to be taken to a product's page.
        - "cart": This option is for if the user wishes to add the current product to their cart.
        - "respond": This option is if the user has not indicated the above two and is just asking a question.
        Make your decision on which of these three to choose based on the message history provided earlier.

        2) What the "target" field should be.  
        If the "action" field is "redirect" or "cart", set this field to the **id of the product being discussed** in the conversation.  
        The product information is provided below.  
        If the "action" field is "respond", leave this field as an empty string ("").

        3) What the "response" field should be.  
        Only if the "action" field is set to "respond", add your response to the user's message (provided above) into this field.  
        In any other case, leave this field as an empty string ("").
        When answering the user's message, use the data from the products that will be provided below to answer the questions.

        Here are the products and their associated information:
        ${productInfo}

        Finally, always respond in **valid JSON** with the following fields:
        {
        "action": string,
        "target": string,
        "response": string
        }

        Never include text outside the JSON.
        `;

        const resp = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                {
                    role: "system",
                    content: prompt,
                },
            ],
            response_format: { type: "json_object" },
        });

        const reply = JSON.parse(resp.choices[0].message.content);

        console.log("DEBUG AI REPLY:", reply);

        res.json(reply);
    } catch (err) {
        console.error("Chatbot error:", err);
        res.status(500).json({ error: "Failed to fetch GPT response" });
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

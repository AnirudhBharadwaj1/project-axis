import { supabase } from "./supabaseClient.js";

async function test() {
    const { data, error } = await supabase.from("testing").select("*");
    if (error) console.error(error);
    else console.log(data);
}

test();

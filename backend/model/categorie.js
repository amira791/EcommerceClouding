import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://xesgkalniwhmgijjfcrn.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhlc2drYWxuaXdobWdpampmY3JuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTI2Njc2MTcsImV4cCI6MjAyODI0MzYxN30.xNG-RpuLXsXcNG4laLujuC8oCwq0ZW0OWInqQYP2iik"
const supabase = createClient(supabaseUrl, supabaseKey)

async function getCategories(){
    const { data, error } = await supabase
    .from('categories')
    .select()   
    return  { data, error }
}

export {getCategories}
const BASE_URL = "https://dummyjson.com";

export async function getProducts() {
  try {
    const response = await fetch(`${BASE_URL}/products?limit=194`);
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    const data = await response.json();
    return data.products || [];
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

export async function getProduct(id) {
  try {
    // Check if it's an admin product (ID >= 1000000000)
    const productId = Number(id);
    if (productId >= 1000000000) {
      console.log("Admin product detected (ID >= 1000000000), returning null to use context");
      return null;
    }
    
    console.log(`Fetching product ${id} from API...`);
    const response = await fetch(`${BASE_URL}/products/${id}`);
    
    if (!response.ok) {
      if (response.status === 404) {
        console.log(`Product ${id} not found in API`);
        return null;
      }
      throw new Error(`API error: ${response.status}`);
    }
    
    const data = await response.json();
    console.log("API product data received:", data);
    return data;
  } catch (error) {
    console.error(`Error fetching product ${id}:`, error);
    return null;
  }
}

export async function getProductsByCategory(category) {
  try {
    const response = await fetch(
      `${BASE_URL}/products/category/${category}`
    );
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    const data = await response.json();
    return data.products || [];
  } catch (error) {
    console.error(`Error fetching products for category ${category}:`, error);
    return [];
  }
}

// Helper function to check if product exists in API
export async function productExistsInAPI(id) {
  try {
    // Admin products don't exist in API
    if (Number(id) >= 1000000000) {
      return false;
    }
    const response = await fetch(`${BASE_URL}/products/${id}`);
    return response.ok;
  } catch (error) {
    return false;
  }
}
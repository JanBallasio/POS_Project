const API_BASE_URL = "https://pos-projects.onrender.com/api";

export interface Product {
  id: number;
  name: string;
  barcode?: string;
  price: number;
  quantity: number;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
}

export const productApi = {
  async getAll(): Promise<Product[]> {
    const response = await fetch(`${API_BASE_URL}/products`);

    if (!response.ok) {
      throw new Error(`Failed to fetch products: ${response.status}`);
    }

    // Accept the backend's response shape
    const data = await response.json();
    return data.data || [];
  },

  async getByBarcode(barcode: string): Promise<Product | null> {
    const response = await fetch(`${API_BASE_URL}/products/barcode/${barcode}`);

    if (response.status === 404) {
      return null;
    }

    if (!response.ok) {
      throw new Error(`Failed to fetch product: ${response.status}`);
    }

    const data: ApiResponse<Product> = await response.json();
    return data.data;
  },
};

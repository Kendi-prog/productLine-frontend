import api from "../services/axios";

export const fetchProducts = async () => {
    const response = await api.get('/products');
    return response.data;
}

export const deleteProduct = async (productCode: string) => {
  const response = await api.delete(`/products/${productCode}`);
  return response.data;
};

export const createProduct = async (product: any) => {
  const response = await api.post("/products", product);
  return response.data;
};

export const updateProduct = async (product: any) => {
  const response = await api.put(
    `/products/${product.productCode}`,
    product
  );
  return response.data;
};
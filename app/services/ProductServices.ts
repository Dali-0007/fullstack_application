import apiClient from "../lib/axios";
import { CreateProduct, Product } from "../types/Product";
import { ApiPost } from "../types/ApiPost";

export const getProducts = async (): Promise<Product[]> => {
  const response = await apiClient.get<ApiPost[]>("/posts");

  // we have added  2 second delay to simulate a slow network response for testing purposes

await new Promise((resolve) => setTimeout(resolve, 2000));
  return response.data.slice(0, 5).map((item) => ({
    id: item.id,
    name: item.title,
    category: "General",
    price: item.id * 100,
  }));
};

export const createProduct = async (
  product: CreateProduct
): Promise<Product> => {
  const response = await apiClient.post("/posts", product);

  return {
    id: response.data.id,
    ...product,
  };
};
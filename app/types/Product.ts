export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
}
export interface CreateProduct {
  name: string;
  category: string;
  price: number;
}
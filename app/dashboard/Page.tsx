"use client";

import { useEffect, useState } from "react";
import { Box, Button, Typography } from "@mui/material";

import ProductTable from "../components/products/ProductTable";
import ProductDialog from "../components/products/ProductDialog";
import { CreateProduct, Product } from "../types/Product";
import {
  createProduct,
  getProducts,
} from "../services/ProductServices";

const Dashboard = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getProducts();

        setProducts(data);
      } catch {
        setError("Unable to load products. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleAddProduct = async (product: CreateProduct) => {
    try {
      const newProduct = await createProduct(product);

      setProducts((previousProducts) => [
        ...previousProducts,
        newProduct,
      ]);

      setOpenDialog(false);
    } catch {
      console.error("Unable to create product");
    }
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 3,
        }}
      >
        <Typography variant="h4">
          Product Management
        </Typography>

        <Button
          variant="contained"
          onClick={() => setOpenDialog(true)}
        >
          Add Product
        </Button>
      </Box>

      <ProductTable
        products={products}
        loading={loading}
        error={error}
      />

      <ProductDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        onSubmit={handleAddProduct}
      />
    </Box>
  );
};

export default Dashboard;
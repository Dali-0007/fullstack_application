"use client";

import { useState } from "react";
import {
  Box,
  Button,
  MenuItem,
  TextField,
} from "@mui/material";
import { CreateProduct } from "../../types/Product";

interface ProductFormProps {
  onSubmit: (product: CreateProduct) => void;
  onCancel: () => void;
}

const ProductForm = ({
  onSubmit,
  onCancel,
}: ProductFormProps) => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");

  const handleSubmit = () => {
    onSubmit({
      name,
      category,
      price: Number(price),
    });
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <TextField
        label="Product Name"
        value={name}
        onChange={(event) => setName(event.target.value)}
        fullWidth
      />

      <TextField
        label="Category"
        value={category}
        onChange={(event) => setCategory(event.target.value)}
        select
        fullWidth
      >
        <MenuItem value="Electronics">Electronics</MenuItem>
        <MenuItem value="Accessories">Accessories</MenuItem>
        <MenuItem value="General">General</MenuItem>
      </TextField>

      <TextField
        label="Price"
        type="number"
        value={price}
        onChange={(event) => setPrice(event.target.value)}
        fullWidth
      />

      <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}>
        <Button onClick={onCancel}>
          Cancel
        </Button>

        <Button variant="contained" onClick={handleSubmit}>
          Add Product
        </Button>
      </Box>
    </Box>
  );
};

export default ProductForm;
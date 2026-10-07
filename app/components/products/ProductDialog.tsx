"use client";

import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@mui/material";

import ProductForm from "./ProductForm";
import { CreateProduct } from "../../types/Product";

interface ProductDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (product: CreateProduct) => void;
}

const ProductDialog = ({
  open,
  onClose,
  onSubmit,
}: ProductDialogProps) => {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Add Product</DialogTitle>

      <DialogContent>
        <ProductForm
          onSubmit={onSubmit}
          onCancel={onClose}
        />
      </DialogContent>
    </Dialog>
  );
};

export default ProductDialog;
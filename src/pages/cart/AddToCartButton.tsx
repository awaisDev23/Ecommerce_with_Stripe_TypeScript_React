// import React from "react";
// import { useNavigate } from "react-router-dom";
// import Button from "@mui/material/Button";
// import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

// function AddToCartButton({ product, onAddToCart }) {
//   const navigate = useNavigate();

//   const handleCartClick = () => {
//     onAddToCart(product);
//     navigate("/cart");
//   };

//   return (
//     <Button onClick={handleCartClick}>
//       Cart
//       <ShoppingCartIcon sx={{ margin: "10px" }} />
//     </Button>
//   );
// }

// export default AddToCartButton;
import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Product } from "../../types/types";
// interface Product {
//   // Define your product type here
// }

interface AddToCartButtonProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

const AddToCartButton: React.FC<AddToCartButtonProps> = ({
  product,
  onAddToCart,
}) => {
  const navigate = useNavigate();

  const handleCartClick = () => {
    onAddToCart(product);
    navigate("/cart");
  };

  return (
    <Button onClick={handleCartClick}>
      Cart
      <ShoppingCartIcon sx={{ margin: "10px" }} />
    </Button>
  );
};

export default AddToCartButton;

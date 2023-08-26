import React, { FC, useState } from "react";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import "./CartPage.css";
import CheckOutForm from "../../components/payment/CheckOutForm";
import { CartItem, Product } from "../../types/types"; // Import your types/interfaces

interface CartPageProps {
  cart: CartItem[];
  products: Product[];
  selectedProduct: Product | null;
}

const CartPage: FC<CartPageProps> = ({ cart, products, selectedProduct }) => {
  const [openPayment, setOpenPayment] = useState<boolean>(false);

  return (
    <div className="cart_content">
      <Typography variant="h4">Products</Typography>
      {cart?.map((cartItem) => (
        <div className="cart_items" key={cartItem?.id}>
          <Typography>{cartItem?.title}</Typography>
          <Typography>{cartItem?.description}</Typography>
          <Typography>${cartItem?.price}</Typography>
          <img
            className="selectedproduct_image"
            src={cartItem?.thumbnail}
            alt={cartItem?.title}
          />
          <Button
            sx={{
              margin: "15px",
              backgroundColor: "black",
              color: "white",
              "&:hover": {
                backgroundColor: "black",
              },
            }}
            onClick={() => setOpenPayment(true)}
          >
            Total Price: ${cartItem?.price}
          </Button>
        </div>
      ))}

      {openPayment && (
        <CheckOutForm
          products={products}
          selectedProduct={selectedProduct}
          open={openPayment}
          handleClose={() => setOpenPayment(false)}
          cartItems={cart}
        />
      )}
    </div>
  );
};

export default CartPage;

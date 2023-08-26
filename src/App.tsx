import React from "react";
import { Route, Routes } from "react-router-dom";
import SearchAppBar from "./components/searchItem/SearchAppBar";
import MainCard from "./pages/Home/MainCard";
import CartPage from "./pages/cart/CartPage";
import { useState } from "react";
import PaymentSuccessful from "./components/payment/PaymentSuccessful";
import { Product, CartItem } from "./types/types";

// interface AppProps {}

const App = () => {
  const [search, setSearch] = useState<string>("");
  const [products, setProducts] = useState<Product[]>([]); // Define Product type
  const [open, setOpen] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);

  return (
    <div className="App">
      <SearchAppBar
        setOpen={setOpen}
        cart={cart}
        setSearch={setSearch}
        search={search}
      />
      <Routes>
        <Route
          path="/"
          element={
            <MainCard
              search={search}
              products={products}
              setProducts={setProducts}
              selectedProduct={selectedProduct}
              open={open}
              setOpen={setOpen}
              setSelectedProduct={setSelectedProduct}
              setSearch={setSearch}
              cart={cart}
              setCart={setCart}
            />
          }
        />
        <Route
          path="/cart"
          element={
            <CartPage
              cart={cart}
              selectedProduct={selectedProduct}
              products={products}
            />
          }
        />
        <Route path="/paymentdone" element={<PaymentSuccessful />} />
      </Routes>
    </div>
  );
};

export default App;

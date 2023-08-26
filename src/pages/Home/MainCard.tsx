import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  Modal,
  Button,
  CardMedia,
} from "@mui/material";
import axios from "axios";
import AddToCartButton from "../cart/AddToCartButton";
import SliderRange from "../../components/priceSlider/SliderRange";
import "./MainCard.css";
import PaginationRounded from "../../components/pagination/PaginationRounded";
import Categories from "../../components/categories/Categories";
import { Product, CartItem } from "../../types/types"; // Import types/interfaces

interface MainCardProps {
  search: string;
  setSearch: (search: string) => void;
  products: Product[];
  setProducts: (products: Product[]) => void;
  open: boolean;
  setOpen: (open: boolean) => void;
  selectedProduct: Product | null;
  setSelectedProduct: (product: Product | null) => void;
  cart: CartItem[];
  setCart: (cart: CartItem[]) => void;
}

const MainCard: React.FC<MainCardProps> = ({
  search,
  products,
  setProducts,
  open,
  setOpen,
  selectedProduct,
  setSelectedProduct,
  cart,
  setCart,
}) => {
  const [page, setPage] = useState<number>(1);
  const [maxPrice, setMaxPrice] = useState<number | null>(null);

  console.log("Max_Price", maxPrice);

  useEffect(() => {
    axios
      .get(`https://dummyjson.com/products?limit=10&skip=${(page - 1) * 10}`)
      .then((response) => {
        setProducts(response?.data?.products);
      });
  }, [page]);

  const handleOpen = (product: Product) => {
    setSelectedProduct(product);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedProduct(null);
  };

  const addToCart = (product: Product) => {
    setCart([...cart, product]);
    handleClose();
  };

  const handlePagination = (e: React.ChangeEvent<unknown>, p: number) => {
    setPage(p);
  };

  return (
    <div className="card_row">
      <div>
        <SliderRange maxPrice={maxPrice} setMaxPrice={setMaxPrice} />
      </div>
      <div className="card_margin">
        {products
          ?.filter((item) => {
            if (search === "") {
              return item;
            } else if (
              item?.title?.toLowerCase().includes(search?.toLowerCase())
            ) {
              return item;
            } else {
              return null;
            }
          })
          .filter((item) => {
            if (maxPrice === null) {
              return item;
            } else if (item?.price && item.price <= maxPrice) {
              return item;
            } else {
              return null;
            }
          })
          .map((item) => (
            <Card
              className="card"
              key={item?.id}
              onClick={() => handleOpen(item)}
            >
              <CardContent className="card_content">
                <Typography
                  variant="h6"
                  component="h6"
                  sx={{
                    fontSize: "20px",
                    padding: "4px",
                  }}
                >
                  {item?.title}
                </Typography>
                <Typography variant="body2">Price {item?.price}</Typography>
                <Typography>Rating {item?.rating}</Typography>
                <CardMedia
                  component="img"
                  src={item?.images[1]}
                  sx={{
                    objectFit: "contain",
                    width: "300px",
                    height: "350px",
                  }}
                />
              </CardContent>
            </Card>
          ))}
        <Modal
          className="product_modal"
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
        >
          <div className="modal-content">
            {selectedProduct && (
              <>
                <h2 id="modal-title">{selectedProduct?.title}</h2>
                <p id="modal-description">
                  {selectedProduct?.description?.substr(0, 50)}
                </p>
                <img
                  className="selectedproduct_image"
                  src={selectedProduct?.thumbnail}
                  alt={selectedProduct?.title}
                />
                <AddToCartButton
                  product={selectedProduct}
                  onAddToCart={addToCart}
                />
                <Button variant="contained" onClick={handleClose}>
                  Close
                </Button>
              </>
            )}
          </div>
        </Modal>
      </div>
      <div className="footer">
        <PaginationRounded
          onChange={handlePagination}
          page={page}
          totalPages={Math.ceil(products?.length / 1)}
        />
        <div>
          <Categories products={products} setProducts={setProducts} />
        </div>
      </div>
    </div>
  );
};

export default MainCard;

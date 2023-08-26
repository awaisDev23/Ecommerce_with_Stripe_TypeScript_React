import React, { useEffect, useState, FC } from "react";
import axios from "axios";
import { Button } from "@mui/material";
import "./Categories.css";
import { Product } from "../../types/types";

interface CategoriesProps {
  products: Product[];
  setProducts: (products: Product[]) => void;
}

interface ChildCategoryProps {
  category: string;
}

const Categories: FC<CategoriesProps> = ({ setProducts }) => {
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    axios.get(`https://dummyjson.com/products/categories`).then((response) => {
      setCategories(response?.data);
      console.log(response?.data);
    });
  }, []);

  const handleGetCategory = ({ category }: ChildCategoryProps) => {
    axios
      .get(`https://dummyjson.com/products/category/${category}`)
      .then((response) => {
        setProducts(response?.data?.products);
      });
    setSelectedCategory(category);
  };

  return (
    <div className="button_div">
      {categories?.map((category) => (
        <Button
          sx={{
            backgroundColor: "rgb(30,100,135)",
            color: "white",
            margin: "10px",
            "&:hover": {
              backgroundColor: "rgb(30,100,135)",
            },
          }}
          className="category_button"
          onClick={() => handleGetCategory({ category })}
          key={category}
          variant={selectedCategory === category ? "contained" : "outlined"}
        >
          {category}
        </Button>
      ))}
    </div>
  );
};

export default Categories;

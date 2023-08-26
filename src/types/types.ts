interface Product {
  title: string;
  price: number;
  id: number;
  rating: number;
  images: string;
  description: string;
  thumbnail: string;
}
interface CartItem {
  id: number;
  title: string;
  price: number;
  description: string;
  images: string;
  thumbnail: string;
  rating: number;
}

export { Product, CartItem };

import { Product } from "../types/product.type";

const productDefault: Product = {
  id: "2",
  name: "Sản phẩm B",
  price: 200,
  rating: 4.3,
  images: ["/images/spx2-4.png"],
  category: {
    lv0: "Category1",
    lv1: "Category3",
  },
  color: "Red",
  description: "Description of Product B",
  commonName: "Common Name B",
  scientificName: "Scientific Name B",
  plantFamily: "Plant Family B",
  height: "50cm",
  origin: "Vietnam",
  describe: "Detailed description of Product B",
  sales: 15,
  discount: 10,
  comments: [],
};

export {
  productDefault
}

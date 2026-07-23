import { useContext, useEffect, useState } from "react";
import { ProductContext } from "../../context/ProductContext";
import ProductSlider from "../ProductSlider/ProductSlider";

function CategorySlider({ title, category }) {
  const [products, setProducts] = useState([]);
  const { products: allProducts } = useContext(ProductContext);

  useEffect(() => {
    // Filter products from context by category
    const filtered = allProducts.filter(
      (product) => product.category === category
    );
    setProducts(filtered);
  }, [category, allProducts]);

  if (products.length === 0) {
    return null;
  }

  return (
    <ProductSlider
      title={title}
      products={products}
    />
  );
}

export default CategorySlider;
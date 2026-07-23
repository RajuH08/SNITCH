import { createProduct, getSellerProduct } from "../services/product.api";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { setSellerProducts } from "../state/product.slice";

export const useProduct = () => {
  const dispatch = useDispatch();

  const handelCreateProduct = useCallback(async (formData) => {
    const data = await createProduct(formData);
    return data.products;
  }, []);

  const handelGetSellerProduct = useCallback(async () => {
    const data = await getSellerProduct();
    dispatch(setSellerProducts(data.products));
    return data.products;
  }, [dispatch]);

  return {
    handelCreateProduct,
    handelGetSellerProduct,
  };
};

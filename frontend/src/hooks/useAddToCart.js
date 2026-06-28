import { useToast } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, getCartData } from "../redux/CartReducer/action";

/**
 * Centralised "add to cart" handler used across product cards and pages.
 * Preserves the exact payload shape expected by the backend.
 */
export const useAddToCart = () => {
  const dispatch = useDispatch();
  const toast = useToast();
  const { isLoggedIn } = useSelector((s) => s.authReducer);

  return (item) => {
    if (!isLoggedIn) {
      toast({
        title: "Please log in first",
        description: "Sign in to add products to your cart.",
        status: "warning",
        duration: 4000,
        isClosable: true,
      });
      return Promise.resolve("not-logged-in");
    }

    const payload = {
      image: item.image,
      title: item.title,
      description: item.description,
      price: item.price,
      originalPrice: item.originalPrice,
      sizes: item.sizes,
      category: item.category,
      rating: item.rating,
      review: item.review,
      flavour: item.flavour,
      brand: item.brand,
      tags: item.tags,
      stock: item.stock,
      adminId: item.adminId,
      pid: item._id,
      userId: item.userId,
      quantity: 1,
    };

    return dispatch(addToCart(payload)).then((res) => {
      if (res === "Item Already exist in the Cart") {
        toast({
          title: "Already in your cart",
          description: "This item is already in your cart.",
          status: "info",
          duration: 4000,
          isClosable: true,
        });
      } else {
        toast({
          title: "Added to cart",
          description: `${item.title} was added to your cart.`,
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        dispatch(getCartData);
      }
      return res;
    });
  };
};

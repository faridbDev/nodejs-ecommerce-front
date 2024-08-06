import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "../slices/users/usersSlice";
import productReducer from "../slices/products/productSlices";
import categoryReducer from "../slices/categories/categoriesSlice";
import brandReducer from "../slices/categories/brandsSlice";
import colorReducer from "../slices/categories/colorsSlice";
import cartReducer from "../slices/carts/cartSlices";
import couponReducer from "../slices/coupons/couponsSlice";
import orderReducer from "../slices/orders/orderSlices";
import reviewReducer from "../slices/reviews/reviewsSlice";

// store
const store = configureStore({
  reducer: {
    users: usersReducer,
    products: productReducer,
    categories: categoryReducer,
    brands: brandReducer,
    colors: colorReducer,
    carts: cartReducer,
    coupons: couponReducer,
    orders: orderReducer,
    reviews: reviewReducer
  }
});

export default store;
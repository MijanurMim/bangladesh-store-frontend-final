import axios from "axios";
import baseURL from "../../baseURL";
import {
  ALL_PRODUCT_FAIL,
  ALL_PRODUCT_REQUEST,
  ALL_PRODUCT_SUCCESS,
  CLEAR_ERRORS,
  DELETE_PRODUCT_FAIL,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  NEW_PRODUCT_FAIL,
  NEW_PRODUCT_REQUEST,
  NEW_PRODUCT_SUCCESS,
  NEW_REVIEW_FAIL,
  NEW_REVIEW_REQUEST,
  NEW_REVIEW_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  UPDATE_PRODUCT_FAIL,
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_SUCCESS,
} from "../constants/productConstants.js";

// Get All Product from server
export const getProduct =
  (keyword = "", currentPage = 1, category) =>
  async (dispatch) => {
    try {
      dispatch({ type: ALL_PRODUCT_REQUEST });

      let link = `${baseURL}/products?keyword=${keyword}&page=${currentPage}`;
      if (category) {
        link = `${baseURL}/products?keyword=${keyword}&page=${currentPage}&category=${category}`;
      }

      const { data } = await axios.get(link);

      // const { data } = await axios.get(
      //   `${baseURL}/products?keyword=${keyword}&page=${currentPage}&category=${category}`,
      //   {},
      //   {
      //     headers: {
      //       "Content-type": "application/json",
      //     },
      //   }
      // );

      dispatch({ type: ALL_PRODUCT_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: ALL_PRODUCT_FAIL,
        payload: error.response.data.message,
      });
    }
  };

// Get All Products for ADMIN
// export const getAdminProduct =
//   (keyword = "", currentPage = 1, category) =>
//   async (dispatch) => {
//     try {
//       dispatch({ type: ADMIN_PRODUCT_REQUEST });

//       let link = `${baseURL}/api/v1/admin/products?keyword=${keyword}&page=${currentPage}`;
//       if (category) {
//         link = `${baseURL}/api/v1/admin/products?keyword=${keyword}&page=${currentPage}&category=${category}`;
//       }

//       const { data } = await axios.get(link);

//       dispatch({ type: ADMIN_PRODUCT_SUCCESS, payload: data });
//     } catch (error) {
//       dispatch({
//         type: ADMIN_PRODUCT_FAIL,
//         payload: error.response.data.message,
//       });
//     }
//   };

// Create NEW product
export const createProduct = (productData, authtoken) => async (dispatch) => {
  try {
    dispatch({ type: NEW_PRODUCT_REQUEST });

    // const config = {
    //   headers: { "Content-type": "application/json" },
    // };

    // const { data } = await axios.post(
    //   `/api/v1/admin/product/new`,
    //   productData,
    //   config
    // );

    const { data } = await axios.post(
      `${baseURL}/admin/product/new`,
      productData,
      {
        headers: {
          "Content-type": "application/json",
          authtoken,
        },
      }
    );

    dispatch({
      type: NEW_PRODUCT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: NEW_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Delete A product
export const deleteProduct = (id, authtoken) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_PRODUCT_REQUEST });

    // const { data } = await axios.delete(`/api/v1/admin/product/${id}`);

    // const config = {
    //   headers: { "Content-type": "application/json" },
    // };

    const { data } = await axios.delete(
      `${baseURL}/admin/product/${id}`,

      {
        headers: {
          "Content-type": "application/json",
          authtoken,
        },
      }
    );

    dispatch({
      type: DELETE_PRODUCT_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Get Single Product Details
export const getProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST });

    const { data } = await axios.get(`${baseURL}/product/${id}`);

    dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data.product });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// NEW REVIEW
export const newReview = (reviewData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_REVIEW_REQUEST });

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.put(`${baseURL}/review`, reviewData, config);

    dispatch({ type: NEW_REVIEW_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: NEW_REVIEW_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Updating Existing product
export const updateProduct =
  (id, productData, authtoken) => async (dispatch) => {
    try {
      dispatch({ type: UPDATE_PRODUCT_REQUEST });

      const config = {
        headers: { "Content-type": "application/json" },
      };

      const { data } = await axios.put(
        `${baseURL}/admin/product/${id}`,
        productData,
        {
          headers: {
            "Content-type": "application/json",
            authtoken,
          },
        }
      );

      // const { data } = await axios.put(
      //   `/api/v1/admin/product/${id}`,
      //   productData,
      //   config
      // );

      dispatch({
        type: UPDATE_PRODUCT_SUCCESS,
        payload: data.success,
      });
    } catch (error) {
      dispatch({
        type: UPDATE_PRODUCT_FAIL,
        payload: error.response.data.message,
      });
    }
  };

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};

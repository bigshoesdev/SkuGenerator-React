
import {
  ALL_PRODUCT, CREATE_KEYWORD,CREATE_PRODUCT,DELETE_PRODUCT,LIST_ALL_PRODUCT_INFO,PRODUCT_DETAIL,
  LIST_ARTIST, LIST_STICKER_TYPE, LIST_PRINT_MODE,
  LIST_PRICE_TSHIRTS,
  LIST_PRICE_STICKERS,
  LIST_PRICE_MUGS,
  LIST_PRICE_TOTEBAGS,
  LIST_PRICE_CUSHION_COVERS,
  LIST_PRICE_HOODIES,
  LIST_PRICE_KIDS,
  LIST_PRODUCT_IMAGESET,
  UPDATE_PRODUCT_IMAGESET,
  CLEAN_PRODUCT
} from './types';

import http from '../../helper/http';
import APP_CONST from '../../helper/constant';
import { errorHandler } from "../../helper/util";

export function createProduct(obj) {
  return dispatch => (
    new Promise((resolve, reject) => {
      dispatch({type: CLEAN_PRODUCT});
      http.post(`${APP_CONST.API_URL}/product/create`, obj)
        .then((res) => {
          dispatch({ 
            type: CREATE_PRODUCT, 
            payload: res.data.data,
            message:"The Product is created successfully!"  
          });
          return resolve();
        })
        .catch((err) => {
          if (err.response) {
            const { status, errors } = err.response.data;
            return reject({ status, errors });
          } else {
            return reject({ status: 404, errors: ['There is a network connection error.'] });
          }
        });
    })
  );
}
export function productDetail(id){
  return function (dispatch) {
    dispatch({type: CLEAN_PRODUCT});
    http
      .post(`${APP_CONST.API_URL}/product/detail`, id)
      .then((response) => {
        dispatch({
          type: PRODUCT_DETAIL,
          message: "Detail"
        });
      })
      .catch(err => {
        if (err.response) {
          let { errors } = err.response.data;
          dispatch({ type: PRODUCT_DETAIL, errors: errorHandler(errors) });
        } else {
          dispatch({
            type: PRODUCT_DETAIL,
            errors: "There is a server connection Error, Try Later."
          });
        }
      });
  };
}
export function allProductInfo(){
  return function (dispatch) {
    dispatch({type: CLEAN_PRODUCT});
    http
      .post(`${APP_CONST.API_URL}/product/allProductInfo`)
      .then((response) => {
        console.log(response);
        dispatch({
          type: LIST_ALL_PRODUCT_INFO,
          all_product: response.data.data
        });
      })
      .catch(err => {
        if (err.response) {
          let { errors } = err.response.data;
          dispatch({ type: LIST_ALL_PRODUCT_INFO, errors: errorHandler(errors) });
        } else {
          dispatch({
            type: LIST_ALL_PRODUCT_INFO,
            errors: "There is a server connection Error, Try Later."
          });
        }
      });
  };
}
export function productDelete(obj){
  return function (dispatch) {
    dispatch({type: CLEAN_PRODUCT});
    http
      .post(`${APP_CONST.API_URL}/product/deleteProduct`, obj)
      .then((response) => {
        dispatch({
          type: DELETE_PRODUCT,
          message: "The product is deleted successfully!"
        });
      })
      .catch(err => {
        if (err.response) {
          let { errors } = err.response.data;
          dispatch({ type: DELETE_PRODUCT, errors: errorHandler(errors) });
        } else {
          dispatch({
            type: DELETE_PRODUCT,
            errors: "There is a server connection Error, Try Later."
          });
        }
      });
  };
}

export function artistList() {
  return function (dispatch) {
    http
      .post(`${APP_CONST.API_URL}/product/artist`)
      .then((response) => {
        dispatch({
          type: LIST_ARTIST,
          artistList: response.data.data
        });
      })
      .catch(err => {
        if (err.response) {
          let { errors } = err.response.data;
          dispatch({ type: LIST_ARTIST, errors: errorHandler(errors) });
        } else {
          dispatch({
            type: LIST_ARTIST,
            errors: "There is a server connection Error, Try Later."
          });
        }
      });
  };
}

export function stickertypeList() {
  return function (dispatch) {
    http
      .post(`${APP_CONST.API_URL}/product/stickertype`)
      .then((response) => {
        dispatch({
          type: LIST_STICKER_TYPE,
          stickertypeList: response.data.data
        });
      })
      .catch(err => {
        if (err.response) {
          let { errors } = err.response.data;
          dispatch({ type: LIST_STICKER_TYPE, errors: errorHandler(errors) });
        } else {
          dispatch({
            type: LIST_STICKER_TYPE,
            errors: "There is a server connection Error, Try Later."
          });
        }
      });
  };
}

export function printmodeList() {
  return function (dispatch) {
    http
      .post(`${APP_CONST.API_URL}/product/printmode`)
      .then((response) => {
        dispatch({
          type: LIST_PRINT_MODE,
          printmodeList: response.data.data
        });
      })
      .catch(err => {
        if (err.response) {
          let { errors } = err.response.data;
          dispatch({ type: LIST_PRINT_MODE, errors: errorHandler(errors) });
        } else {
          dispatch({
            type: LIST_PRINT_MODE,
            errors: "There is a server connection Error, Try Later."
          });
        }
      });
  };
}

export function productImageSetList(){
  return function (dispatch){
    http
      .get(`${APP_CONST.API_URL}/product/imagesets`)
      .then((response) => {
        dispatch({
          type: LIST_PRODUCT_IMAGESET,
          imageSets: response.data.data
        });
      })
      .catch(err => {
        if (err.response) {
          let { errors } = err.response.data;
          dispatch({ type: LIST_PRODUCT_IMAGESET, errors: errorHandler(errors) });
        } else {
          dispatch({
            type: LIST_PRODUCT_IMAGESET,
            errors: "There is a server connection Error, Try Later."
          });
        }
      });
  }
}


export function updateProductImageSets(obj) {
  return function (dispatch) {
    http
      .post(`${APP_CONST.API_URL}/product/imagesets/update`, obj)
      .then((response) => {
        dispatch({
          type: UPDATE_PRODUCT_IMAGESET,
          message: "The product image set is updated successfully!",
          imageSet: response.data.data
        });
      })
      .catch(err => {
        if (err.response) {
          let { errors } = err.response.data;
          dispatch({ type: UPDATE_PRODUCT_IMAGESET, errors: errorHandler(errors) });
        } else {
          dispatch({
            type: UPDATE_PRODUCT_IMAGESET,
            errors: "There is a server connection Error, Try Later."
          });
        }
      });
  };
}
import {
  LIST_ALL_PRODUCT_INFO,
  LIST_ARTIST,
  LIST_PRODUCT_IMAGESET,
  UPDATE_PRODUCT_IMAGESET,
  CREATE_PRODUCT,
  DELETE_PRODUCT,
  UPLOAD_PRODUCT_IMAGE,
  CLEAN_PRODUCT,
} from '../actions/types';

const initialState = {
  all_product: [],
  printMode_list: [],
  stickerType_list: [],
  artist_list: [],
  imageSets: [],
  message: '',
  errors: '',
};

export default function (state = initialState, action) {
  switch (action.type) {
    case CLEAN_PRODUCT:
      return { ...state, message: '', errors: '' };
    case LIST_ALL_PRODUCT_INFO:
      return { ...state, all_product: action.all_product };
    case LIST_ARTIST:
      return { ...state, artist_list: action.artistList };
    case LIST_PRODUCT_IMAGESET:
      return { ...state, imageSets: action.imageSets };
    case UPDATE_PRODUCT_IMAGESET:
      return { ...state, imageSets: action.imageSets, message: action.message };
    case CREATE_PRODUCT:
      return { ...state, message: action.message, errors: action.errors };
    case DELETE_PRODUCT:
      return { ...state, message: action.message };
    case UPLOAD_PRODUCT_IMAGE:
      return { ...state, message: action.message };
    default:
      return state;
  }
}

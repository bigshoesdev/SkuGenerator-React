import {
    LIST_ALL_PRODUCT_INFO,
    LIST_ARTIST,
    LIST_PRICE_TSHIRTS,
    LIST_PRICE_STICKERS,
    LIST_PRICE_MUGS,
    LIST_PRICE_TOTEBAGS,
    LIST_PRICE_CUSHION_COVERS,
    LIST_PRICE_HOODIES,
    LIST_PRICE_KIDS,
    LIST_STICKER_TYPE, LIST_PRINT_MODE,
    LIST_PRODUCT_IMAGESET,
    UPDATE_PRODUCT_IMAGESET,
    CREATE_PRODUCT,
    DELETE_PRODUCT,
    CLEAN_PRODUCT
} from '../actions/types';

const initialState = {
    all_product: [],
    printMode_list: [],
    stickerType_list: [],
    artist_list: [],
    imageSets: [],
    message: '',
    errors: ""
};

export default function (state = initialState, action) {
    switch (action.type) {
        case CLEAN_PRODUCT:
            return {...state,message: ""}
        case LIST_ALL_PRODUCT_INFO:
            return { ...state, all_product: action.all_product }
        case LIST_ARTIST:
            return { ...state, artist_list: action.artistList }
        case LIST_PRODUCT_IMAGESET:
            return { ...state, imageSets: action.imageSets, message: "", errors: "" }
        case UPDATE_PRODUCT_IMAGESET:
            return { ...state, imageSets: action.imageSets, message: action.message, errors: "" }
        case CREATE_PRODUCT:
            return { ...state, message: action.message };
        case DELETE_PRODUCT:
            return { ...state, message: action.message };
        default:
            return state
    }
}
import Login from "views/pages/auth/Login.jsx";
import Register from "views/pages/auth/Register.jsx";
import ProductList from "views/pages/product/ProductList.jsx";
import ProductCreate from "views/pages/product/ProductCreate.jsx";
import ProductDetail from "views/pages/product/ProductDetail.jsx";
import ProductImageSet from "views/pages/product/ProductImageSet.jsx";
import KeywordList from "views/pages/keyword/KeywordList.jsx";
import CategoryList from "views/pages/category/CategoryList.jsx";
import ArtistList from "views/pages/artist/ArtistList.jsx";
import Setting from "views/pages/setting/Setting.jsx";
import TshirtVariant from "views/pages/variant/TshirtVariant.jsx";
import MugsVariant from "views/pages/variant/MugsVariant.jsx";
import ToteBagsVariant from "views/pages/variant/ToteBagsVariant.jsx";
import HoodiesVariant from "views/pages/variant/HoodiesVariant.jsx";
import KidsVariant from "views/pages/variant/KidsVariant.jsx";
import CushionCoverVariant from "views/pages/variant/CushionCoverVariant.jsx";
import ImageVariant from "views/pages/variant/ImageVariant.jsx";
import PriceVariant from "views/pages/variant/PriceVariant.jsx";
import PriceMerchantVariant from "views/pages/variant/PriceMerchantVariant.jsx";
import DescriptionVariant from "./views/pages/variant/DescriptionVariant";
import ApprovedWordList from "./views/pages/trademark/ApprovedWordList";
import BannedWordList from "./views/pages/trademark/BannedWordList";
import TradeMarkCheck from "./views/pages/trademark/TradeMarkCheck";
import TradeMarkClassWordList from "./views/pages/trademark/TradeMarkClassWordList";

export const authRoutes = [
  {
    path: "/login",
    name: "Login",
    component: Login,
    layout: "/auth",
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
    layout: "/auth",
  },
];

export const routes = [
  {
    collapse: true,
    name: "Product",
    icon: "ni ni-shop text-primary",
    state: "productCollapse",
    views: [
      {
        path: "/product-list",
        name: "Product List",
        component: ProductList,
        layout: "/main",
      },
      {
        path: "/product-create",
        name: "Product Create",
        component: ProductCreate,
        layout: "/main",
      },
      {
        path: "/product-imageset",
        name: "Product Image Set",
        component: ProductImageSet,
        layout: "/main",
      },
      {
        path: "/product-detail/:id",
        name: "Product Detail",
        component: ProductDetail,
        layout: "/main",
      },
    ],
  },
  {
    collapse: true,
    name: "Variant",
    icon: "ni ni-single-copy-04 text-primary",
    state: "variantTshirtCollapse",
    views: [
      {
        path: "/variant-tshirt",
        name: "Tshirt Variant",
        component: TshirtVariant,
        layout: "/main",
      },
      {
        path: "/variant-mugs",
        name: "Mugs Variant",
        component: MugsVariant,
        layout: "/main",
      },
      {
        path: "/variant-tote-bags",
        name: "Tote Bags Variant",
        component: ToteBagsVariant,
        layout: "/main",
      },
      {
        path: "/variant-cushion-covers",
        name: "Cushion Cover Variant",
        component: CushionCoverVariant,
        layout: "/main",
      },
      {
        path: "/variant-hoodies",
        name: "Hoodies Variant",
        component: HoodiesVariant,
        layout: "/main",
      },
      {
        path: "/variant-kids",
        name: "Kids Variant",
        component: KidsVariant,
        layout: "/main",
      },
      {
        path: "/variant-images",
        name: "Variant Image",
        component: ImageVariant,
        layout: "/main",
      },
      {
        path: "/variant-prices",
        name: "Variant Price",
        component: PriceVariant,
        layout: "/main",
      },
      {
        path: "/variant-merchant-prices",
        name: "Variant Merchant Price",
        component: PriceMerchantVariant,
        layout: "/main",
      },
      {
        path: "/variant-description",
        name: "Variant Description",
        component: DescriptionVariant,
        layout: "/main",
      },
    ],
  },
  {
    collapse: true,
    name: "Trademark",
    icon: "ni ni-map-big text-primary",
    state: "trademarkCollapse",
    views: [
      {
        path: "/trademark-check",
        name: "Trademark Check",
        component: TradeMarkCheck,
        layout: "/main",
      },
      {
        path: "/trademark-approved",
        name: "Approved Keywords",
        component: ApprovedWordList,
        layout: "/main",
      },
      {
        path: "/trademark-banned",
        name: "Banned Keywords",
        component: BannedWordList,
        layout: "/main",
      },
      {
        path: "/trademark-classword",
        name: "Class Words",
        component: TradeMarkClassWordList,
        layout: "/main",
      },
    ],
  },
  {
    path: "/keyword",
    name: "Keyword",
    icon: "ni ni-archive-2 text-green",
    component: KeywordList,
    layout: "/main",
  },
  {
    path: "/artist",
    name: "Artist",
    icon: "ni ni-hat-3 text-green",
    component: ArtistList,
    layout: "/main",
  },
  {
    path: "/category",
    name: "Category",
    icon: "ni ni-map-big text-green",
    component: CategoryList,
    layout: "/main",
  },
  {
    path: "/setting",
    name: "Setting",
    icon: "ni ni-settings text-green",
    component: Setting,
    layout: "/main",
  },
];

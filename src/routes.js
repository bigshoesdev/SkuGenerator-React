// auth pages
import Login from "views/pages/auth/Login.jsx";
import Register from "views/pages/auth/Register.jsx";
// product pages
import ProductList from "views/pages/product/product-list";
import ProductCreate from "views/pages/product/product-create";
import ProductDetail from "views/pages/product/product-detail";
import ProductImageSet from "views/pages/product/product-image-set";
import ProductStatus from "views/pages/product/product-status";
import ProductImage from "views/pages/product/product-image";
import ProductUpload from "views/pages/product/product-upload";
// stock pages
import StockOnHand from "views/pages/stock/stock-on-hand";
import StockReOrder from "views/pages/stock/stock-reorder";
// variant pages
import TshirtVariant from "views/pages/variant/tshirt-variant";
import MugsVariant from "views/pages/variant/mugs-variant";
import ToteBagsVariant from "views/pages/variant/tote-bags-variant";
import HoodiesVariant from "views/pages/variant/hoodies-variant";
import KidsVariant from "views/pages/variant/kids-variant";
import CushionCoverVariant from "views/pages/variant/cushion-cover-variant";
import ImageVariant from "views/pages/variant/image-variant";
import PriceVariant from "views/pages/variant/price-variant";
import PriceMerchantVariant from "views/pages/variant/price-merchant-variant";
import DescriptionVariant from "./views/pages/variant/description-variant";
// keyword page
import KeywordList from "views/pages/keyword";
// category page
import CategoryList from "views/pages/category";
// artist page
import ArtistList from "views/pages/artist";
// trademark pages
import ApprovedWordList from "./views/pages/trademark/approved-word-list";
import BannedWordList from "./views/pages/trademark/banned-word-list";
import TradeMarkClassWordList from "./views/pages/trademark/trademark-classword-list";
// performance page
import Performance from "./views/pages/performance";
// sales pages
import Customer from "./views/pages/sales/customer";
import OrderReport from "./views/pages/sales/order-report";
// setting pages
import Setting from "views/pages/setting/setting";
import EtsySetting from "views/pages/setting/etsy";

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
      }, {
        path: "/product-create",
        name: "Product Create",
        component: ProductCreate,
        layout: "/main",
      }, {
        path: "/product-imageset",
        name: "Product Image Set",
        component: ProductImageSet,
        layout: "/main",
      }, {
        path: "/product-status",
        name: "Product Status",
        component: ProductStatus,
        layout: "/main",
      }, {
        path: "/product-detail/:id",
        name: "Product Detail",
        component: ProductDetail,
        layout: "/main",
      }, {
        path: "/product-image/:id",
        name: "Product Image",
        component: ProductImage,
        layout: "/main",
      }, {
        path: "/product-upload/:id",
        name: "Product Upload",
        component: ProductUpload,
        layout: "/main",
      },
    ],
  },
  {
    collapse: true,
    name: "Stock",
    icon: "ni ni-collection text-primary",
    state: "stockCollapse",
    views: [
      {
        path: "/stock-on-hand",
        name: "Stock On Hand",
        component: StockOnHand,
        layout: "/main",
      }, {
        path: "/stock-reorder",
        name: "Stock Reorder",
        component: StockReOrder,
        layout: "/main",
      },
    ],
  },
  {
    collapse: true,
    name: "Sales",
    icon: "ni ni-cart text-primary",
    state: "salesCollapse",
    views: [
      {
        path: "/sales/consumer",
        name: "Customer",
        component: Customer,
        layout: "/main",
      }, {
        path: "/sales/order-report",
        name: "Sales Report",
        component: OrderReport,
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
      }, {
        path: "/variant-mugs",
        name: "Mugs Variant",
        component: MugsVariant,
        layout: "/main",
      }, {
        path: "/variant-tote-bags",
        name: "Tote Bags Variant",
        component: ToteBagsVariant,
        layout: "/main",
      }, {
        path: "/variant-cushion-covers",
        name: "Cushion Cover Variant",
        component: CushionCoverVariant,
        layout: "/main",
      }, {
        path: "/variant-hoodies",
        name: "Hoodies Variant",
        component: HoodiesVariant,
        layout: "/main",
      }, {
        path: "/variant-kids",
        name: "Kids Variant",
        component: KidsVariant,
        layout: "/main",
      }, {
        path: "/variant-images",
        name: "Variant Image",
        component: ImageVariant,
        layout: "/main",
      }, {
        path: "/variant-prices",
        name: "Variant Price",
        component: PriceVariant,
        layout: "/main",
      }, {
        path: "/variant-merchant-prices",
        name: "Variant Merchant Price",
        component: PriceMerchantVariant,
        layout: "/main",
      }, {
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
        path: "/trademark-approved",
        name: "Approved Keywords",
        component: ApprovedWordList,
        layout: "/main",
      }, {
        path: "/trademark-banned",
        name: "Banned Keywords",
        component: BannedWordList,
        layout: "/main",
      }, {
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
    icon: "ni ni-archive-2 text-primary",
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
    path: "/performance",
    name: "Performance",
    icon: "ni ni-atom text-green",
    component: Performance,
    state: "performanceCollapse",
    layout: "/main",
  },
  {
    collapse: true,
    name: "Setting",
    icon: "ni ni-settings text-green",
    state: "settingCollapse",
    views: [
      {
        path: "/setting",
        name: "General Setting",
        component: Setting,
        layout: "/main",
      }, {
        path: "/etsy-setting",
        name: "Etsy Setting",
        component: EtsySetting,
        layout: "/main",
      },
    ],
  },
];

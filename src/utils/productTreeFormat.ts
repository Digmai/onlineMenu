import { IProducts } from "../types";

export const productTreeFormat = (products: IProducts) =>
  Object.keys(products).map((category, index) => {
    return {
      title: category,
      key: String(index),
      list: Object.keys(products[category]).map((subcategory, i) => {
        return {
          key: String(i) + " " + String(index),
          title: subcategory,
          list: products[category][subcategory].map((product, i) => {
            return {
              title: product.name,
              key: "0-0-0-" + product._id,
              _id: product._id,
            };
          }),
        };
      }),
    };
  });

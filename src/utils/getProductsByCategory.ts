import { IProduct, IProducts } from "../types";

// export function getProductsByCategory(
//   products: IProducts,
//   categoryOrSubcategory: string
// ): IProducts | { [subcategory: string]: IProduct[] } | undefined {
//   if (!products[categoryOrSubcategory]) {
//     const subcategories = Object.keys(products).flatMap((category) =>
//       Object.keys(products[category])
//     );
//     if (!subcategories.includes(categoryOrSubcategory)) {
//       return undefined;
//     }
//     const filteredProductsBySubcategory: { [subcategory: string]: IProduct[] } =
//       {};
//     Object.entries(products).forEach(([category, subcategoryToProducts]) => {
//       Object.entries(subcategoryToProducts).forEach(
//         ([subcategory, products]) => {
//           if (subcategory === categoryOrSubcategory) {
//             filteredProductsBySubcategory[subcategory] = products;
//           }
//         }
//       );
//     });
//     return filteredProductsBySubcategory;
//   }
//   return {
//     [categoryOrSubcategory]: products[categoryOrSubcategory],
//   };
// }

type CategoryOrSubcategory = string;

type ProductsByCategory = {
  [category: string]: {
    [subcategory: string]: IProduct[];
  };
};

type ProductsBySubcategory = {
  [subcategory: string]: IProduct[];
};

type UnknownProducts = undefined;

export function getProductsByCategory<T = ProductsByCategory>(
  products: IProducts,
  category: CategoryOrSubcategory
): T | UnknownProducts;
export function getProductsByCategory<T = ProductsBySubcategory>(
  products: IProducts,
  subcategory: CategoryOrSubcategory
): T | UnknownProducts;

// HESH

export function getProductsByCategory(
  products: IProducts,
  categoryOrSubcategory: string
): IProducts | { [subcategory: string]: IProduct[] } | undefined {
  const cache = new Map<
    string,
    IProducts | { [subcategory: string]: IProduct[] } | undefined
  >();
  const cacheKey = categoryOrSubcategory;

  if (cache.has(cacheKey)) {
    return cache.get(cacheKey);
  }

  if (!products[categoryOrSubcategory]) {
    const subcategories = Object.keys(products).flatMap((category) =>
      Object.keys(products[category])
    );
    if (!subcategories.includes(categoryOrSubcategory)) {
      return undefined;
    }
    const filteredProductsBySubcategory: { [subcategory: string]: IProduct[] } =
      {};
    Object.entries(products).forEach(([category, subcategoryToProducts]) => {
      Object.entries(subcategoryToProducts).forEach(
        ([subcategory, products]) => {
          if (subcategory === categoryOrSubcategory) {
            filteredProductsBySubcategory[subcategory] = products;
          }
        }
      );
    });
    cache.set(cacheKey, filteredProductsBySubcategory);
    return filteredProductsBySubcategory;
  }

  const filteredProductsByCategory: IProducts = {
    [categoryOrSubcategory]: products[categoryOrSubcategory],
  };

  cache.set(cacheKey, filteredProductsByCategory);
  return filteredProductsByCategory;
}

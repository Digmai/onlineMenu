import { IProduct, IProducts } from "../types";

type FilterBy = "category" | "subcategory" | "searchTerm";
export function filterProductsOnCategory(
  products: IProducts,
  options: { category?: string; subcategory?: string }
): IProduct[] {
  let filteredProducts: IProduct[] = [];

  if (options.category && products[options.category]) {
    if (
      options.subcategory &&
      products[options.category][options.subcategory]
    ) {
      filteredProducts = products[options.category][options.subcategory];
    } else {
      for (const subcat in products[options.category]) {
        filteredProducts = filteredProducts.concat(
          products[options.category][subcat]
        );
      }
    }
  } else {
    for (const cat in products) {
      for (const subcat in products[cat]) {
        filteredProducts = filteredProducts.concat(products[cat][subcat]);
      }
    }
  }

  //   if (options.searchTerm) {
  //     filteredProducts = filteredProducts.filter((product) =>
  //       product.name.toLowerCase().includes(options.searchTerm.toLowerCase())
  //     );
  //   }

  return filteredProducts;
}
// Пример использования:
//
// const filteredByCategory = filterProducts(productsData, "category", "Electronics");
// const filteredBySubcategory = filterProducts(productsData, "subcategory", "Smartphones");
// const filteredBySearchTerm = filterProducts(productsData, "searchTerm", "apple");
//

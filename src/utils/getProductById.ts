import { IProduct, IProducts } from "../types";

export function getProductById(
  id: string,
  productSelect: IProducts
): IProduct | undefined {
  for (let category in productSelect) {
    for (let subcategory in productSelect[category]) {
      const product = productSelect[category][subcategory].find(
        (p) => p._id === id
      );
      if (product) return product;
    }
  }
  return undefined;
}

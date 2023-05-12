import { IProduct } from "../types";

export function sortDataSlaceProduct(data: IProduct[]) {
  return data.reduce<{
    [category: string]: { [subcategory: string]: IProduct[] };
  }>((sortedData, item) => {
    const { category, subcategory } = item;
    sortedData[category] = sortedData[category] || {};
    sortedData[category][subcategory || ""] = [
      ...(sortedData[category][subcategory || ""] || []),
      item,
    ];
    return sortedData;
  }, {});
}

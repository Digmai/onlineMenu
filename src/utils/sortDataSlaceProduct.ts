import { IProduct } from "../types";

export function sortDataSlaceProduct(data: IProduct[]) {
  const sortedData: {
    [category: string]: { [subcategory: string]: IProduct[] };
  } = {};
  data.forEach((item) => {
    const { category, subcategory } = item;
    if (!sortedData[category]) {
      sortedData[category] = {};
    }
    if (subcategory && !sortedData[category][subcategory]) {
      sortedData[category][subcategory] = [];
    }
    if (subcategory) {
      sortedData[category][subcategory].push(item);
    } else {
      sortedData[category][""] = [item];
    }
  });
  return sortedData;
}

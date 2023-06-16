import { IProduct } from "../types";

interface SortedData {
  [category: string]: {
    subcategories: {
      [subcategory: string]: number;
    };
    hash: {
      [index: number]: IProduct[];
    };
  };
}

/*
//
//    ДАНЫЕ ЭТОГО ТИПА ДОЛЖНЫ ПРИХОДИТЬ ИЗ  БЕКА 
// !!! НЕЗАБЫТЬ УДАЛЬ ЕЁ ПОСЛЕ ПЕРЕПИСКИ БЕКА !!!
// 
*/
export function sortDataSlaceProduct(data: IProduct[]) {
  const sortedData = data.reduce<SortedData>((hash, item) => {
    const { category, subcategory } = item;

    let categoryData = hash[category];
    if (!categoryData) {
      const emptyCategory = {
        subcategories: {},
        hash: {},
      };
      hash[category] = emptyCategory;
      categoryData = emptyCategory;
    }

    let subcategoryIndex = categoryData.subcategories[subcategory];
    if (subcategoryIndex === undefined) {
      subcategoryIndex = Object.keys(categoryData.subcategories).length;
      categoryData.subcategories[subcategory] = subcategoryIndex;
      categoryData.hash[subcategoryIndex] = [];
    }

    const products = categoryData.hash[subcategoryIndex];
    if (!products.some((i) => i._id === item._id)) {
      products.push(item);
    }

    return hash;
  }, {});

  return Object.fromEntries(
    Object.entries(sortedData).map(([category, categoryData]) => [
      category,
      Object.fromEntries(
        Object.entries(categoryData.hash).map(([index, products]) => [
          Object.keys(categoryData!.subcategories)[Number(index)],
          products,
        ])
      ),
    ])
  );
}

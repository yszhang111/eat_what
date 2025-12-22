export type CanteenArea = "1D" | "1F" | "1B" | "2A" | "2B" | "2C" | "2D" | "4";

export const CANTEEN_DATA: Record<CanteenArea, string[]> = {
  "1D": ["2F", "3F"],
  "1F": ["3F", "4F", "5F"],
  "1B": ["2F", "3F", "4F", "6F"],
  "2A": ["3F", "4F", "5F"],
  "2B": ["3F", "4F", "5F"],
  "2C": ["3F", "4F"],
  "2D": ["3F", "4F"],
  "4": ["1F"], // Implied single floor
};

export const FAST_FOOD_OPTIONS = [
  "肯德基",
  "麦当劳",
  "喜家德",
];

export const ORDERING_OPTIONS = [
  "眉州东坡",
  "私厨家宴",
  "局气",
  "阿家",
  "粤菜",
  "潇湘阁",
  "紫光园"
];

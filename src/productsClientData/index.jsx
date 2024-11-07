export const babyTShirt = {
  id: "gid://shopify/Product/9656078664003",
  name: "Baby T-Shirt in Pink",
  price: 60,
  color: "Pink",
  details: {
    fit: "Slim fit",
    material: "95% cotton, 5% elastane",
    madeIn: "Ukraine",
  },
  dimensions: {
    size: { first: "Small", second: "Medium" },
    chest: { first: 40, second: 42 },
    length: { first: 54, second: 56 },
  },
  sizeRecommendations: {
    first: "160-170 cm (5'3\" - 5'7\")",
    second: "170-180 cm (5'7\" - 5'11\")",
  },
};

export const mutantSweater = {
  id: "gid://shopify/Product/9656257151299",
  name: "Mutant Sweater in Pink",
  color: "Pink",
  price: 80,
  details: {
    fit: "Oversize fit",
    material: "100% acrylic, Double-layered",
    madeIn: "Ukraine",
  },
  dimensions: {
    size: { first: "Small", second: "Medium" },
    chest: { first: 48, second: 52 },
    length: { first: 68, second: 72 },
  },
  sizeRecommendations: {
    first: "160-170 cm (5'3\" - 5'7\")",
    second: "170-180 cm (5'7\" - 5'11\")",
  },
};

export const screamerDress = {
  id: "gid://shopify/Product/9656257610051",
  name: "Screamer Dress in Black",
  color: "Black",
  price: 90,
  details: {
    fit: "Oversize fit",
    print: "Screen printing",
    material: "100% cotton, Double collar, Double sleeves, Double bottom",
    madeIn: "Ukraine",
  },
  dimensions: {
    size: { first: "Small", second: "Medium" },
    chest: { first: 60, second: 63 },
    waist: { first: 50, second: 53 },
    length: { first: 132, second: 143 },
  },
  sizeRecommendations: {
    first: "160-170 cm (5'3\" - 5'7\")",
    second: "170-180 cm (5'7\" - 5'11\")",
  },
};

export const products = [babyTShirt, mutantSweater, screamerDress];

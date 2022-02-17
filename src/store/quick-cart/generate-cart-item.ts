import isEmpty from "lodash/isEmpty";

interface Item {
  id?: string;
  name?: string;
  slug?: string;
  variations?: [];
  variation_options?: [];
  description?: string;
  in_stock?: boolean;
  is_taxable?: boolean;
  sale_price?: number;
  image?: {
    thumbnail: string;
    [key: string]: unknown;
  };
  price?: number;
  quantity?: number;
  unit?: string;
};
interface Variation {
  id: string | number;
  title: string;
  price: number;
  sale_price?: number;
  quantity: number;
  [key: string]: unknown;
}
export function generateCartItem(item: Item, variation: Variation) {
  const { id, name, slug, image, price, sale_price, quantity, unit } = item;
  if (!isEmpty(variation)) {
    return {
      ...item,
      id: `${id}.${variation.id}`,
      productId: id,
      name: `${name} - ${variation.title}`,
      stock: variation.quantity,
      price: variation.sale_price ? variation.sale_price : variation.price,
      image: image?.thumbnail,
      variationId: variation.id,
    };
  }
  return {
    ...item,
    stock: quantity,
    price: sale_price ? sale_price : price,
  };
}

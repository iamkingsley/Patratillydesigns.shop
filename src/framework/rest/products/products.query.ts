import {
  QueryParamsType,
  ProductsQueryOptionsType,
  Product,
  PaginatorInfo,
} from '@framework/types';
import { BaseService, RequestParams } from '@framework/utils/base-service';
import { API_ENDPOINTS } from '@framework/utils/endpoints';
import { mapPaginatorData } from '@framework/utils/data-mappers';
import {
  QueryKey,
  useInfiniteQuery,
  UseInfiniteQueryOptions,
  useQuery,
} from 'react-query';
class ProductService extends BaseService {}
const productService = new ProductService(API_ENDPOINTS.PRODUCTS);

type PaginatedProduct = {
  data: Product[];
  paginatorInfo: PaginatorInfo;
};
const fetchProducts = async ({
  queryKey,
  pageParam,
}: QueryParamsType): Promise<PaginatedProduct> => {
  const params = queryKey[1] as RequestParams;
  let fetchedData: any = {};
  if (pageParam) {
    fetchedData = await productService.get(pageParam);
  } else {
    fetchedData = await productService.find(params);
  }
  const { data, ...rest } = fetchedData;
  return { data, paginatorInfo: mapPaginatorData({ ...rest }) };
};

const useProductsQuery = (
  params: ProductsQueryOptionsType,
  options?: UseInfiniteQueryOptions<
    PaginatedProduct,
    Error,
    PaginatedProduct,
    PaginatedProduct,
    QueryKey
  >
) => {
  return useInfiniteQuery<PaginatedProduct, Error>(
    [API_ENDPOINTS.PRODUCTS, params],
    fetchProducts,
    {
      ...options,
      getNextPageParam: ({ paginatorInfo }) => paginatorInfo.nextPageUrl,
    }
  );
};

export { useProductsQuery, fetchProducts };

export const fetchProduct = (slug: string) => {
  return productService.findOne(slug);
};

export const useProductQuery = (slug: string) => {
  return useQuery<Product, Error>([API_ENDPOINTS.PRODUCTS, slug], () =>
    fetchProduct(slug)
  );
};

const fetchFeaturedProducts = async ({ queryKey }: QueryParamsType) => {
  const [_key, params] = queryKey;
  const { limit = 15, shop_id } = params as { limit: number; shop_id: number };
  const searchString = JSON.stringify({shop_id});
  const url = `${API_ENDPOINTS.FEATURED_PRODUCTS}?search=${searchString}&limit=${limit}`;
  const data = await productService.get(url);
  return data;
};

const useFeaturedProductsQuery = (options: {
  limit: number;
  shop_id?: number;
}) => {
  return useQuery<Product[], Error>(
    [API_ENDPOINTS.FEATURED_PRODUCTS, options],
    fetchFeaturedProducts
  );
};

export { useFeaturedProductsQuery, fetchFeaturedProducts };

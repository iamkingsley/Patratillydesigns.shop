import dynamic from 'next/dynamic';
import cn from 'classnames';
import Button from '@components/ui/button';
import NotFound from '@components/ui/not-found';
import { useTranslation } from 'next-i18next';
import rangeMap from '@lib/range-map';
import { useRouter } from 'next/router';

export const gridStyles = {
  standard: 'md:grid-cols-3 xl:grid-cols-4 xs:gap-6 md:gap-3',
  shop: 'lg:grid-cols-2 xl:grid-cols-4 3xl:grid-cols-6',
  minimal: 'grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6',
  default: 'md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-6',
};
const ProductLoader = dynamic(
  () => import('@components/ui/loaders/product-loader')
);
interface GridWithLoaderProps {
  showLoaders: boolean;
  notFound: boolean;
  hasNextPage: boolean;
  isLoadingMore: boolean;
  onLoadMore: () => void;
  limit?: number;
  layout?: string;
}
const GridWithLoader: React.FC<GridWithLoaderProps> = ({
  showLoaders,
  limit = 20,
  children,
  notFound,
  hasNextPage,
  onLoadMore,
  isLoadingMore,
  layout,
}) => {
  const { t } = useTranslation('common');
  const { pathname } = useRouter();

  if (notFound) {
    return (
      <div className="bg-gray-100 w-full min-h-full pt-6 pb-8 px-4 lg:p-8">
        <NotFound text="text-not-found" className="w-7/12 mx-auto" />
      </div>
    );
  }
  return (
    <div
      className={cn('flex-1 bg-light-100 pb-8', {
        'px-0 lg:px-0': layout === 'shop' || layout === 'modern' || layout === 'standard',
        '!bg-transparent !p-0': layout === 'minimal',
      })}
    >
      <p className={cn('text-heading font-semibold text-md md:text-xl lg:text-2xl xl:text-3xl mb-5 md:mb-8 text-center', {
        'hidden' : showLoaders || pathname === '/shop'
      })}>
        Our Garment Pieces
      </p>
      <div
        className={cn('grid grid-cols-2 gap-3', {
          [gridStyles.standard]: layout === 'standard',
          [gridStyles.shop]: layout === 'shop',
          [gridStyles.minimal]: layout === 'minimal',
          [gridStyles.default]: !layout || layout === 'modern',
        })}
      >
        {showLoaders ? (
          <>
            {rangeMap(limit, (i) => (
              <ProductLoader key={i} uniqueKey={`product-${i}`} />
            ))}
          </>
        ) : (
          children
        )}
      </div>
      {hasNextPage && (
        <div className="flex justify-center mt-8 lg:mt-12">
          <Button
            loading={isLoadingMore}
            onClick={onLoadMore}
            className="text-sm md:text-base font-semibold h-11"
          >
            {t('text-load-more')}
          </Button>
        </div>
      )}
    </div>
  );
};

export default GridWithLoader;

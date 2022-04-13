import cn from 'classnames';
import { useTranslation } from 'next-i18next';
import ProductCard from '../cards/card';
interface Props {
  products: any;
  currentProductId: any;
  gridClassName?: string;
  layout?: string;
}

const styles = {
  // standard: 'md:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-7',
  standard: 'md:grid-cols-3 xl:grid-cols-4 gap-1 xs:gap-6 md:gap-3',
  shop: 'lg:grid-cols-2 xl:grid-cols-4 3xl:grid-cols-6',
  minimal:
    'grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6',
  default: 'md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-6',
};

const RelatedProducts = ({
  products,
  currentProductId,
  gridClassName,
  layout,
}: Props) => {
  const { t } = useTranslation('common');

  return (
    <>
      <h2 className="text-lg text-heading tracking-tight font-semibold mb-6">
        {t('text-related-products')}
      </h2>
      <div
        className={cn('grid grid-cols-2 gap-3', {
          [styles.standard]: layout === 'standard',
          [styles.shop]: layout === 'shop',
          [styles.minimal]: layout === 'minimal',
          [styles.default]: !layout || layout === 'modern',
        })}
      >
        {products?.map((item: any, idx: number) => {
          if (currentProductId === item.id) {
            return null;
          }
          return (
            <ProductCard product={item} key={idx} cardType={item?.type?.slug} />
          );
        })}
      </div>
    </>
  );
};
// <motion.div key={idx}>
{
  /* {renderProductCard(
    item,
    "!shadow-none border border-border-200 hover:!border-border-200 border-opacity-70"
  )} */
}
// </motion.div>

export default RelatedProducts;

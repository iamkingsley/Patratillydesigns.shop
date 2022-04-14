import cn from 'classnames';
import { useTranslation } from 'next-i18next';
import ProductCard from '../cards/card';
import { gridStyles } from '../grids/grid-with-loader';
interface Props {
  products: any;
  currentProductId: any;
  gridClassName?: string;
  layout?: string;
}

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
          [gridStyles.standard]: layout === 'standard',
          [gridStyles.shop]: layout === 'shop',
          [gridStyles.minimal]: layout === 'minimal',
          [gridStyles.default]: !layout || layout === 'modern',
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

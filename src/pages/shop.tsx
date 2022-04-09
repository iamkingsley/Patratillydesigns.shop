import { getLayout } from '@components/layouts/layout';
import Products from '@framework/products/products';
import useLayout from '@framework/utils/use-layout';
import { useWindowSize } from '@lib/use-window-size';
import dynamic from 'next/dynamic';
import CategoriesDropdownMenu from '@framework/categories/dropdown-menu';
import AttributeSelectors from '@framework/attributes/attribute-selectors';
export { getStaticProps } from '@framework/ssr/pages';
const CartCounterButton = dynamic(
  () => import('@components/cart/cart-counter-button'),
  { ssr: false }
);
export default function Shop() {
  const { width } = useWindowSize();
  const { layout } = useLayout();

  return (
    <div className="bg-light w-full px-4 xl:px-14 mx-auto">
      <main>
        <div className="flex flex-row flex-wrap space-x-2 justify-end my-6">
          <AttributeSelectors variant='colored' />
          <CategoriesDropdownMenu variant="colored" />
        </div>
          <Products layout="standard" />
        {layout !== 'minimal' && width > 1023 && <CartCounterButton />}
      </main>
    </div>
  );
}

Shop.getLayout = getLayout;

import { Element } from 'react-scroll';
import { getLayout } from '@components/layouts/layout';
import Categories from '@framework/categories/categories';
import GroupsDropdownMenu from '@framework/groups/dropdown-menu';
import Products from '@framework/products/products';
import useLayout from '@framework/utils/use-layout';
import { useWindowSize } from '@lib/use-window-size';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { scroller } from 'react-scroll';
import CategoriesDropdownMenu from '@framework/categories/dropdown-menu';
export { getStaticProps } from '@framework/ssr/pages';
const CartCounterButton = dynamic(
  () => import('@components/cart/cart-counter-button'),
  { ssr: false }
);
const Classic = dynamic(() => import('@components/layouts/classic'));
const Standard = dynamic(() => import('@components/layouts/standard'));
const Modern = dynamic(() => import('@components/layouts/modern'));
const Minimal = dynamic(() => import('@components/layouts/minimal'));
const MAP_LAYOUT_TO_GROUP: Record<string, any> = {
  classic: Classic,
  modern: Modern,
  standard: Standard,
  minimal: Minimal,
  default: Classic,
};
export default function Shop() {
  const { query } = useRouter();
  const { width } = useWindowSize();
  const { layout, page } = useLayout();
  
  // useEffect(() => {
  //   if (query.text || query.category) {
  //     scroller.scrollTo('grid', {
  //       smooth: true,
  //       offset: -110,
  //     });
  //   }
  // }, [query.text, query.category]);
  // let Component = layout
  //   ? MAP_LAYOUT_TO_GROUP[layout]
  //   : MAP_LAYOUT_TO_GROUP['default'];

  return (
    <div className="bg-light px-6">
      <main className="w-full xl:overflow-hidden block lg:mt-6 xl:ps-0 xl:pe-5">
        {/* <FilterBar /> */}
        <div className="flex flex-row justify-end p-4 xl:px-0">
          <CategoriesDropdownMenu variant="colored" />
        </div>
        <Element name="grid" className="px-4 xl:px-0">
          <Products layout="standard" />
        </Element>
        {layout !== 'minimal' && width > 1023 && <CartCounterButton />}
      </main>
    </div>
  );
}

Shop.getLayout = getLayout;

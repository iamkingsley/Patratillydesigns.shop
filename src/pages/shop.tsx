import { useWindowSize } from '@lib/use-window-size';
import dynamic from 'next/dynamic';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Products from '@framework/products/products';
import { getLayout } from '@components/layouts/layout';
import { GetStaticProps } from 'next';

const CartCounterButton = dynamic(
  () => import('@components/cart/cart-counter-button'),
  { ssr: false }
);

export default function Shop() {
  const { width } = useWindowSize();
  const { t } = useTranslation('banner');

  return (
    <div className="bg-light flex flex-col lg:flex-row lg:items-start lg:p-8">
      {/* <ShopSidebar data={data} className="sticky top-24 lg:top-28" /> */}

        <div className="w-full px-4 xl:px-14 mx-auto mt-10 lg:mt-0">
          <Products layout="standard" />
        </div>
      {width > 1023 && <CartCounterButton />}
    </div>
  );
}

Shop.getLayout = getLayout;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale!, ['common'])),
    },
  };
};
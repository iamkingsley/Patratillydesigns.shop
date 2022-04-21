import { getLayout } from '@components/layouts/layout';
import Home from '../[[...pages]]';

export { getStaticPaths, getStaticProps } from '@framework/ssr/pages';
export default function Shop() {
  return (
     <Home />
  );
}

Shop.getLayout = getLayout;

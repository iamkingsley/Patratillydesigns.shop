import Footer from '@components/layouts/footer';
import useLayout from '@framework/utils/use-layout';
import Header from './header';
import HeaderMinimal from './header-minimal';
import MobileNavigation from './mobile-navigation';

const SiteLayout: React.FC = ({ children }) => {
  const { layout } = useLayout();
  return (
    <div className="flex flex-col min-h-screen transition-colors duration-150 bg-light">
      {layout === 'minimal' ? <HeaderMinimal /> : <Header />}
      {children}
      <MobileNavigation />
      <Footer />
    </div>
  );
};
export const getLayout = (page: React.ReactElement) => (
  <SiteLayout>{page}</SiteLayout>
);
export default SiteLayout;

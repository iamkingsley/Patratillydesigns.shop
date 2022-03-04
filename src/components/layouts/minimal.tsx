import Footer from '@components/footer/footer';
import Banner from '@framework/app/banner';
import Categories from '@framework/categories/categories';
import Products from '@framework/products/products';
import FilterBar from './filter-bar';

const Minimal = () => {
  return (
    <>
      <Banner layout="minimal" />
      {/* <Banner layout="standard" /> */}
      {/* <FilterBar /> */}
      <main className="flex-1 w-full lg:w-11/12 mx-auto">
        <Categories layout="standard" />
        <Products layout="standard" />
      </main>
      <Footer />
    </>
  );
};

export default Minimal;

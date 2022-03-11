import Footer from '@components/footer/footer';
import Banner from '@framework/app/banner';
import Categories from '@framework/categories/categories';
import Contact from '@framework/contact/contact';
import Products from '@framework/products/products';
// import FilterBar from './filter-bar';

const Minimal = () => {
  return (
    <>
      <Banner layout="minimal" />
      {/* <FilterBar /> */}
      <main className="flex-1 w-full md:px-2 lg:w-11/12 mx-auto">
        <Categories layout="standard" />
        <Products layout="standard" />
      <Footer />
      </main>
    </>
  );
};

export default Minimal;

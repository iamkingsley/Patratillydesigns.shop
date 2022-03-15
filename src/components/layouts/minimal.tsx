import Banner from '@framework/app/banner';
import Categories from '@framework/categories/categories';
import Products from '@framework/products/products';
// import FilterBar from './filter-bar';

const Minimal = () => {
  return (
    <div>
      <Banner layout="minimal" />
      {/* <FilterBar /> */}
      <main>
        <div className='w-full px-4 sm:px-1 lg:px-3 xl:px-14 mx-auto'>
          <Categories layout="minimal" />
        </div>
        <div className="w-full px-4 xl:px-14 mx-auto">
          <Products layout="standard" />
        </div>
      </main>
    </div>
  );
};

export default Minimal;

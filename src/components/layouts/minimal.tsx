import SelectedAttributes from '@components/attributes/selected-attributes';
import Banner from '@framework/app/banner';
import AttributeSelectors from '@framework/attributes/attribute-selectors';
import Categories from '@framework/categories/categories';
import CategoriesDropdownMenu from '@framework/categories/dropdown-menu';
import Products from '@framework/products/products';
import { useRouter } from 'next/router';
// import FilterBar from './filter-bar';
const Minimal = () => {
  const { pathname } = useRouter();
  return (
    <>
      {!pathname.match(new RegExp(`/shop*`)) ? ( // shop only
        <Banner layout="minimal" />
      ) : null}
      {/* <FilterBar /> */}
      <main>
        {pathname.match(new RegExp(`/shop*`)) ? ( // shop only
          <>
            <SelectedAttributes />
            <div className="flex flex-row flex-wrap space-x-2 justify-end my-6">
              <AttributeSelectors variant="colored" />
              <CategoriesDropdownMenu variant="colored" />
            </div>
          </>
        ) : ( // home only
          <div className="w-full px-4 sm:px-10 md:px-1 lg:px-10 xl:px-16 mx-auto">
            <Categories layout="minimal" />
          </div>
        )}
        <div className="w-full px-4 xl:px-14 mx-auto">
          <Products layout="standard" />
        </div>
      </main>
    </>
  );
};

export default Minimal;

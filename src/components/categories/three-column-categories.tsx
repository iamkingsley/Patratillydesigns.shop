import Image from 'next/image';
import cn from 'classnames';
import { Category } from '@framework/types';
import CategoriesLoader from '@components/ui/loaders/categories-loader';
import NotFound from '@components/ui/not-found';
import { productPlaceholder } from '@lib/placeholders';
import { useRouter } from 'next/router';
import { useWindowSize } from 'react-use';

interface CategoryGridProps {
    notFound: boolean;
    loading: boolean;
    categories: Category[];
    className?: string;
}

const CategoryItem = ({ item }: { item: Category }) => {
  const { name, details, slug, image, bg } = item;
  const router = useRouter();

  const size = useWindowSize();
  let height = 250; // mobile

  if (size.width >= 480 && size.width < 768) {
    height = 320; // sm
  } else if (size.width >= 768 && size.width < 976) {
    height = 240; // md
  } else if (size.width >= 976 && size.width < 1440) {
    height = 170; // lg
  } else if (size.width >= 1440) {
    height = 190; // xl
  }
  const { pathname, query } = router;
  const selectedQueries = query.category;

  const onCategoryClick = (slug: string) => {
    if (selectedQueries === slug) {
      const { category, ...rest } = query;
      router.push(
        {
          pathname,
          query: { ...rest },
        },
        undefined,
        {
          scroll: false,
        }
      );
      return;
    }
    router.push(
      {
        pathname,
        query: { ...query, category: slug },
      },
      undefined,
      {
        scroll: false,
      }
    );
  };

  return (
    <div
    className={cn(
      'flex justify-between items-stretch w-full h-[250px] sm:h-[320px] md:h-[240px] lg:h-[160px] xl:h-[190px] 2xl:h-[230px] py-0 cursor-pointer overflow-hidden hover:-translate-y-0.5',
      selectedQueries === slug
        ? 'border-gray-800'
        : 'border-border-100 xl:border-transparent',
      { [bg]: bg! }
    )}
    role="button"
    onClick={() => onCategoryClick(slug!)}
  >
    <div className="flex flex-col justify-center px-5 py-1 z-10">
      <p className="text-2xl lg:3xl xl:text-4xl font-semibold mb-2" onClick={() => onCategoryClick(slug!)}>
        {name}
      </p>
      <p className="text-sm sm:text-md lg:text-md font-medium font-normal" onClick={() => onCategoryClick(slug!)}>{details}</p>
    </div>
    <div className='my-auto'
      // style={{
      //   backgroundImage: `url(${image?.original})`,
      //   backgroundRepeat: 'no-repeat',
      //   width: '100%',
      //   height: '100%',
      //   backgroundSize: 'contain',
      //   backgroundPosition: 'center',
      //   backgroundClip: 'border-box',
      // }}
      >
      <Image
        src={image?.original ?? productPlaceholder}
        alt="image"
        // layout='fill'
        width={height}
        height={height}
        // className="flex-shrink-0 w-[100%] h-[100%]"
        objectFit='contain'
      />
    </div>
  </div>
  )
}
const CategoryList: React.FC<CategoryGridProps> = ({ categories, loading, notFound }) => {
  const bgColors = ['bg-blue-100', 'bg-yellow-300', 'bg-gray-300'];
  categories?.map((cat, i) => {
      cat.bg = bgColors[i];
      return cat;
  });
  
  if (loading) {
    return (
      <div className="hidden xl:block">
        <div className="w-full h-52 flex justify-center mt-8 px-2">
          <CategoriesLoader />
        </div>
      </div>
    );
  }
  return (
    <div className="w-full">
      {!notFound ? (
        <div className="flex flex-col justify-between w-full mx-auto h-[auto] space-y-3 md:space-y-0 md:space-x-3 xl:space-x-5 md:flex-row my-8">
        {categories.map((item, i) => (
          <CategoryItem item={item} key={i} />
        ))}
      </div>
      ) : (
        <div className="min-h-full pt-6 pb-8 px-9 lg:p-8">
          <NotFound text="text-no-category" className="h-96" />
        </div>
      )}
    </div>
  );
};

export default CategoryList;

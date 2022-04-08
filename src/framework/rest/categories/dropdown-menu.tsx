import { CategoriesMenu } from '@components/layouts/menu/categories-menu';
import { Category } from '@framework/types';
import useHomepage from '@framework/utils/use-homepage';
import { useCategoriesQuery } from '../categories/categories.query';

interface Props {
  variant?: 'colored' | 'minimal';
}

const CategoriesDropdownMenu = ({ variant }: Props) => {
  const { isLoading: loading, data, error } = useCategoriesQuery({type: ''});
  const { homePage } = useHomepage();

  return (
    <div className="flex flex-row items-center justify-center space-x-2 border border-gray-100 px-2">
      <span>Category</span>
      <CategoriesMenu
        categories={data?.categories?.data}
        defaultCategory={data?.categories?.data?.find((cat) => cat.slug === 'bespoke')}
        variant={variant}
      />
    </div>
  );
};

export default CategoriesDropdownMenu;

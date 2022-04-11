import router, { useRouter } from 'next/router';
import cn from 'classnames';
import { CloseIcon } from '@components/icons/close-icon';

const SelectedAttributes = () => {
    const { query, pathname } = useRouter();
    const clearFilter = (key: string) => {
      delete query[key];
      router.push({
        pathname,
        query: { ...query },
      })
    }
    return (
      <div className={cn("flex flex-row flex-wrap space-x-2 justify-end flex-wrap", {
        'my-6': Object.keys(query).length
      })}>
        {Object.keys(query).map((key, i) => (
          <div className='flex flex-row items-center space-x-1 rounded bg-gray-50 p-2' key={i}>
            <span>{query[key]}</span>
            <CloseIcon 
              className='w-6 h-6 hover:cursor-pointer p-1 hover:bg-gray-200 hover:rounded-full' 
              onClick={() => clearFilter(key)}
            />
          </div>
        ))}
      </div>
    );
  };
  export default SelectedAttributes;
  
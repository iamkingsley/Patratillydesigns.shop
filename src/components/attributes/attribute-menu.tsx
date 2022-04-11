import Scrollbar from '@components/ui/scrollbar';
import { Menu, Transition } from '@headlessui/react';
import cn from 'classnames';
import { Fragment } from 'react';
import { CaretDown } from '@components/icons/caret-down';
import { Attribute, AttributeValue } from '@framework/types';
import { useRouter } from 'next/router';
import { ArrowDownIcon } from '@components/icons/arrow-down';

interface AttributesMenuProps {
  className?: string;
  attribute: Attribute;
  defaultAttribute?: Attribute;
  variant?: 'colored' | 'minimal';
}

export const AttributesMenu: React.FC<AttributesMenuProps> = ({
  className,
  attribute,
  defaultAttribute,
  variant = 'colored',
}) => {
  const router = useRouter();
  const { query, pathname } = router;
  const selectedMenu: AttributeValue =
    attribute.values?.find((value) => value.value === query[attribute.slug]) ||
    { value: attribute.name };

  const onAttributeClick = (value: string) => {
    router.push(
      {
        pathname,
        query: { ...query, [attribute.slug]: value },
      },
      undefined,
      { scroll: false }
    );
  };
  return (
    <Menu as="div" className="relative inline-block text-right z-10">
      <Menu.Button
        role="trigger"
        className={cn(
          'flex items-center flex-shrink-0 text-sm md:text-base font-semibold h-11 focus:outline-none text-heading xl:px-4',
          {
            'bg-gray-50 border border-border-200 rounded-lg px-3':
              variant === 'minimal',
            'bg-light xl:text-accent xl:min-w-150 rounded':
              variant === 'colored',
          },
          className
        )}
      >
        {({ open }) => (
          <>
            <span className="text-sm capitalize">{selectedMenu?.value}</span>
            <span className="flex ps-2 pt-1 ms-auto">
              {variant === 'colored' && (
                <CaretDown
                  className={open ? 'transform rotate-180' : undefined}
                />
              )}

              {variant === 'minimal' && (
                <ArrowDownIcon
                  className={cn('h-3 w-3', {
                    'transform rotate-180': open,
                  })}
                />
              )}
            </span>
          </>
        )}
      </Menu.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <div ref="container">
          <Menu.Items
            role="contentinfo"
            as="ul"
            className={cn(
              'absolute mt-2 py-2 w-48 h-56 lg:h-auto min-h-40 max-h-56 sm:max-h-72 bg-light rounded shadow-700 focus:outline-none',
              {
                'border border-border-200 end-0 origin-top-end':
                  variant === 'minimal',
                'end-0 xl:end-auto xl:start-0 origin-top-end xl:origin-top-start':
                  variant !== 'minimal',
              }
            )}
          >
            <Scrollbar
              className="w-full h-full"
              options={{
                scrollbars: {
                  autoHide: 'never',
                },
              }}
            >
              {attribute.values?.map(({ value, meta }, i) => (
                <Menu.Item key={i}>
                  {({ active }) => (
                    <li
                      onClick={() => onAttributeClick(value)}
                      className={cn(
                        'flex space-s-4 items-center w-full px-5 py-2 text-sm font-semibold capitalize transition duration-200 hover:text-accent hover:cursor-pointer focus:outline-none',
                        active ? 'text-accent' : 'text-body-dark'
                      )}
                    >
                      <span>{value}</span>
                    </li>
                  )}
                </Menu.Item>
                ))}
            </Scrollbar>
          </Menu.Items>
        </div>
      </Transition>
    </Menu>
  );
};

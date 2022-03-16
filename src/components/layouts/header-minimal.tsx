import Link from 'next/link';
import cn from 'classnames';
import Logo from '@components/ui/logo';
// import GroupsDropdownMenu from '@framework/groups/dropdown-menu';
import StaticMenu from './menu/static-menu';
import { useAtom } from 'jotai';
import { displayHeaderSearchAtom } from '@store/display-header-search-atom';
import { displayMobileHeaderSearchAtom } from '@store/display-mobile-header-search-atom';
import { useTranslation } from 'next-i18next';
import dynamic from 'next/dynamic';
import { authorizationAtom } from '@store/authorization-atom';
import { useIsHomePage } from '@lib/use-is-homepage';
import { useEffect } from 'react';
import SearchWithSuggestion from '@components/ui/search/search-with-suggestion';
import { SearchIcon } from '@components/icons/search-icon';
import { ROUTES } from '@lib/routes';

const Search = dynamic(() => import('@components/ui/search/search'));
const CartCounterIconButton = dynamic(
  () => import('@components/cart/cart-counter-icon-button'),
  { ssr: false }
);
const AuthorizedMenu = dynamic(() => import('./menu/authorized-menu'), {
  ssr: false,
});
const JoinButton = dynamic(() => import('./menu/join-button'), { ssr: false });

const HeaderMinimal = () => {
  const { t } = useTranslation('common');
  const [displayHeaderSearch, setDisplayHeaderSearch] = useAtom(displayHeaderSearchAtom);
  const [displayMobileHeaderSearch, setDisplayMobileHeaderSearch] = useAtom(displayMobileHeaderSearchAtom);

  const [isAuthorize] = useAtom(authorizationAtom);
  const isHomePage = useIsHomePage();
  useEffect(() => {
    if (!isHomePage) {
      setDisplayHeaderSearch(false);
    }
  }, [isHomePage, setDisplayHeaderSearch]);

  function toggelHeaderSearch() {
    setDisplayHeaderSearch((prev) => !prev);
    setDisplayMobileHeaderSearch((prev) => !prev);
  }

  return (
    <header className={cn('site-header-with-search h-17 lg:h-22')}>
      <div
        className={cn(
          'flex justify-between items-center w-full px-4 lg:ps-12 lg:pe-8 z-50 fixed bg-light border-b border-border-200 transition-transform duration-300'
        )}
      >
        <div className="flex items-center w-full lg:w-auto">
          <div className='flex justify-center items-center mx-auto lg:mx-0'>
            <Logo />
            <span className="font-bold text-xl font-serif transition duration-200 no-underline uppercase">
              <Link href={ROUTES.HOME} >
                PATRA TILLY DESIGNS
              </Link>
            </span>
          </div>

          {/* <ul className="ms-10 me-auto hidden lg:flex items-center flex-shrink-0 space-s-10"> */}
            { /* shop & categories */ }
          {/* </ul> */}
        </div>

        {isHomePage ? (
          <>
            <div className="hidden xl:block xl:w-3/12 2xl:w-3/12 mx-auto px-10 overflow-hidden">
              <Search label={t('text-search-label')} variant="minimal" />
            </div>

            {displayMobileHeaderSearch && (
              <div className="block lg:hidden w-full absolute top-0 start-0 h-full bg-light pt-1.5 md:pt-2 px-5">
                <SearchWithSuggestion
                  label={t('text-search-label')}
                  variant="minimal"
                />
              </div>
            )}
            {displayHeaderSearch && (
              <div className="hidden lg:block xl:hidden w-9/12 mx-auto absolute h-full bg-light pt-1.5 md:pt-4 px-5">
                <SearchWithSuggestion
                  label={t('text-search-label')}
                  variant="minimal"
                />
              </div>
            )}
        </>
        ) : null}

        <div className="ms-10 hidden lg:flex items-center flex-shrink-0 space-s-9">
          {/* <GroupsDropdownMenu variant="minimal" /> */}
          {isHomePage && <SearchIcon
              width="17.05" 
              height="18" 
              className="block xl:hidden cursor-pointer"
              onClick={toggelHeaderSearch}
            />
          }
          
          <CartCounterIconButton />
          {isAuthorize ? <AuthorizedMenu minimal={true} /> : <JoinButton />}
        </div>
      </div>
    </header>
  );
};

export default HeaderMinimal;

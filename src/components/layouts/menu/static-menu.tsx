import Link from '@components/ui/link';
import { ROUTES } from '@lib/routes';
import { useTranslation } from 'next-i18next';

const headerLinks = [
  { href: ROUTES.SHOP, label: 'text-shop' },
  // { href: ROUTES.SHOPS, icon: null, label: 'nav-menu-shops' },
  // { href: ROUTES.OFFERS, label: 'nav-menu-offer' },
  // { href: ROUTES.PRIVACY, label: 'policy-main-title' },
  { href: ROUTES.HELP, label: 'nav-menu-faq' },
  { href: ROUTES.ABOUT, label: 'nav-menu-about' },
  { href: ROUTES.CONTACT, label: 'nav-menu-contact' },
  { href: ROUTES.GALLERY, label: 'nav-menu-gallery' },
];

const StaticMenu = () => {
  const { t } = useTranslation('common');

  return (
    <>
      {headerLinks.map(({ href, label, icon }, i) => (
        <li key={`${href}${label}`}>
          <Link
            href={href}
            className="font-semibold flex items-center transition duration-200 no-underline hover:text-muted focus:text-muted"
          >
            {icon && <span className="me-2">{icon}</span>}
            {t(label)}
          </Link>
        </li>
      ))}
    </>
  );
};

export default StaticMenu;

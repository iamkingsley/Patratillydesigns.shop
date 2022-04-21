import { EnvelopIcon } from "@components/icons/envelop";
import { FacebookIcon } from "@components/icons/facebook";
import { GoogleIcon } from "@components/icons/google";
import { HomeIcon } from "@components/icons/home-icon";
import { InstagramIcon } from "@components/icons/instagram";
import { PhoneIcon } from "@components/icons/phone";
import { WhatsAppIcon } from "@components/icons/social";
import { useSettings } from "@components/settings/settings.context";
import { ROUTES } from "@lib/routes";
import { useTranslation } from "next-i18next";
import Link from "next/link";

const Footer = () => {
  const { t } = useTranslation('common');
  const settings = useSettings()

  const { contactDetails: { socials } } = settings;
  const headerLinks = [
    { href: ROUTES.HOME, label: 'text-shop' },
    // { href: ROUTES.SHOPS, icon: null, label: 'nav-menu-shops' },
    // { href: ROUTES.OFFERS, label: 'nav-menu-offer' },
    // { href: ROUTES.PRIVACY, label: 'policy-main-title' },
    { href: ROUTES.HELP, label: 'nav-menu-faq' },
    { href: ROUTES.ABOUT, label: 'nav-menu-about' },
    { href: ROUTES.CONTACT, label: 'nav-menu-contact' },
  ];
  return (
    <>
      <footer className="text-center lg:text-left text-gray-600">
        <div className="w-full p-6 text-center md:text-left bg-gray-200 text-gray-600 border-b border-gray-300">
          <div className="grid grid-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="">
              <h6 className="
            uppercase
            font-semibold
            mb-4
            flex
            items-center
            justify-center
            md:justify-start
          "
              >
                PATRA TILLY DESIGNS
              </h6>
              <p>
                Patra Tilly Designs is a clothing company known for its trendy looks at reasonable prices.
                Shop the latest Patra Tilly Designs clothing collection, which includes both Bespoke Wear and Ready to Wear options.
              </p>
            </div>
            <div className="mx-auto">
              <h6 className="uppercase font-semibold mb-4 flex justify-center md:justify-start">
                Useful links
              </h6>
              {headerLinks.map(({ href, label }) => (
                <p className="mb-4" key={`${href}${label}`}>
                  <Link href={href} >
                    {t(label)}
                  </Link>
                </p>
              ))}
            </div>
            <div className="mx-auto">
              <h6 className="uppercase font-semibold mb-4 flex justify-center md:justify-start">
                Contact
              </h6>
              <div className="flex items-center justify-center md:justify-start mb-4">
                <HomeIcon className="mr-3"/>
                <p>{settings?.contactDetails?.location}</p>
              </div>
              <div className="flex items-center justify-center md:justify-start mb-4">
                <EnvelopIcon className="w-10 h-6 mr-3" />
                <p>{settings?.contactDetails?.website}</p>
              </div>
              <div className="flex items-center justify-center md:justify-start mb-4">
                <PhoneIcon className="w-6 h-6 mr-3" />
                <p>{settings?.contactDetails?.contact}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:justify-between p-6 border-b border-gray-300 bg-gray-300">
          <div className="text-center">
            <span>© {new Date().getFullYear()} Copyright:</span>
            <Link href="/">
              <a className="text-gray-600 font-semibold">
                {' '}
                PATRA TILLY DESIGNS
              </a>
            </Link>
          </div>
          <div className="flex justify-center items-center">
            <a href={socials[0]?.url} className="mr-6 text-gray-600">
              <FacebookIcon className="w-6 h-6" />
            </a>
            <a href={`https://wa.me/${socials[1]?.url}?text=Hello`} className="mr-6">
              <WhatsAppIcon className="w-6 h-6 rounded-full bg-gray-600" />
            </a>
            <a href={socials[2]?.url} className="mr-6 text-gray-600">
              <GoogleIcon className="w-6 h-6" />
            </a>
            <a href={socials[3]?.url} className="mr-6 text-gray-600">
              <InstagramIcon className="w-6 h-6 cursor-pointer" />
            </a>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;

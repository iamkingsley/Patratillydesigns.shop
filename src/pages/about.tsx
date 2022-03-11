import { useTranslation } from 'next-i18next';
import { Image } from '@components/ui/image';
import { getLayout } from '@components/layouts/layout';
import { useSettings } from '@components/settings/settings.context';
import { getIcon } from '@lib/get-icon';
import isEmpty from 'lodash/isEmpty';
import * as socialIcons from '@components/icons/social';
import Footer from '@components/footer/footer';
export { getStaticProps } from '@framework/ssr/common';

export const AboutPage = () => {
  const { t } = useTranslation('common');
  const settings = useSettings();
  const { aboutUs } = settings
  return (
    <>
    <div className="max-w-screen-lg w-full mx-auto bg-light mt-2 p-2"
      dangerouslySetInnerHTML={{__html: aboutUs}}>
    </div>
    <div className="max-w-screen-lg w-full mx-auto">
    <Footer />
    </div>
    </>

  );
};
AboutPage.getLayout = getLayout;
export default AboutPage;

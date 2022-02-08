import { useTranslation } from 'next-i18next';
import { Image } from '@components/ui/image';
import { getLayout } from '@components/layouts/layout';
import { useSettings } from '@components/settings/settings.context';
import { getIcon } from '@lib/get-icon';
import isEmpty from 'lodash/isEmpty';
import * as socialIcons from '@components/icons/social';
export { getStaticProps } from '@framework/ssr/common';

export const AboutPage = () => {
  const { t } = useTranslation('common');
  const settings = useSettings();
  return (
    <div className="w-full bg-gray-100">
      <div className="flex flex-col md:flex-row max-w-7xl w-full mx-auto py-10 px-5 xl:py-14 xl:px-8 2xl:px-14">
        About Us
      </div>
    </div>
  );
};
AboutPage.getLayout = getLayout;
export default AboutPage;

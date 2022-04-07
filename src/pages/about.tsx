import { useTranslation } from 'next-i18next';
import cn from 'classnames';
import { getLayout } from '@components/layouts/layout';
import { useSettings } from '@components/settings/settings.context';
export { getStaticProps } from '@framework/ssr/common';

export const AboutPage = () => {
  const { t } = useTranslation('common');
  const settings = useSettings();
  const { aboutUs } = settings;
  return (
    <section className="py-8 px-4 lg:py-10 lg:px-8 xl:py-14 xl:px-16 2xl:px-20">
      <header className="text-center mb-8 md:mt-16 lg:mt-0">
        <h1 className="font-bold text-xl md:text-2xl xl:text-3xl uppercase">
          {t('common:nav-menu-about')}
        </h1>
      </header>
      <div
        className={cn('max-w-screen w-full mx-auto', {
          'h-60': aboutUs.split(' ').length < 120,
        })}
        dangerouslySetInnerHTML={{ __html: aboutUs }}
      ></div>
    </section>
  );
};
AboutPage.getLayout = getLayout;
export default AboutPage;

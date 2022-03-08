import cn from 'classnames';
import { Swiper, SwiperSlide, Navigation } from '@components/ui/slider';
import { Image } from '@components/ui/image';
import { Banner } from '@framework/types';
import { productPlaceholder } from '@lib/placeholders';
import { useIsRTL } from '@lib/locals';
import { ArrowNext, ArrowPrev } from '@components/icons';
import { useTranslation } from 'next-i18next';
import SearchWithSuggestion from '@components/ui/search/search-with-suggestion';
import useLayout from '@framework/utils/use-layout';
import { Autoplay } from 'swiper';

interface BannerProps {
  banners: Banner[] | undefined;
  layout?: string;
}

const BannerShort: React.FC<BannerProps> = ({ banners }) => {
  const { t } = useTranslation('common');
  const { isRTL } = useIsRTL();
  const { layout } = useLayout();
  return (
    <div className="relative">
      <div className="overflow-hidden -z-1">
        <div className="relative">
          <Swiper
            id="banner"
            loop={true}
            modules={[Navigation, Autoplay]}
            resizeObserver={true}
            allowTouchMove={false}
            slidesPerView={1}
            autoplay={{delay: 3000}}
            navigation={{
              nextEl: '.next',
              prevEl: '.prev',
            }}
          >
            {banners?.map((banner, idx) => (
              <SwiperSlide key={idx}>
                {/* <div className="relative w-full h-full max-h-[240px] md:max-h-[450px]">
                  <Image
                    className="w-full h-full"
                    src={banner.image?.original ?? productPlaceholder}
                    alt={banner.title ?? ''}
                    layout="responsive"
                    width={1503}
                    height={450}
                  />
                </div> */}
                <div
                  className={cn('hidden lg:block relative', {
                    '!block': layout === 'minimal',
                  })}
                >
                  <div
                    className={cn('relative w-full h-screen', {
                      'max-h-140': layout === 'standard',
                      'max-h-[320px] md:max-h-[680px]': layout === 'minimal',
                    })}
                  >
                    <Image
                      className="w-full h-full min-h-140"
                      src={banner?.image?.original ?? productPlaceholder}
                      alt={banner?.title ?? ''}
                      layout="fill"
                      objectFit="cover"
                    />
                    <div
                      className={cn(
                        'p-5 md:px-20 absolute inset-0 w-full flex flex-col items-center justify-center text-center lg:space-y-10',
                        {
                          'space-y-5 md:!space-y-8': layout === 'minimal',
                        }
                      )}
                    >
                      <h1
                        className={cn(
                          'text-2xl md:text-3xl lg:text-4xl xl:text-5xl tracking-tight text-heading font-bold',
                          // {
                          //   '!text-accent': layout === 'minimal',
                          // }
                        )}
                      >
                        {banner?.title}
                      </h1>
                      <p className="text-sm md:text-base xl:text-lg text-body">
                        {banner?.description}
                      </p>
                      {/* <div className="max-w-3xl w-full">
                        <SearchWithSuggestion
                          label="search"
                          className="hidden lg:block"
                          variant="with-shadow"
                        />
                      </div> */}
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div
            className="prev cursor-pointer absolute top-2/4 start-4 md:start-5 z-10 -mt-4 md:-mt-5 w-8 h-8 rounded-full bg-light shadow-200 border border-border-200 border-opacity-70 flex items-center justify-center text-heading transition-all duration-200"
            role="button"
          >
            <span className="sr-only">{t('text-previous')}</span>

            {isRTL ? (
              <ArrowNext width={18} height={18} />
            ) : (
              <ArrowPrev width={18} height={18} />
            )}
          </div>
          <div
            className="next cursor-pointer absolute top-2/4 end-4 md:end-5 z-10 -mt-4 md:-mt-5 w-8 h-8 rounded-full bg-light shadow-200 border border-border-200 border-opacity-70 flex items-center justify-center text-heading transition-all duration-200"
            role="button"
          >
            <span className="sr-only">{t('text-next')}</span>
            {isRTL ? (
              <ArrowPrev width={18} height={18} />
            ) : (
              <ArrowNext width={18} height={18} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BannerShort;

import { Swiper, SwiperSlide, Navigation } from '@components/ui/slider';
import { Image } from '@components/ui/image';
import { Banner } from '@framework/types';
import { productPlaceholder } from '@lib/placeholders';
import { useIsRTL } from '@lib/locals';
import { ArrowNext, ArrowPrev } from '@components/icons';
import { useTranslation } from 'next-i18next';
import Button from '@components/ui/button';
import { useModalAction } from '@components/ui/modal/modal.context';

interface BannerProps {
  banners: Banner[] | undefined;
  layout?: string;
}

const BannerShort: React.FC<BannerProps> = ({ banners }) => {
  const { t } = useTranslation('common');
  const { isRTL } = useIsRTL();

  const { openModal } = useModalAction();

  function handleProductQuickView(slug: string) {
    return openModal('PRODUCT_DETAILS', slug);
  }
  return (
    <div className="relative">
      <div className="overflow-hidden -z-1">
        <div className="relative">
          <Swiper
            id="banner"
            loop={true}
            modules={[Navigation]}
            resizeObserver={true}
            allowTouchMove={false}
            slidesPerView={1}
            navigation={{
              nextEl: '.next',
              prevEl: '.prev',
            }}
            autoplay={true}
            breakpoints={{
              '@0.75': {
                slidesPerView: 2,
                spaceBetween: 10,
              },
              '@1.00': {
                slidesPerView: 2,
                spaceBetween: 10,
              },
              // '@1.50': {
              //   slidesPerView: 3,
              //   spaceBetween: 10,
              // },
              1600: {
                slidesPerView: 3,
                spaceBetween: 10
              }
            }}
          >
            {banners?.map((banner, idx) => (
              <SwiperSlide key={idx}>
                {/* <div className="relative flex flex-col justify-center items-center w-full h-full max-h-[240px] md:max-h-[450px] md:p-10"
                  style={{
                    backgroundImage: banner?.image ?
                      `url(${banner.image.original})` : `url(${productPlaceholder})`,
                    width: '100%',
                    height: 450,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: '100%'
                  }}
                >
                  <p className="mb-5 text-3xl font-bold">{banner?.name}</p>
                  <p className="text-heading text-sm font-semibold mb-5 w-[200px] sm:w-[500px]">{banner.description}</p>
                  <Button onClick={() => handleProductQuickView(banner.slug)}>View Details</Button>
                </div> */}
                <div className='flex flex-row justify-around items-center relative w-full h-full max-h-[250px] sm:max-h-[450px] md:max-h-[450px] md:p-10'>
                  <Image
                    className="w-full h-full"
                    src={banner.image?.original ?? productPlaceholder}
                    alt={banner?.name ?? banner?.title}
                    // layout="fill"
                    // objectFit='contain'
                    width={450}
                    height={450}
                  />
                  <div className='flex flex-col w-1/2 sm:w-1/2 md:w-1/2 p-5'>
                    <p className="mb-5 font-bold truncate">{banner?.name}</p>
                    <p className="text-heading text-sm font-semibold mb-5">{banner.description}</p>
                    <Button variant='normal' onClick={() => handleProductQuickView(banner.slug)}>View Details</Button>
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

import Image from 'next/image';
import { useTranslation } from 'next-i18next';
import { getLayout } from '@components/layouts/layout';
import { useGalleryMutation } from '@framework/gallery/gallery.query';
export { getStaticProps } from '@framework/ssr/pages'
export default function Gallery() {
  const { data } = useGalleryMutation();
  const { t } = useTranslation('banner');

  return (
    <div>
      <h1 className=" p-5 text-center font-bold text-xl">GALLERY</h1>
      {data?.data?.data?.length <= 0 ? (
        <h1 className="mb-20 text-center text-body h-[25vh]">
          No galleries found
        </h1>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-2 p-10">
          {data?.data?.data?.map((data, index: number) => (
            <div key={index}
              className="h-60 w-60 relative border-2 border-sky-200 rounded-lg hover:scale-125 
                    transition ease-in-out delay-150 hover:shadow-lg shadow-md mb-10"
            >
              <Image
                alt="gallery"
                className="block object-cover object-center w-full h-full rounded-lg mb-10"
                src={data?.image?.original}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

Gallery.getLayout = getLayout;

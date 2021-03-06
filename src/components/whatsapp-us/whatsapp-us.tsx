import { WhatsAppIcon } from "@components/icons/social";

interface WhatsAppProps {
  name: string;
  slug: string;
  className?: string;
}
const WhatsApp: React.FC<WhatsAppProps> = ({ name, slug, className }) => {
  const productLink = Boolean(name) && Boolean(slug);
  const PageURL = `${process.env.NEXT_PUBLIC_SITE_URL}/products/${slug}`;
  return (
    <div className={className}>
      <a
        href={!productLink ? 'https://wa.me/233244210231?text=Hello' : `https://wa.me/233244210231?text=Hello,%20I'm%20interested%20in%20this%20product;%20could%20you%20please%20assist%20me?Page%20Url:%20${PageURL}%20Page%20Title:%20${name}`}
      >
        <div className="p-2 flex justify-center items-center space-x-2 border border-gray-200 rounded-full">
          <WhatsAppIcon className="w-6 h-6 bg-green-400 rounded-full" />
          <p className="text-base text-sm p-1">WhatsApp Us</p>
        </div>
      </a>
    </div>
  );
};
export default WhatsApp;

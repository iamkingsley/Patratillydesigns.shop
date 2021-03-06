import { Image } from '@components/ui/image';
import cn from 'classnames';
import Link from '@components/ui/link';
import { useSettings } from '@components/settings/settings.context';
import { logoPlaceholder } from '@lib/placeholders';

const Logo: React.FC<React.AnchorHTMLAttributes<{}>> = ({
  className,
  ...props
}) => {
  const { logo, siteTitle } = useSettings();
  return (
    <Link href="/" className={cn('inline-flex', className)} {...props}>
      <span className="overflow-hidden relative w-40 h-16 lg:w-50 lg:h-20">
        <Image
          src={logo ? logo : logoPlaceholder}
          alt={siteTitle || 'Patra Tilly Designs Logo'}
          layout="fill"
          objectFit="cover"
          loading="eager"
        />
      </span>
    </Link>
  );
};

export default Logo;

import { AttributesMenu } from '@components/attributes/attribute-menu';
import { Attribute } from '@framework/types';
import { useAttributesQuery } from './attributes.query';

interface Props {
  variant?: 'colored' | 'minimal';
}

const AttributeSelectors = ({ variant }: Props) => {
  const { isLoading: loading, data, error } = useAttributesQuery();
  return (
    <>
      {data?.attributes?.map((attribute: Attribute, i: number) => (
        <div
          key={i}
          className="flex flex-row items-center justify-center space-x-2 border border-gray-100 px-2"
        >
          <AttributesMenu
            key={i}
            defaultAttribute={data?.attributes?.[0]}
            attribute={attribute}
            variant={variant}
          />
        </div>
      ))}
    </>
  );
};

export default AttributeSelectors;

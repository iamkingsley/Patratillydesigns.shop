import { Attribute } from '@framework/types';
import { BaseService } from '@framework/utils/base-service';
import { API_ENDPOINTS } from '@framework/utils/endpoints';
import { useQuery } from 'react-query';

class AttributeService extends BaseService {}

const attributeService = new AttributeService(API_ENDPOINTS.ATTRIBUTES);

export const fetchAttributes = async () => {
  const { data } = await attributeService.findAll();
  return { attributes: data };
};
export const useAttributesQuery = () => {
  return useQuery<{ attributes: Attribute[] }, Error>(
    [API_ENDPOINTS.ATTRIBUTES],
    fetchAttributes
  );
};

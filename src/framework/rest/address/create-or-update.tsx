import {
  useModalAction,
  useModalState,
} from '@components/ui/modal/modal.context';
import AddressForm from '@components/address/address-form';
import { AddressType } from '@framework/utils/constants';
import { useCreateAddressMutation, useUpdateAddressMutation } from './address.query';
import useUser from '@framework/auth/use-user';

type FormValues = {
  __typename?: string;
  title: string;
  type: AddressType;
  address: {
    country: string;
    city: string;
    state: string;
    zip: string;
    street_address: string;
  };
};

const CreateOrUpdateAddressForm = () => {
  const {
    data: { /*customerId,*/ address },
  } = useModalState();
  const { me: { id: customerId } } = useUser();
  const { closeModal } = useModalAction();
  const { mutate: updateAddress } = useUpdateAddressMutation();
  const { mutate: createAddress } = useCreateAddressMutation();

  function onSubmit(values: FormValues) {
    const formattedInput = {
      id: address?.id,
      customer_id: customerId,
      title: values.title,
      type: values.type,
      address: {
        ...(address?.id && { id: address.id }),
        ...values.address,
      },
    };
    if (address?.id) {
      updateAddress(formattedInput);
    } else {
      createAddress(formattedInput);
    }
    closeModal();
  }
  return <AddressForm onSubmit={onSubmit} />;
};

export default CreateOrUpdateAddressForm;

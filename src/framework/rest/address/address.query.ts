import { useMutation, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import { CustomerService } from '@framework/customer/customer.service';

export const useCreateAddressMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (input: any) => CustomerService.createAddress(input),
    {
      onSuccess: (data) => {
        if (data.success) {
          toast.success(data.message);
        } else {
          toast.error(data.message);
        }
      },
      onSettled: () => {
        queryClient.invalidateQueries('me');
      },
    }
  )
}

export const useUpdateAddressMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (input: any) => CustomerService.updateAddress(input),
    {
      onSuccess: (data) => {
        if (data.success) {
          toast.success(data.message);
        } else {
          toast.error(data.message);
        }
      },
      onSettled: () => {
        queryClient.invalidateQueries('me');
      },
    }
  )
}

export const useDeleteAddressMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (input: { id: string }) => CustomerService.deleteAddress(input),
    {
      onSuccess: (data) => {
        if (data.success) {
          toast.success(data.message);
        } else {
          toast.error(data.message);
        }
      },
      onSettled: () => {
        queryClient.invalidateQueries('me');
      },
    }
  );
};

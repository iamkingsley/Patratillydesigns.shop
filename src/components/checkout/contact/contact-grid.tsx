import { useEffect } from 'react';
import { useAtom } from 'jotai';
import { customerContactAtom } from '@store/checkout';
import { useModalAction } from '@components/ui/modal/modal.context';
import ContactCard from '@components/ui/contact-card';
import { PlusIcon } from '@components/icons/plus-icon';
import { useTranslation } from 'next-i18next';
import Input from '@components/ui/forms/input';
import { useUpdateCustomerMutation } from '@framework/customer/customer.query';
import useUser from '@framework/auth/use-user';
import { toast } from 'react-toastify';
import isEmpty from 'lodash/isEmpty';

interface ContactProps {
  contact: string;
  label: string;
  count?: number;
  className?: string;
}

const ContactGrid = ({ contact, label, count, className }: ContactProps) => {
  const [contactNumber, setContactNumber] = useAtom(customerContactAtom);
  const { openModal } = useModalAction();
  const { t } = useTranslation('common');
  const { me } = useUser();
  const { mutate: updateProfile } = useUpdateCustomerMutation();

  useEffect(() => {
    setContactNumber(contact);
  }, []);

  function onAddOrChange() {
    openModal('ADD_OR_UPDATE_CHECKOUT_CONTACT');
  }

  // remove when OTP is ready
  function onContactUpdate() {
    if (!me) {
      return false;
    }
    updateProfile(
      {
        id: me.id,
        profile: {
          ...me.profile,
          contact: contactNumber,
        },
      },
      {
        onSuccess: () => {
          toast.success(t('profile-update-successful'));
        },
        onError: (err) => {
          toast.error(t('error-something-wrong'));
        },
      }
    );
  }
  return (
    <div className={className}>
      <div className="flex items-center justify-between mb-5 md:mb-8">
        <div className="flex items-center space-s-3 md:space-s-4">
          {count && (
            <span className="rounded-full w-8 h-8 bg-accent flex items-center justify-center text-base lg:text-xl text-light">
              {count}
            </span>
          )}
          <p className="text-lg lg:text-xl text-heading capitalize">{label}</p>
        </div>

        <button
          className="flex items-center text-sm font-semibold text-accent transition-colors duration-200 focus:outline-none focus:text-accent-hover hover:text-accent-hover"
          // onClick={onAddOrChange}
          onClick={onContactUpdate}
        >
          <PlusIcon className="w-4 h-4 stroke-2 me-0.5" />
          {isEmpty(contactNumber) ? t('text-add') : t('text-update')}
        </button>
      </div>

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {/* <ContactCard
          checked={Boolean(contactNumber)}
          number={Boolean(contactNumber) ? contactNumber : t('text-no-contact')}
        /> */}
        <Input type="text"
          name="contactNumber"
          value={contactNumber}
          onChange={(e) => setContactNumber(e.target.value)}
        />
      </div>
    </div>
  );
};

export default ContactGrid;

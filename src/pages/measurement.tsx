import Button from '@components/ui/button';
import Card from '@components/ui/cards/card';
import Input from '@components/ui/forms/input';
import { useTranslation } from 'next-i18next';
import DashboardSidebar from '@components/dashboard/sidebar';
import useUser from '@framework/auth/use-user';
import { getLayout as getSiteLayout } from '@components/layouts/layout';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useForm } from 'react-hook-form';
// import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useUpdateCustomerMutation } from '@framework/customer/customer.query';

type FormValues = {
  bustName: string;
  waistName: string;
  hipName: string;
  shoulderWaistName: string;
  shoulderNippleName: string;
  shoulderUnderBustName: string;
  blouseLengthName: string;
  fullLengthName: string;
  dressLegthName: string;
  slitLengthName: string;
  acrossBackName: string;
  acrossChestName: string;
  aroundArmName: string;
  sleeveLengthName: string;
  shirtLenghtName: string;
};

const defaultValues = {
  bustName: "",
  waistName: "",
  hipName: "",
  shoulderWaistName: "",
  shoulderNippleName: "",
  shoulderUnderBustName: "",
  blouseLengthName: "",
  fullLengthName: "",
  dressLegthName: "",
  slitLengthName: "",
  acrossBackName: "",
  acrossChestName: "",
  aroundArmName: "",
  sleeveLengthName: "",
  shirtLenghtName: "",
};

const measurementSchema = yup.object().shape({
  measurement: yup.object().shape({
    bustName: yup.number().required(),
    waistName: yup.number().required(),
    hipName: yup.number().required(),
    shoulderWaistName: yup.number().required(),
    shoulderNippleName: yup.number().required(),
    shoulderUnderBustName: yup.number().required(),
    blouseLengthName: yup.number().required(),
    fullLengthName: yup.number().required(),
    dressLegthName: yup.number().required(),
    slitLengthName: yup.number().required(),
    acrossBackName: yup.number().required(),
    acrossChestName: yup.number().required(),
    aroundArmName: yup.number().required(),
    sleeveLengthName: yup.number().required(),
    shirtLenghtName: yup.number().required(),
  })
});

const MeasurementPage = () => {
  const { t } = useTranslation('common');
  const { me } = useUser();
  const { measurement } = me;   

  const { mutate: updateProfile, isLoading: loading } = useUpdateCustomerMutation();

  const {
    register,
    handleSubmit,
    setError,

    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: measurement ? measurement : defaultValues,
    resolver: yupResolver(measurementSchema),
  });
  
  async function onSubmit(
    measurement
    : FormValues) {
      updateProfile(
        {
          id: me.id,
          input: {
            ...me,
            measurement
          }
        },
     {
       onError: (error: any) => {
         Object.keys(error?.response?.data).forEach((field: any) => {
           setError(field, {
             type: "manual",
             message: error?.response?.data[field][0],
           });
         });
       },
     }
   );
 }

  return (
    <div className="w-full overflow-hidden px-1 pb-1">
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="flex flex-wrap my-5 sm:my-8">
        
      </div>
      <div className="flex flex-wrap my-5 sm:my-8">
      <Card className="w-full sm:w-8/12 md:w-2/3">
          <Input
            label={t("input-bust-name")}
            {...register("bustName")}
            type="text"
            variant="outline"
            className="mb-4"
            error={t(errors.bustName?.message!)}
          />
          <Input
            label={t("input-waist-name")}
            {...register("waistName")}
            type="text"
            variant="outline"
            className="mb-4"
            error={t(errors.waistName?.message!)}
          />
            <Input
            label={t("input-hip-name")}
            {...register("hipName")}
            type="text"
            variant="outline"
            className="mb-4"
            error={t(errors.hipName?.message!)}
          />
           <Input
            label={t("form:input-shoulder-waist-name")}
            {...register("shoulderWaistName")}
            type="text"
            variant="outline"
            className="mb-4"
            error={t(errors.shoulderWaistName?.message!)}
          />
           <Input
            label={t("input-shoulder-to-nipple-name")}
            {...register("shoulderNippleName")}
            type="text"
            variant="outline"
            className="mb-4"
            error={t(errors.shoulderNippleName?.message!)}
          />
           <Input
            label={t("input-shoulder-to-under-bust-name")}
            {...register("shoulderUnderBustName")}
            type="text"
            variant="outline"
            className="mb-4"
            error={t(errors.shoulderUnderBustName?.message!)}
          />
           <Input
            label={t("input-blouse-length-name")}
            {...register("blouseLengthName")}
            type="text"
            variant="outline"
            className="mb-4"
            error={t(errors.blouseLengthName?.message!)}
          />
           <Input
            label={t("input-shirt-lenght-name")}
            {...register("shirtLenghtName")}
            type="text"
            variant="outline"
            className="mb-4"
            error={t(errors.shirtLenghtName?.message!)}
          />
           <Input
            label={t("input-full-length-name")}
            {...register("fullLengthName")}
            type="text"
            variant="outline"
            className="mb-4"
            error={t(errors.fullLengthName?.message!)}
          />
           <Input
            label={t("input-dress-length-name")}
            {...register("dressLegthName")}
            type="text"
            variant="outline"
            className="mb-4"
            error={t(errors.dressLegthName?.message!)}
          />
           <Input
            label={t("input-slit-length-name")}
            {...register("slitLengthName")}
            type="text"
            variant="outline"
            className="mb-4"
            error={t(errors.slitLengthName?.message!)}
          />
           <Input
            label={t("input-across-back-name")}
            {...register("acrossBackName")}
            type="text"
            variant="outline"
            className="mb-4"
            error={t(errors.acrossBackName?.message!)}
          />
           <Input
            label={t("input-across-chest-name")}
            {...register("acrossChestName")}
            type="text"
            variant="outline"
            className="mb-4"
            error={t(errors.acrossChestName?.message!)}
          />
           <Input
            label={t("input-around-arm-name")}
            {...register("aroundArmName")}
            type="text"
            variant="outline"
            className="mb-4"
            error={t(errors.aroundArmName?.message!)}
          />
           <Input
            label={t("input-sleeve-length-name")}
            {...register("sleeveLengthName")}
            type="text"
            variant="outline"
            className="mb-4"
            error={t(errors.sleeveLengthName?.message!)}
          /> 
        </Card>
      </div>

      <div className="mb-4 text-end">
        <Button loading={loading} disabled={loading}>
          {t("button-label-create-customer")}
        </Button>
      </div>
    </form>      


        {/* <div className="w-full overflow-hidden px-1 pb-1">
      <div className="mb-8">
        <ProfileInformation />
        <ProfileContact
          userId={me?.id!}
          profileId={me?.profile?.id!}
          contact={me?.profile?.contact!}
        />
      </div>

      <Card className="w-full">
        <ProfileAddressGrid
          userId={me?.id!}
          //@ts-ignore
          addresses={me?.address!}
          label={t('text-addresses')}
        />
      </Card>
    </div> */}
   </div>
  );
};

const getLayout = (page: React.ReactElement) =>
  getSiteLayout(
    <div className="bg-gray-100 flex flex-col lg:flex-row items-start max-w-1920 w-full mx-auto py-10 px-5 xl:py-14 xl:px-8 2xl:px-14">
      <DashboardSidebar className="flex-shrink-0 hidden lg:block lg:w-80 me-8" />
      {page}
    </div>
  );

MeasurementPage.authenticate = true;

MeasurementPage.getLayout = getLayout;
export default MeasurementPage;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale!, ['common'])),
    },
  };
}

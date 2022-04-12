import { GALLERY } from './../../../../../../api/Patratillydesigns.api/src/common/constants';
import { useTranslation } from 'next-i18next';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import { GalleryService } from './gallery.service';
import { API_ENDPOINTS } from '@framework/utils/endpoints';

// export const useGalleryMutation = () => {
//   const { t } = useTranslation();
//   const queryClient = useQueryClient();


const fetchGallery = async () => {
  const url = `${API_ENDPOINTS.GALLERY}`;
  const {
    data, ...rest
  } = await GalleryService.getGallery(url);
  return { data, ...rest };
};

const useGalleryMutation = () => {
  return useQuery<any, Error>([API_ENDPOINTS.GALLERY], fetchGallery, {
    keepPreviousData: true,
  });
};

export { useGalleryMutation, fetchGallery };

//   return useMutation(
//     () => GalleryService.getGallery(),
//     {
//       onSuccess: (data: any) => {
//         if (data.success) {
//           toast.success(t("common:successfully-updated"));
//         } else {
//           toast.error(t(data.message));
//         }
//       },
//       // Always refetch after error or success:
//       onSettled: () => {
//         queryClient.invalidateQueries('gallery');
//       },
//     }
//   );
// };
//


// const fetchFiles = async () => {
//     const url = `${API_ENDPOINTS.FILE_MANAGER}`;
//     const {
//         data, ...rest
//     } = await FileManager.getFiles(url);
//     return { data, ...rest };
// };

// const useFilesQuery = () => {
//     return useQuery<any, Error>([API_ENDPOINTS.FILE_MANAGER], fetchFiles, {
//         keepPreviousData: true,
//     });
// };

// export { useFilesQuery, fetchFiles };
import { BaseService } from '@framework/utils/base-service';
import { API_ENDPOINTS } from '@framework/utils/endpoints';

class Gallery extends BaseService {
  // getGallery() {
  //   return this.http.get(API_ENDPOINTS.GALLERY).then((res) => res.data);
  // }

  getGallery = (url: string) => {
    return this.http.get(url)
  };
}

export const GalleryService = new Gallery(API_ENDPOINTS.GALLERY);

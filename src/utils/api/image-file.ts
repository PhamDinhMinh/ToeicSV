import {compressImage} from '../images/image';
import axiosClient from './axios';

class UploadService {
  PATH = '/api/services/app/Upload';

  uploadImages = async (images: any) => {
    let submitData = new FormData();
    const listImages = await Promise.all(
      images.map(async (i: any) => {
        if (i.size < 1048576) {
          return i;
        } else {
          return compressImage(i).then(result => ({
            ...result,
            type: 'image/jpeg',
          }));
        }
      }),
    );

    listImages.forEach(image => submitData.append('files', image));
    const url = this.PATH + '/UploadImages';
    return axiosClient.post(url, submitData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      timeout: 300000,
    });
  };

  uploadFiles = (params: any) => {
    const url = this.PATH + '/UploadFiles';
    return axiosClient.post(url, params);
  };
}

const uploadService = new UploadService();
export default uploadService;

import { FilterParams } from 'pip-services-commons-node';
import { PagingParams } from 'pip-services-commons-node';
import { DataPage } from 'pip-services-commons-node';
import { CommandableHttpClient } from 'pip-services-net-node';
import { ImageSetV1 } from './ImageSetV1';
import { IImageSetsClientV1 } from './IImageSetsClientV1';
export declare class ImageSetsHttpClientV1 extends CommandableHttpClient implements IImageSetsClientV1 {
    constructor(config?: any);
    getImageSets(correlationId: string, filter: FilterParams, paging: PagingParams, callback: (err: any, page: DataPage<ImageSetV1>) => void): void;
    getImageSetById(correlationId: string, imagesetId: string, callback: (err: any, imageset: ImageSetV1) => void): void;
    createImageSet(correlationId: string, imageset: ImageSetV1, callback: (err: any, imageset: ImageSetV1) => void): void;
    updateImageSet(correlationId: string, imageset: ImageSetV1, callback: (err: any, imageset: ImageSetV1) => void): void;
    deleteImageSetById(correlationId: string, imagesetId: string, callback: (err: any, imageset: ImageSetV1) => void): void;
}

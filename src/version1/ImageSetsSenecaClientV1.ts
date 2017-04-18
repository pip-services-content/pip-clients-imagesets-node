import { ConfigParams } from 'pip-services-commons-node';
import { IReferences } from 'pip-services-commons-node';
import { FilterParams } from 'pip-services-commons-node';
import { PagingParams } from 'pip-services-commons-node';
import { DataPage } from 'pip-services-commons-node';
import { CommandableSenecaClient } from 'pip-services-net-node';

import { ImageSetV1 } from './ImageSetV1';
import { IImageSetsClientV1 } from './IImageSetsClientV1';

export class ImageSetsSenecaClientV1 extends CommandableSenecaClient implements IImageSetsClientV1 {

    constructor(config?: any) {
        super('imagesets');

        if (config != null)
            this.configure(ConfigParams.fromValue(config));
    }
       
    public getImageSets(correlationId: string, filter: FilterParams, paging: PagingParams,
        callback: (err: any, page: DataPage<ImageSetV1>) => void): void {
        this.callCommand(
            'get_imagesets',
            correlationId,
            {
                filter: filter,
                paging: paging
            }, 
            callback
        );
    }

    public getImageSetById(correlationId: string, imagesetId: string,
        callback: (err: any, imageset: ImageSetV1) => void): void {
        this.callCommand(
            'get_imageset_by_id',
            correlationId,
            {
                imageset_id: imagesetId
            }, 
            callback
        );
    }

    public createImageSet(correlationId: string, imageset: ImageSetV1,
        callback: (err: any, imageset: ImageSetV1) => void): void {
        this.callCommand(
            'create_imageset',
            correlationId,
            {
                imageset: imageset,
            }, 
            callback
        );
    }

    public updateImageSet(correlationId: string, imageset: ImageSetV1,
        callback: (err: any, imageset: ImageSetV1) => void): void {
        this.callCommand(
            'update_imageset',
            correlationId,
            {
                imageset: imageset,
            }, 
            callback
        );
    }

    public deleteImageSetById(correlationId: string, imagesetId: string,
        callback: (err: any, imageset: ImageSetV1) => void): void {
        let timing = this.instrument(correlationId, 'imagesets.delete_imageset_by_id');
        this.callCommand(
            'delete_imageset_by_id',
            correlationId,
            {
                imageset_id: imagesetId
            }, 
            callback
        );
    }

}

import { ConfigParams } from 'pip-services-commons-node';
import { IReferences } from 'pip-services-commons-node';
import { Descriptor } from 'pip-services-commons-node';
import { FilterParams } from 'pip-services-commons-node';
import { PagingParams} from 'pip-services-commons-node';
import { DataPage } from 'pip-services-commons-node';
import { DirectClient } from 'pip-services-rpc-node';

import { ImageSetV1 } from './ImageSetV1';
import { IImageSetsClientV1 } from './IImageSetsClientV1';
//import { IImageSetsController } from 'pip-services-imagesets-node';

export class ImageSetsDirectClientV1 extends DirectClient<any> implements IImageSetsClientV1 {
            
    public constructor(config?: any) {
        super();
        this._dependencyResolver.put('controller', new Descriptor("pip-services-imagesets", "controller", "*", "*", "*"))

        if (config != null)
            this.configure(ConfigParams.fromValue(config));
    }

    public getImageSets(correlationId: string, filter: FilterParams, paging: PagingParams,
        callback: (err: any, page: DataPage<ImageSetV1>) => void): void {
        let timing = this.instrument(correlationId, 'imagesets.get_imagesets');
        this._controller.getImageSets(correlationId, filter, paging, (err, page) => {
            timing.endTiming();
            callback(err, page);
        });
    }

    public getImageSetById(correlationId: string, imagesetId: string,
        callback: (err: any, imageset: ImageSetV1) => void): void {
        let timing = this.instrument(correlationId, 'imagesets.get_imageset_by_id');
        this._controller.getImageSetById(correlationId, imagesetId, (err, imageset) => {
            timing.endTiming();
            callback(err, imageset);
        });
    }

    public createImageSet(correlationId: string, imageset: ImageSetV1,
        callback: (err: any, imageset: ImageSetV1) => void): void {
        let timing = this.instrument(correlationId, 'imagesets.create_imageset');
        this._controller.createImageSet(correlationId, imageset, (err, imageset) => {
            timing.endTiming();
            callback(err, imageset);
        });
    }

    public updateImageSet(correlationId: string, imageset: ImageSetV1,
        callback: (err: any, imageset: ImageSetV1) => void): void {
        let timing = this.instrument(correlationId, 'imagesets.update_imageset');
        this._controller.updateImageSet(correlationId, imageset, (err, imageset) => {
            timing.endTiming();
            callback(err, imageset);
        });
    }

    public deleteImageSetById(correlationId: string, imagesetId: string,
        callback: (err: any, imageset: ImageSetV1) => void): void {
        let timing = this.instrument(correlationId, 'imagesets.delete_imageset_by_id');
        this._controller.deleteImageSetById(correlationId, imagesetId, (err, imageset) => {
            timing.endTiming();
            callback(err, imageset);
        });
    }

}
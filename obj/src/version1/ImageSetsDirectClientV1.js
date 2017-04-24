"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_commons_node_2 = require("pip-services-commons-node");
const pip_services_net_node_1 = require("pip-services-net-node");
//import { IImageSetsController } from 'pip-services-imagesets-node';
class ImageSetsDirectClientV1 extends pip_services_net_node_1.DirectClient {
    constructor(config) {
        super();
        this._dependencyResolver.put('controller', new pip_services_commons_node_2.Descriptor("pip-services-imagesets", "controller", "*", "*", "*"));
        if (config != null)
            this.configure(pip_services_commons_node_1.ConfigParams.fromValue(config));
    }
    getImageSets(correlationId, filter, paging, callback) {
        let timing = this.instrument(correlationId, 'imagesets.get_imagesets');
        this._controller.getImageSets(correlationId, filter, paging, (err, page) => {
            timing.endTiming();
            callback(err, page);
        });
    }
    getImageSetById(correlationId, imagesetId, callback) {
        let timing = this.instrument(correlationId, 'imagesets.get_imageset_by_id');
        this._controller.getImageSetById(correlationId, imagesetId, (err, imageset) => {
            timing.endTiming();
            callback(err, imageset);
        });
    }
    createImageSet(correlationId, imageset, callback) {
        let timing = this.instrument(correlationId, 'imagesets.create_imageset');
        this._controller.createImageSet(correlationId, imageset, (err, imageset) => {
            timing.endTiming();
            callback(err, imageset);
        });
    }
    updateImageSet(correlationId, imageset, callback) {
        let timing = this.instrument(correlationId, 'imagesets.update_imageset');
        this._controller.updateImageSet(correlationId, imageset, (err, imageset) => {
            timing.endTiming();
            callback(err, imageset);
        });
    }
    deleteImageSetById(correlationId, imagesetId, callback) {
        let timing = this.instrument(correlationId, 'imagesets.delete_imageset_by_id');
        this._controller.deleteImageSetById(correlationId, imagesetId, (err, imageset) => {
            timing.endTiming();
            callback(err, imageset);
        });
    }
}
exports.ImageSetsDirectClientV1 = ImageSetsDirectClientV1;
//# sourceMappingURL=ImageSetsDirectClientV1.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_net_node_1 = require("pip-services-net-node");
class ImageSetsHttpClientV1 extends pip_services_net_node_1.CommandableHttpClient {
    constructor(config) {
        super('v1/imagesets');
        if (config != null)
            this.configure(pip_services_commons_node_1.ConfigParams.fromValue(config));
    }
    getImageSets(correlationId, filter, paging, callback) {
        this.callCommand('get_imagesets', correlationId, {
            filter: filter,
            paging: paging
        }, callback);
    }
    getImageSetById(correlationId, imagesetId, callback) {
        this.callCommand('get_imageset_by_id', correlationId, {
            imageset_id: imagesetId
        }, callback);
    }
    createImageSet(correlationId, imageset, callback) {
        this.callCommand('create_imageset', correlationId, {
            imageset: imageset,
        }, callback);
    }
    updateImageSet(correlationId, imageset, callback) {
        this.callCommand('update_imageset', correlationId, {
            imageset: imageset,
        }, callback);
    }
    deleteImageSetById(correlationId, imagesetId, callback) {
        let timing = this.instrument(correlationId, 'imagesets.delete_imageset_by_id');
        this.callCommand('delete_imageset_by_id', correlationId, {
            imageset_id: imagesetId
        }, callback);
    }
}
exports.ImageSetsHttpClientV1 = ImageSetsHttpClientV1;
//# sourceMappingURL=ImageSetsHttpClientV1.js.map
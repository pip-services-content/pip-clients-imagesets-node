"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_components_node_1 = require("pip-services3-components-node");
const ImageSetsDirectClientV1_1 = require("../version1/ImageSetsDirectClientV1");
const ImageSetsHttpClientV1_1 = require("../version1/ImageSetsHttpClientV1");
class ImageSetsClientFactory extends pip_services3_components_node_1.Factory {
    constructor() {
        super();
        this.registerAsType(ImageSetsClientFactory.DirectClientV1Descriptor, ImageSetsDirectClientV1_1.ImageSetsDirectClientV1);
        this.registerAsType(ImageSetsClientFactory.HttpClientV1Descriptor, ImageSetsHttpClientV1_1.ImageSetsHttpClientV1);
    }
}
exports.ImageSetsClientFactory = ImageSetsClientFactory;
ImageSetsClientFactory.Descriptor = new pip_services3_commons_node_1.Descriptor('pip-services-imagesets', 'factory', 'default', 'default', '1.0');
ImageSetsClientFactory.DirectClientV1Descriptor = new pip_services3_commons_node_1.Descriptor('pip-services-imagesets', 'client', 'direct', 'default', '1.0');
ImageSetsClientFactory.HttpClientV1Descriptor = new pip_services3_commons_node_1.Descriptor('pip-services-imagesets', 'client', 'http', 'default', '1.0');
//# sourceMappingURL=ImageSetsClientFactory.js.map
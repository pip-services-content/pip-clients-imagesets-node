"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_commons_node_2 = require("pip-services-commons-node");
const ImageSetsDirectClientV1_1 = require("../version1/ImageSetsDirectClientV1");
const ImageSetsHttpClientV1_1 = require("../version1/ImageSetsHttpClientV1");
const ImageSetsSenecaClientV1_1 = require("../version1/ImageSetsSenecaClientV1");
class ImageSetsClientFactory extends pip_services_commons_node_2.Factory {
    constructor() {
        super();
        this.registerAsType(ImageSetsClientFactory.DirectClientV1Descriptor, ImageSetsDirectClientV1_1.ImageSetsDirectClientV1);
        this.registerAsType(ImageSetsClientFactory.HttpClientV1Descriptor, ImageSetsHttpClientV1_1.ImageSetsHttpClientV1);
        this.registerAsType(ImageSetsClientFactory.SenecaClientV1Descriptor, ImageSetsSenecaClientV1_1.ImageSetsSenecaClientV1);
    }
}
ImageSetsClientFactory.Descriptor = new pip_services_commons_node_1.Descriptor('pip-services-imagesets', 'factory', 'default', 'default', '1.0');
ImageSetsClientFactory.DirectClientV1Descriptor = new pip_services_commons_node_1.Descriptor('pip-services-imagesets', 'client', 'direct', 'default', '1.0');
ImageSetsClientFactory.HttpClientV1Descriptor = new pip_services_commons_node_1.Descriptor('pip-services-imagesets', 'client', 'http', 'default', '1.0');
ImageSetsClientFactory.SenecaClientV1Descriptor = new pip_services_commons_node_1.Descriptor('pip-services-imagesets', 'client', 'seneca', 'default', '1.0');
exports.ImageSetsClientFactory = ImageSetsClientFactory;
//# sourceMappingURL=ImageSetsClientFactory.js.map
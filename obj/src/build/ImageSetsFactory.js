"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_commons_node_2 = require("pip-services-commons-node");
const ImageSetsDirectClientV1_1 = require("../version1/ImageSetsDirectClientV1");
const ImageSetsHttpClientV1_1 = require("../version1/ImageSetsHttpClientV1");
const ImageSetsSenecaClientV1_1 = require("../version1/ImageSetsSenecaClientV1");
class ImageSetsFactory extends pip_services_commons_node_2.Factory {
    constructor() {
        super();
        this.registerAsType(ImageSetsFactory.DirectClientV1Descriptor, ImageSetsDirectClientV1_1.ImageSetsDirectClientV1);
        this.registerAsType(ImageSetsFactory.HttpClientV1Descriptor, ImageSetsHttpClientV1_1.ImageSetsHttpClientV1);
        this.registerAsType(ImageSetsFactory.SenecaClientV1Descriptor, ImageSetsSenecaClientV1_1.ImageSetsSenecaClientV1);
    }
}
ImageSetsFactory.Descriptor = new pip_services_commons_node_1.Descriptor('pip-services-imagesets', 'factory', 'default', 'default', '1.0');
ImageSetsFactory.DirectClientV1Descriptor = new pip_services_commons_node_1.Descriptor('pip-services-imagesets', 'client', 'direct', 'default', '1.0');
ImageSetsFactory.HttpClientV1Descriptor = new pip_services_commons_node_1.Descriptor('pip-services-imagesets', 'client', 'http', 'default', '1.0');
ImageSetsFactory.SenecaClientV1Descriptor = new pip_services_commons_node_1.Descriptor('pip-services-imagesets', 'client', 'seneca', 'default', '1.0');
exports.ImageSetsFactory = ImageSetsFactory;
//# sourceMappingURL=ImageSetsFactory.js.map
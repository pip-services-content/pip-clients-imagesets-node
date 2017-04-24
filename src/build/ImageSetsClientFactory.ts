import { Descriptor } from 'pip-services-commons-node';
import { Factory } from 'pip-services-commons-node';

import { ImageSetsDirectClientV1 } from '../version1/ImageSetsDirectClientV1';
import { ImageSetsHttpClientV1 } from '../version1/ImageSetsHttpClientV1';
import { ImageSetsSenecaClientV1 } from '../version1/ImageSetsSenecaClientV1';

export class ImageSetClientFactory extends Factory {
	public static Descriptor: Descriptor = new Descriptor('pip-services-imagesets', 'factory', 'default', 'default', '1.0');
	public static DirectClientV1Descriptor = new Descriptor('pip-services-imagesets', 'client', 'direct', 'default', '1.0');
	public static HttpClientV1Descriptor = new Descriptor('pip-services-imagesets', 'client', 'http', 'default', '1.0');
	public static SenecaClientV1Descriptor = new Descriptor('pip-services-imagesets', 'client', 'seneca', 'default', '1.0');
	
	constructor() {
		super();

		this.registerAsType(ImageSetClientFactory.DirectClientV1Descriptor, ImageSetsDirectClientV1);
		this.registerAsType(ImageSetClientFactory.HttpClientV1Descriptor, ImageSetsHttpClientV1);
		this.registerAsType(ImageSetClientFactory.SenecaClientV1Descriptor, ImageSetsSenecaClientV1);
	}
	
}
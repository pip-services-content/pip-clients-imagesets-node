let assert = require('chai').assert;
let async = require('async');

import { Descriptor } from 'pip-services-commons-node';
import { ConfigParams } from 'pip-services-commons-node';
import { References } from 'pip-services-commons-node';
import { ConsoleLogger } from 'pip-services-commons-node';

import { ImageSetsMemoryPersistence } from 'pip-services-imagesets-node';
import { ImageSetsController } from 'pip-services-imagesets-node';
import { ImageSetsHttpServiceV1 } from 'pip-services-imagesets-node';
import { IImageSetsClientV1 } from '../../src/version1/IImageSetsClientV1';
import { ImageSetsHttpClientV1 } from '../../src/version1/ImageSetsHttpClientV1';
import { ImageSetsClientFixtureV1 } from './ImageSetsClientFixtureV1';

var httpConfig = ConfigParams.fromTuples(
    "connection.protocol", "http",
    "connection.host", "localhost",
    "connection.port", 3000
);

suite('ImageSetsHttpClientV1', ()=> {
    let service: ImageSetsHttpServiceV1;
    let client: ImageSetsHttpClientV1;
    let fixture: ImageSetsClientFixtureV1;

    suiteSetup((done) => {
        let logger = new ConsoleLogger();
        let persistence = new ImageSetsMemoryPersistence();
        let controller = new ImageSetsController();

        service = new ImageSetsHttpServiceV1();
        service.configure(httpConfig);

        let references: References = References.fromTuples(
            new Descriptor('pip-services-commons', 'logger', 'console', 'default', '1.0'), logger,
            new Descriptor('pip-services-imagesets', 'persistence', 'memory', 'default', '1.0'), persistence,
            new Descriptor('pip-services-imagesets', 'controller', 'default', 'default', '1.0'), controller,
            new Descriptor('pip-services-imagesets', 'service', 'http', 'default', '1.0'), service
        );
        controller.setReferences(references);
        service.setReferences(references);

        client = new ImageSetsHttpClientV1();
        client.setReferences(references);
        client.configure(httpConfig);

        fixture = new ImageSetsClientFixtureV1(client);

        service.open(null, (err) => {
            client.open(null, done);
        });
    });
    
    suiteTeardown((done) => {
        client.close(null);
        service.close(null, done);
    });

    test('CRUD Operations', (done) => {
        fixture.testCrudOperations(done);
    });

});

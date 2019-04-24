let assert = require('chai').assert;
let async = require('async');

import { Descriptor } from 'pip-services3-commons-node';
import { ConfigParams } from 'pip-services3-commons-node';
import { References } from 'pip-services3-commons-node';
import { ConsoleLogger } from 'pip-services3-components-node';

import { ImageSetsMemoryPersistence } from 'pip-services-imagesets-node';
import { ImageSetsController } from 'pip-services-imagesets-node';
import { IImageSetsClientV1 } from '../../src/version1/IImageSetsClientV1';
import { ImageSetsDirectClientV1 } from '../../src/version1/ImageSetsDirectClientV1';
import { ImageSetsClientFixtureV1 } from './ImageSetsClientFixtureV1';

suite('ImageSetsDirectClientV1', ()=> {
    let client: ImageSetsDirectClientV1;
    let fixture: ImageSetsClientFixtureV1;

    suiteSetup((done) => {
        let logger = new ConsoleLogger();
        let persistence = new ImageSetsMemoryPersistence();
        let controller = new ImageSetsController();

        let references: References = References.fromTuples(
            new Descriptor('pip-services', 'logger', 'console', 'default', '1.0'), logger,
            new Descriptor('pip-services-imagesets', 'persistence', 'memory', 'default', '1.0'), persistence,
            new Descriptor('pip-services-imagesets', 'controller', 'default', 'default', '1.0'), controller,
        );
        controller.setReferences(references);

        client = new ImageSetsDirectClientV1();
        client.setReferences(references);

        fixture = new ImageSetsClientFixtureV1(client);

        client.open(null, done);
    });
    
    suiteTeardown((done) => {
        client.close(null, done);
    });

    test('CRUD Operations', (done) => {
        fixture.testCrudOperations(done);
    });

});

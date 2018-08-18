let assert = require('chai').assert;
let async = require('async');

import { Descriptor } from 'pip-services-commons-node';
import { ConfigParams } from 'pip-services-commons-node';
import { References } from 'pip-services-commons-node';
import { ConsoleLogger } from 'pip-services-components-node';
import { SenecaInstance } from 'pip-services-seneca-node';

import { ImageSetsMemoryPersistence } from 'pip-services-imagesets-node';
import { ImageSetsController } from 'pip-services-imagesets-node';
import { ImageSetsSenecaServiceV1 } from 'pip-services-imagesets-node';
import { IImageSetsClientV1 } from '../../src/version1/IImageSetsClientV1';
import { ImageSetsSenecaClientV1 } from '../../src/version1/ImageSetsSenecaClientV1';
import { ImageSetsClientFixtureV1 } from './ImageSetsClientFixtureV1';

let senecaConfig = ConfigParams.fromTuples(
    "connection.protocol", "none"
);

suite('ImageSetsSenecaClient', () => {
    let service: ImageSetsSenecaServiceV1;
    let client: ImageSetsSenecaClientV1;
    let fixture: ImageSetsClientFixtureV1;

    suiteSetup((done) => {
        let logger = new ConsoleLogger();
        let persistence = new ImageSetsMemoryPersistence();
        let controller = new ImageSetsController();

        service = new ImageSetsSenecaServiceV1();
        service.configure(senecaConfig);
        let seneca = new SenecaInstance();

        let references: References = References.fromTuples(
            new Descriptor('pip-services', 'logger', 'console', 'default', '1.0'), logger,
            new Descriptor('pip-services-seneca', 'seneca', 'instance', 'default', '1.0'), seneca,
            new Descriptor('pip-services-imagesets', 'persistence', 'memory', 'default', '1.0'), persistence,
            new Descriptor('pip-services-imagesets', 'controller', 'default', 'default', '1.0'), controller,
            new Descriptor('pip-services-imagesets', 'service', 'seneca', 'default', '1.0'), service
        );
        seneca.setReferences(references);
        controller.setReferences(references);
        service.setReferences(references);

        client = new ImageSetsSenecaClientV1();
        client.configure(senecaConfig);
        client.setReferences(references);

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

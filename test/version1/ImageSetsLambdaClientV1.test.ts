import { YamlConfigReader } from 'pip-services-commons-node';
import { ImageSetsClientFixtureV1 } from './ImageSetsClientFixtureV1';
import { ImageSetsLambdaClientV1 } from '../../src/version1/ImageSetsLambdaClientV1';

suite('ImageSetsLambdaClient', ()=> {
    let config = YamlConfigReader.readConfig(null, './config/test_connections.yaml', null);
    let lambdaConfig = config.getSection('lambda');

    // Skip if connection is not configured
    if (lambdaConfig.getAsNullableString("connection.protocol") != "aws")
        return;

    let client: ImageSetsLambdaClientV1;
    let fixture: ImageSetsClientFixtureV1;

    setup((done) => {
        client = new ImageSetsLambdaClientV1();
        client.configure(lambdaConfig);

        fixture = new ImageSetsClientFixtureV1(client);

        client.open(null, done);
    });

    teardown((done) => {
        client.close(null, done);
    });

    test('Crud Operations', (done) => {
        fixture.testCrudOperations(done);
    });

});
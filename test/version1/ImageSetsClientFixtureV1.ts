let _ = require('lodash');
let async = require('async');
let assert = require('chai').assert;

import { MultiString } from 'pip-services-commons-node';

import { IImageSetsClientV1 } from '../../src/version1/IImageSetsClientV1';
import { ImageSetV1 } from '../../src/version1/ImageSetV1';

let IMAGESET1 = <ImageSetV1>{
    id: '1',
    title: 'ImageSet 1',
    pic_ids: ['111','222','333']
};
let IMAGESET2 = <ImageSetV1>{
    id: '2',
    tags: ['TAG 1'],
    all_tags: ['tag1'],
    title: 'ImageSet 2',
    pic_ids: ['444','555','666']
};


export class ImageSetsClientFixtureV1 {
    private _client: IImageSetsClientV1;
    
    constructor(client: IImageSetsClientV1) {
        this._client = client;
    }
        
    public testCrudOperations(done) {
        let imageset1, imageset2;

        async.series([
        // Create one imageset
            (callback) => {
                this._client.createImageSet(
                    null,
                    IMAGESET1,
                    (err, imageset) => {
                        assert.isNull(err);
                        
                        assert.isObject(imageset);
                        assert.equal(imageset.title, IMAGESET1.title);
                        assert.sameMembers(imageset.pic_ids, IMAGESET1.pic_ids);

                        imageset1 = imageset;

                        callback();
                    }
                );
            },
        // Create another imageset
            (callback) => {
                this._client.createImageSet(
                    null,
                    IMAGESET2,
                    (err, imageset) => {
                        assert.isNull(err);
                        
                        assert.isObject(imageset);
                        assert.equal(imageset.title, IMAGESET2.title);
                        assert.sameMembers(imageset.pic_ids, IMAGESET2.pic_ids);

                        imageset2 = imageset;

                        callback();
                    }
                );
            },
        // Get all imagesets
            (callback) => {
                this._client.getImageSets(
                    null, null, null,
                    (err, page) => {
                        assert.isNull(err);
                        
                        assert.isObject(page);
                        assert.lengthOf(page.data, 2);

                        callback();
                    }
                );
            },
        // Update the imageset
            (callback) => {
                imageset1.title = 'New Title 1';

                this._client.updateImageSet(
                    null,
                    imageset1,
                    (err, imageset) => {
                        assert.isNull(err);
                        
                        assert.isObject(imageset);
                        assert.equal(imageset.title, 'New Title 1');
                        assert.sameMembers(imageset.pic_ids, IMAGESET1.pic_ids);

                        imageset1 = imageset;

                        callback();
                    }
                );
            },
        // Delete imageset
            (callback) => {
                this._client.deleteImageSetById(
                    null, imageset1.id,
                    (err) => {
                        assert.isNull(err);

                        callback();
                    }
                );
            },
        // Try to get delete imageset
            (callback) => {
                this._client.getImageSetById(
                    null, imageset1.id,
                    (err, imageset) => {
                        assert.isNull(err);
                        
                        assert.isNull(imageset || null);

                        callback();
                    }
                );
            }
        ], done);
    }
}

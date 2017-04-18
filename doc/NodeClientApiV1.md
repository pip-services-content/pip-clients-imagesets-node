# Client API (version 1) <br/> ImageSets Microservices Client SDK for Node.js

Node.js client API for ImageSets microservice is a thin layer on the top of
communication protocols. It hides details related to specific protocol implementation
and provides high-level API to access the microservice for simple and productive development.

* [Installation](#install)
* [Getting started](#get_started)
* [ImageSetV1 class](#class1)
* [IImageSetsClientV1 interface](#interface)
    - [getImageSets()](#operation1)
    - [getImageSetById()](#operation2)
    - [createImageSet()](#operation3)
    - [updateImageSet()](#operation4)
    - [deleteImageSetById()](#operation5)
* [ImageSetsHttpClientV1 class](#client_http)
* [ImageSetsSenecaClientV1 class](#client_seneca)
* [ImageSetsLambdaClientV1 class](#client_lambda)
* [ImageSetsDirectClientV1 class](#client_direct)

## <a name="install"></a> Installation

To work with the client SDK add dependency into package.json file:

```javascript
{
    ...
    "dependencies": {
        ....
        "pip-clients-imagesets-node": "^1.0.*",
        ...
    }
}
```

Then download the dependency using **npm**:

```javascript
# Installing dependencies
npm install

# Updating dependencies
npm update
```

## <a name="get_started"></a> Getting started

This is a simple example on how to work with the microservice using REST client:

```javascript
// Get Client SDK for Version 1 
var sdk = new require('pip-clients-imagesets-node');

// Client configuration
var config = {
    connection: {
        protocol: 'http',
        host: 'localhost', 
        port: 8080
    }
};

// Create the client instance
var client = sdk.ImageSetsHttpClientV1(config);

// Open client connection to the microservice
client.open(null, function(err) {
    if (err) {
        console.error(err);
        return; 
    }
    
    console.log('Opened connection');
        
    // Create a new imageset
    client.createImageSet(
        null,
        { 
            title: 'Cars',
            tags: ['car', 'cars', 'cartoon'],
            pic_ids: ['111', '222', '333']
        },
        function (err, imageset) {
            if (err) {
                console.error(err);
                return;
            }
            
            console.log('Created imageset is');
            console.log(imageset);
            
            // Search for car images
            client.getImageSets(
                null,
                {
                    tags: 'cars'
                },
                null
                function(err, page) {
                    if (err) {
                        console.error(err);
                        return;
                    }
                    
                    console.log('Retrieved imageset are');
                    console.log(page.data);
                    
                    // Close connection
                    client.close(null); 
                }
            );
        }
    );
});
```

## Data types

### <a name="class2"></a> ImageSetV1 class

Represents a system imageset. 

**Properties:**
- id: string - unique imageset id
- create_time: Date - date and time when imageset was created
- title: string - imageset title
- pic_ids: [string] - (optional) array of picture block ids in storage attached to this imageset
- tags: [string] - (optional) explicit tags with annoucement topic for searching
- all_tags: [string] - (readonly) normalized array of explicit and hash tags used by search

## <a name="interface"></a> IImageSetsClientV1 interface

If you are using Typescript, you can use IImageSetsClientV1 as a common interface across all client implementations. 
If you are using plain Javascript, you shall not worry about IImageSetsClientV1 interface. You can just expect that
all methods defined in this interface are implemented by all client classes.

```javascript
interface IImageSetsClientV1 {
    getImageSets(correlationId, filter, paging, callback);
    getImageSetById(correlationId, imagesetId, callback);
    createImageSet(correlationId, imageset, user, callback);
    updateImageSet(correlationId, imagesetId, update, user, callback);
    deleteImageSetById(correlationId, imagesetId, callback);
}
```

### <a name="operation1"></a> getImageSets(correlationId, filter, paging, callback)

Retrieves a list of imagesets by specified criteria

**Params properties:** 
- correlationId: string - id that uniquely identifies transaction
- filter: object - filter parameters
  - tags: [string] - search tags
  - search: string - string for full text search in title, content and creator name
- paging: object - paging parameters
  - paging: bool - (optional) true to enable paging and return total count
  - skip: int - (optional) start of page (default: 0). Operation returns paged result
  - take: int - (optional) page length (max: 100). Operation returns paged result
- callback: (err, page) => void - callback function
  - err: Error - occured error or null for success
  - page: DataPage<ImageSetV1> - retrieved page of ImageSet objects

### <a name="operation2"></a> getImageSetById(correlationId, imagesetId, callback)

Retrieves imageset by its unique id. 

**Arguments:** 
- correlationId: string - id that uniquely identifies transaction
- imagesetId: string - unique imageset id
- callback: (err, imageset) => void - callback function
  - err: Error - occured error or null for success
  - imageset: ImageSetV1 - retrieved ImageSet object

### <a name="operation3"></a> createImageSet(correlationId, imageset, callback)

Creates an imageset

**Arguments:** 
- correlationId: string - id that uniquely identifies transaction
- imageset: ImageSetV1 - a imageset to be created
- callback: (err, imageset) => void - callback function
  - err: Error - occured error or null for success
  - imageset: ImageSetV1 - created ImageSet object
 
### <a name="operation4"></a> updateImageSet(correlationId, imageset, callback)

Updates an imageset

**Arguments:** 
- correlationId: string - id that uniquely identifies transaction
- imageset: ImageSetV1 - a imageset to be updated
- callback: (err, imageset) => void - callback function
  - err: Error - occured error or null for success
  - imageset: ImageSetV1 - updated ImageSet object
 
### <a name="operation5"></a> deleteImageSetById(correlationId, imagesetId, callback)

Deletes system imageset specified by its unique id.

**Arguments:** 
- correlationId: string - id that uniquely identifies transaction
- imagesetId: string - unique imageset id
- callback: (err) => void - callback function
  - err: Error - occured error or null for success
 
## <a name="client_http"></a> ImageSetsHttpClientV1 class

ImageSetsHttpClientV1 is a client that implements HTTP protocol

```javascript
class ImageSetsHttpClientV1 extends CommandableHttpClient implements IImageSetsClientV1 {
    constructor(config: any);
    setReferences(references);
    open(correlationId, callback);
    close(correlationId, callback);
    getImageSets(correlationId, filter, paging, callback);
    getImageSetById(correlationId, imagesetId, callback);
    createImageSet(correlationId, eedback, user, callback);
    updateImageSet(correlationId, imagesetId, update, user, callback);
    deleteImageSetById(correlationId, imagesetId, callback);
}
```

**Constructor config properties:** 
- connection: object - HTTP transport configuration options
  - type: string - HTTP protocol - 'http' or 'https' (default is 'http')
  - host: string - IP address/hostname binding (default is '0.0.0.0')
  - port: number - HTTP port number

## <a name="client_seneca"></a> ImageSetsSenecaClientV1 class

ImageSetsSenecaClientV1 is a client that implements Seneca protocol

```javascript
class ImageSetsSenecaClientV1 extends CommandableSenecaClient implements IImageSetsClientV1 {
    constructor(config: any);
    setReferences(references);
    open(correlationId, callback);
    close(correlationId, callback);
    getImageSets(correlationId, filter, paging, callback);
    getImageSetById(correlationId, imagesetId, callback);
    createImageSet(correlationId, eedback, user, callback);
    updateImageSet(correlationId, imagesetId, update, user, callback);
    deleteImageSetById(correlationId, imagesetId, callback);
}
```

**Constructor config properties:** 
- connection: object - (optional) Seneca transport configuration options. See http://senecajs.org/api/ for details.
  - type: string - Seneca transport type 
  - host: string - IP address/hostname binding (default is '0.0.0.0')
  - port: number - Seneca port number

## <a name="client_seneca"></a> ImageSetsLambdaClientV1 class

ImageSetsLambdaClientV1 is a client that connects to AWS lambda function

```javascript
class ImageSetsLambdaClientV1 extends CommandableLambdaClient implements IImageSetsClientV1 {
    constructor(config: any);
    setReferences(references);
    open(correlationId, callback);
    close(correlationId, callback);
    getImageSets(correlationId, filter, paging, callback);
    getImageSetById(correlationId, imagesetId, callback);
    createImageSet(correlationId, eedback, user, callback);
    updateImageSet(correlationId, imagesetId, update, user, callback);
    deleteImageSetById(correlationId, imagesetId, callback);
}
```

**Constructor config properties:** 
- connection: object - AWS lambda connection options. 
  - type: string - 'aws'
  - arn: string - Lambda function arn
- credential: object - AWS lambda credential options
  - access_id: string - Amazon access id
  - access_key: string - Amazon secret access key

## <a name="client_seneca"></a> ImageSetsDirectClientV1 class

ImageSetsDirectClientV1 is a client that calls controller directly from the same container.
It can be used in monolythic deployments when multiple microservices run in the same process.

```javascript
class ImageSetsDirectClientV1 extends DirectClient implements IImageSetsClientV1 {
    constructor(config: any);
    setReferences(references);
    open(correlationId, callback);
    close(correlationId, callback);
    getImageSets(correlationId, filter, paging, callback);
    getImageSetById(correlationId, imagesetId, callback);
    createImageSet(correlationId, eedback, user, callback);
    updateImageSet(correlationId, imagesetId, update, user, callback);
    deleteImageSetById(correlationId, imagesetId, callback);
}
```

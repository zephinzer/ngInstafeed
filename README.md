# ngInstafeed
Lightweight no-jQuery pure AngularJS wrapper for the Instafeed module (http://instafeedjs.com/ || https://github.com/stevenschobert/instafeed.js)

## Installation
### via Bower
```
bower install ngInstafeed
```

### include files
```
<script src="path/to/bower_components/instafeed.js/instafeed.min.js"></script>
<script src="path/to/bower_components/ng-instafeed/ng-instafeed.min.js"></script>
```

## Code
### Register an Instagram Key
Go to https://instagram.com/developer/clients/register/ to register an Instagram application. 

Copy the Client ID and configure ngInstagram in the `.config()` section of your Angular module as follows:
```javascript
angular.module('YOUR_MODULE')
/** ... **/
.config([
  ..., 'ngInstafeedProvider', ...,
  function(..., ngInstafeedProvider, ...) {
    ngInstafeedProvider.setClientId('YOUR_CLIENT_ID');
  }
])
/** ... **/
```

If you have an access token instead of a client ID, change the code to:
```javascript
/** ... **/
    ngInstafeedProvider.setAccessToken('ACCESS_TOKEN');
/** ... **/
```

### Call the service
```javascript
angular.module('YOUR_MODULE')
/** ... **/
.controller('YOUR_CONTROLLER', [
  ..., 'ngInstafeed', ...,
  function(..., 'ngInstafeed', ...,) {
    ngInstafeed.get({YOUR_OPTIONS}, function(err, res) {
      if(err) throw err;
      console.log(res); // see what the data is like
    });
  }
])
/** ... **/
```

### Retrieving the Instafeed object
The Instafeed object is accessible at `ngInstafeed.model.instafeed`
The retrieved data is accessible at `ngInstafeed.model.data`
The state of ngInstafeed is accessible at `ngInstafeed.state`

See the /demo folder for more information.

### More on wrapper bindings/defaults
ngInstafeed has been configured to not bind to a DOM (default behaviour of Instafeed), and has been wrapped to handle the error and success callbacks. The utilised fields which you should avoid passing in as options are `accessToken`, `clientId`, `success`, `error`, and `mock`. Check out the other option fields at http://instafeedjs.com/.

## Demo application
The demo application uses a key meant only for the purpose of this demo. To ensure your own application works, please generate your own Instagram client ID so that in the event that my key runs beyond its quota, your application will not be affected.

var fs = require('fs');
//Place all routes here that do not coorespond to the filepath to the file
var customRoutes = {
  '/' : 'views/index.html',
  '/new' : 'views/new.html',
  '/show' : 'views/show.html',
  '/edit' : 'views/edit.html',
  '/gallery' : 'views/gallery.html',
};
var supportedFileTypes = ['css', 'js'];
var supportedImageTypes = ['jpg', 'jpeg', 'png', 'gif'];

module.exports = function(request, response){
  var route = request.url;
  console.log('//////////////////// Looking for route: ',route);
  //Check to see if the route includes /static
  if(route.includes('/static')){
    //Trim the / off the route
    route = route.substr(1);
    //Split route into array to extract file type
    var fileType = route.split('.')[1];
    console.log("File type = ", fileType);
    //var fileType = routeArray[1];
    console.log('Static route');
    var encoding;
    var type;
    //Check to see if the filetype is a supported file type
    console.log(supportedFileTypes.indexOf(fileType));
    console.log(supportedImageTypes.indexOf(fileType));
    if (supportedFileTypes.indexOf(fileType) > -1){
      console.log("utf8");
      encoding = 'utf8';
      type = 'text';
    }
    //Check to see if the filetype is a supported image type
    else if (supportedImageTypes.indexOf(fileType) > -1){
      console.log("no utf8");
      encoding = '';
      type = 'image';
    }
    else{
      console.log("file type not supported");
      response.end();
    }
    console.log("encoding set to", encoding);
    fs.readFile(route, encoding, function(errors, contents){
      //if errors, try to read file as image
      if(errors){
        console.log("errors = ", errors);
        response.end("File not found");
      }
      else{
        console.log('No errors');
        response.writeHead(200, {'Content-type' : `${type}/${fileType}`});
        response.write(contents);
        response.end();
      }
    });
  }
  else if(route in customRoutes){
    console.log('Custom Route');
    console.log(customRoutes[route]);
    fs.readFile(customRoutes[route], 'utf8', function(errors, contents){
      if(errors){
        console.log(errors);
        response.end();
      }
      else{
        response.writeHead(200, {'Content-type' : 'text/html'});
        response.write(contents);
        response.end();
      }
    });
  }
  else{
    console.log("File not found");
    response.end();
  }
}

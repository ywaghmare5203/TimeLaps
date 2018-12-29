'use strict'

var fs = require('fs');
var gphoto2 = require('gphoto2')

var gphoto2 = new gphoto2.GPhoto2();

const timerDelay = 4000

var faker = require("faker");

var appRouter = function (app) {



  app.get('/getCameraDetail', function(req, res) {
    gphoto2.list(function (list) {
    	/*let camera = list[0]
		  if (list.length === 0){
	      console.log('no cameras found')
  	    //process.exit()
  	    res.status(400).send({ message: 'no cameras found' });
		  }
		  else {
		  	let camera = list[0]
        console.log(`Camera Found: ${camera.model}`)
        //callback(null, camera)
        res.status(200).send({ camera: `${camera.model}` });
        return true
		  }
		  res.status(200).send({ camera: `${camera.model}` });*/
		  if (list.length === 0) return;
			  var camera = list[0];
			  console.log('Found', camera.model);
			 
			  // get configuration tree
			  camera.summary(function (er, settings) {
			    console.log(JSON.stringify(settings, false, 3));
			  });
				})

    
    
  });

  app.get('/resp', function(req, res) {
    gphoto2.list(function (list) {
		  if (list.length === 0){
	      console.log('no cameras found')
  	    process.exit()
  	    res.send('respond with a resource if');
		  }
		  else {
		  	console.log(list)
        console.log(`Camera will fire in ${(timerDelay/1000)} seconds`)
		    let camera = list[0]
	      //setTimeout(() => { console.log('Get ready!') }, (timerDelay - 1000), camera)
	      //setTimeout(takePicture, timerDelay, camera)
	      console.log('Camera Firing!')
	      camera.takePicture({
	        download: true,
	        keep: true
	      }, function (er, data) {
	        fs.writeFileSync(__dirname + '/input/picture1.jpg', data);
	      });  
	      res.send('respond with a resource');
	      return true;
		  }

	})

    
    
  });


  app.get("/", function (req, res) {
    res.status(200).send({ message: 'Welcome to our restful API' });
  });

  app.get("/user", function (req, res) {
    var data = ({
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      username: faker.internet.userName(),
      email: faker.internet.email()
    });
    res.status(200).send(data);
  });

 app.get("/users/:num", function (req, res) {
   var users = [];
   var num = req.params.num;

   if (isFinite(num) && num  > 0 ) {
     for (i = 0; i <= num-1; i++) {
       users.push({
           firstName: faker.name.firstName(),
           lastName: faker.name.lastName(),
           username: faker.internet.userName(),
           email: faker.internet.email()
        });
     }

     res.status(200).send(users);
    
   } else {
     res.status(400).send({ message: 'invalid number supplied' });
   }

 });
}

module.exports = appRouter;

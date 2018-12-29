'use strict'

var fs = require('fs')
var gphoto2 = require('gphoto2')


//Returns the first camera found
function findFirst(callback){

    var GPhoto = new gphoto2.GPhoto2();
    GPhoto.setLogLevel(2);

    // List cameras / assign list item to variable to use below options
    GPhoto.list(function (list) {

        if (list.length === 0){ 
            return callback(true, null)
        } else {
            let camera = list[0]
            console.log(`Camera Found: ${camera.model}`)
            callback(null, camera)
        }                            
    })
    

}    

function takePhoto(camera, filePath, timeout, callback){
    console.log("filepath :" +filepath);

    if(timeout){
        
        console.log(`Photo will fire in ${(timeout/1000)}sec`)

        setTimeout(takePhoto, timeout, camera, filePath, false)

    } else {


        console.log('Say Cheese!')
        //Take picture immediately
        camera.takePicture({
            download: true,
            keep: true
            }, function (er, data) {

            fs.writeFileSync(filePath, data)

            //Just return with the filepath created
            callback(null, filePath)

        });

    }        


}



module.exports = {

    findFirst: findFirst,
    takePhoto: takePhoto
}


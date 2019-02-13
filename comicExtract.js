//Imports unzip, unrar, fs, and readline
const unzip = require('unzip')
const unrar = require('unrar.js')
const fs = require('fs')
const readline = require('readline')

//Sets up for getting input
var fileName = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

//Asks what the file name is
fileName.question('File name > ', (res) => {

    //If the file name ends in .cbz, perform the unzip function
    if (res.endsWith('.cbz')){
        unzipComic(res)
    }
    //If the file ends in .cbr, perform the unrar function
    if (res.endsWith('.cbr')){
        unrarComic(res)
    }

    //Close the file
    fileName.close()
})

//Inherits file name, displays error if there is any, extracts the comic into the folder the same name as the file name
function unzipComic(file) {
    fs.createReadStream(file, function(err){
        if (err){
            console.log(err)
        }
    }).pipe(unzip.Extract({path: file}))
}

//Same thing as unzip but it's unrar
function unrarComic(file) {
    unrar.unrar(file, file.slice(0, -4), function(err) {
        if (err) {
            console.log("There's an error: " + err)
        }
    })
}
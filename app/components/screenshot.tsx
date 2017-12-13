/*
 Simple utility function for packaging up a react component render into an HTML file.
 */

declare var require:any;

var fs = require('fs');
var sh = require('shelljs')
const phantom = require('phantom')
const resemble = require('node-resemble-js')

const dir = 'build/screenshots'
const compareDir = 'test/screenshots'
const stylePath = '../../dist/style.css'

const createFileUrl = function(p) {
    var processDir = sh.pwd()
    processDir = processDir.replace(/\\/g, '/');
    return 'file:///'+processDir + '/'+ dir + p;
}


const writeHtml = function(filename, contents, containerClass = 'module-wrapper', font = 'normal', aspect = 'light-contrast') {
    const after = "</div></body></html>"
    const before = "<!DOCTYPE html><html class='"+font+"' lang='en'>"+
        "<head><title>"+filename+"</title><link id='full-css-bundle' rel='stylesheet' type='text/css' href='"+stylePath+"'></head>"+
        "<body class=\"symphony-external-app "+aspect+"\">"+
        "<div class=\""+containerClass+"\">"
    if (!fs.existsSync('build')) {
        fs.mkdirSync('build')
    }
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir)
    }

    const outFile = dir + "/"+ filename+".html";
    fs.writeFileSync(outFile, before + contents + after)
    return outFile;
}

const writeAndCompare = function(filename, contents, done, containerClass = 'module-wrapper', font = 'normal', aspect = 'light-contrast') {
    writeHtml(filename, contents, containerClass, font, aspect)
    writePng(filename+'.html', filename+'.png', function(pngFileWritten) {
        const compareFile = compareDir  + filename+'.png'
        // console.log('doing resemble between '+pngFileWritten+' and '+compareFile)

       try {
           resemble(pngFileWritten).compareTo(compareFile).onComplete(function (data) {
               // console.log("resemble success!")
               if (data.misMatchPercentage > 4) {
                   console.log(data);
                   done('Image too different: '+filename)
               } else {
                   done()
               }
           })
       } catch (e) {
           done(e)
       }
    })
}



const writePng = function(htmlFile, pngFile, done) {
    var sitepage = null;
    var phInstance = null;

    const url = createFileUrl(htmlFile)
    const outputFilename = dir +pngFile
   // console.log("the url"+url)
   // console.log("the file"+outputFilename)

    phantom.create()
        .then(instance => {
            phInstance = instance;
            return instance.createPage();
        })
        .then(page => {
            // console.log('aquired instance')
            sitepage = page;
            return page.open(url);
        })
        .then(status => {
            // console.log('opened url'+status);
            return sitepage.property('clipRect', {top: 0, left: 0, width: 500, height: 500});
        })
        .then(function() {
            // console.log('set cliprect');
            return sitepage.render(outputFilename)
        })
        .then(function(finished) {
            // console.log('finished writing '+outputFilename)
            done(outputFilename);
            sitepage.close();
            phInstance.exit();
            phantom.exit();
        });
}

const writeVariations = function(filename, contents, done, containerClass) {
    writeAndCompare(filename+"-LightNormal", contents, done, containerClass, 'normal', 'light')
//    write(filename+"-DarkXSmall", contents, containerClass, 'xsmall', 'dark')
//    write(filename+"-LightContrastSmall", contents, containerClass, 'normal', 'light-contrast')
//    write(filename+"-DarkContrastLarge", contents, containerClass, 'large', 'dark-contrast')
}

export {writeAndCompare, writeVariations}
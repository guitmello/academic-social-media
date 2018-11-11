const fs = require('fs')
const { promisify } = require('util')
const writeFileAsync = promisify(fs.writeFile)

const base64ToPNG = (data) => {
    const replaced = data.replace(/^data:image\/\w+;base64,/, "");
    const buffer = new Buffer(replaced, 'base64')
    return buffer
}

const savePNGToDisk = (data, path) => {
    writeFileAsync(path, data)
}

const generateFileName = (length = 20) => {
    let text = "";
    const samples = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < length; i++)
        text += samples.charAt(Math.floor(Math.random() * samples.length));

    return `/img/${text}.png`;
}

module.exports = {
    base64ToPNG,
    savePNGToDisk,
    generateFileName
}
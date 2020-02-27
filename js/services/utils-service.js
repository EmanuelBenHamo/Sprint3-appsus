import storageService from './storage.service.js';

export default {
    store,
    load,
    getRandomInt,
    makeId
}

function store(key, value) {
    storageService.store(key, value);
}

function load(key) {
    return storageService.load(key);
}

function getRandomInt(min, max){
    return Math.floor(Math.random() * (max - min + 1) + min );
}

function makeId(length = 5)
{
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for(var i=0; i < length; i++)
    {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
}
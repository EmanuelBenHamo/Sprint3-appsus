import {storageService} from './storage.service.js';

export const utilService = {
    store,
    load,
    randomInt
}

function store(key, value) {
    storageService.store(key, value);
}

function load(key) {
    return storageService.load(key);
}

function randomInt(min, max){
    return Math.floor(Math.random() * (max - min) + min )
}
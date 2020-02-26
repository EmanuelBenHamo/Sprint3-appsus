import {storageService} from './storage.service.js';

export const utilService = {
    store,
    load
}

function store(key, value) {
    storageService.store(key, value);
}

function load(key) {
    return storageService.load(key);
}
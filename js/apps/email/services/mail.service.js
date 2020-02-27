'use strict'

import {utilService} from '../../../services/utils-service.js';
import {fakeMails} from '../services/mail-fake-data.js';\

const MAILS_KEY = 'mails';

var mailsDB = [];

export const mailService = {
    addMail,
    getMails,
    updateMail,
    removeMail
};

function getMails() {
    let mails = utilService.load(MAILS_KEY);

    if (!mails) {
        mails = fakeMails;
        utilService.store(MAILS_KEY, mails);
    }
    mailsDB = mails;
    return Promise.resolve(mailsDB);
}

function addMail(mail) {
    mailsDB.unshift(mail);
    utilService.store(MAILS_KEY, mailsDB);
    return Promise.resolve(mail);
}

function removeMail(mailId) {
    let mailIdx = mailsDB.findIndex(mail => mail.id === mailId);
    let removedMail = notesDB.splice(mailIdx, 1)[0];
    utilService.store(MAILS_KEY, mailsDB);
    return Promise.resolve(removedMail);
}

function updateMail(updatedMail) {
    let mailIdx = mailsDB.findIndex(mail => mail.id === updatedMail.id);
    mailsDB.splice(mailIdx, 1, updatedMail);
    utilService.store(MAILS_KEY, mailsDB);
    return Promise.resolve(updatedMail);
}
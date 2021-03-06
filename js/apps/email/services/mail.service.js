'use strict'

import utilService from '../../../services/utils-service.js';
import { fakeMails } from '../services/mail-fake-data.js';

const MAILS_KEY = 'mails';
const MAIL_STATE = {
    read: 'read',
    unread: 'unread',
    draft: 'draft',
    sent: 'sent'
}

var mailsDB = [];

function getMails() {
    let mails = utilService.load(MAILS_KEY);
    
    if (!mails) {
        mails = fakeMails;
        utilService.store(MAILS_KEY, mails);
    }
    mailsDB = mails;
    return Promise.resolve(mailsDB);
}

function getMailById(mailId){
    let mail = mailsDB.find(mail => mail.id === mailId);
    return Promise.resolve(mail);
}

function getEmptyMail(){
    let emptyMail =  {
        subject: '',
        from: 'me@gmail.com',
        to: '',
        cc: '',
        bcc: '',
        body: ''
    };

    return Promise.resolve(emptyMail);
}

function addMail(mail) {
    mail.id = utilService.makeId(utilService.getRandomInt(5, 10));
    mailsDB.unshift(mail);
    utilService.store(MAILS_KEY, mailsDB);
    return Promise.resolve(mail);
}

function removeMail(mailId) {
    let mailIdx = mailsDB.findIndex(mail => mail.id === mailId);
    let removedMail = mailsDB.splice(mailIdx, 1)[0];
    utilService.store(MAILS_KEY, mailsDB);
    return Promise.resolve(removedMail);
}

function updateMail(updatedMail) {
    let mailIdx = mailsDB.findIndex(mail => mail.id === updatedMail.id);
    mailsDB.splice(mailIdx, 1, updatedMail);
    utilService.store(MAILS_KEY, mailsDB);
    return Promise.resolve(updatedMail);
}


export default {
    MAIL_STATE,
    addMail,
    getMails,
    getMailById,
    getEmptyMail,
    updateMail,
    removeMail,
  
};
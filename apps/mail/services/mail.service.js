import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'
const MAIL_KEY = 'mailDB'

export const mailService = {
  query,
  getMailById,
  remove,
  get,
  save,
  getEmptyMail,
}

_createMails()

function getMailById(mailId) {
  return storageService.get(MAIL_KEY, mailId)
}

function query() {
  return storageService.query(MAIL_KEY)
}

// const gSentEmail = {
//   id: 'e101',
//   subject: 'Miss you!',
//   body: 'Would love to catch up sometimes',
//   isRead: false,
//   sentAt: 1551133930594,
//   removedAt: null,
//   from: 'momo@momo.com',
//   to: 'user@appsus.com',
// }

// const criteria = {
//   status: 'inbox/sent/trash/draft',
//   txt: 'puki', // no need to support complex text search
//   isRead: true, // (optional property, if missing: show all)
//   isStared: true, // (optional property, if missing: show all)
//   lables: ['important', 'romantic'], // has any of the labels
// }

function get(mailId) {
  return storageService.get(MAIL_KEY, mailId)
}

function save(mail) {
  if (mail.id) {
    return storageService.put(MAIL_KEY, mail)
  } else {
    return storageService.post(MAIL_KEY, mail)
  }
}

function remove(mailId) {
  return storageService.remove(MAIL_KEY, mailId)
}

function getEmptyMail(from) {
  return {
    id: utilService.makeId(),
    subject: '',
    body: '',
    isRead: false,
    sentAt: Date.now(),
    removedAt: null,
    from,
    to: '',
    isStared: false,
    labels: [],
  }
}
const loggedInUser = {
  email: 'user@appsus.com',
  fullname: 'User Appsus',
}

function _createMail(from) {
  const mail = getEmptyMail(from)
  mail.id = utilService.makeId()
  mail.subject = utilService.makeLorem(4)
  mail.body = utilService.makeLorem(100)
  mail.sentAt = Date.now()
  mail.from = from
  mail.to = 'user@appsus.com'
  return mail
}

function _createMails() {
  let mails = utilService.loadFromStorage(MAIL_KEY)
  if (!mails || !mails.length) {
    mails = []
    mails.push(_createMail('momo@momo.com'))
    mails.push(_createMail('guyShilon@apsus.com'))
    mails.push(_createMail('ylcN@apsus.com'))
    utilService.saveToStorage(MAIL_KEY, mails)
  }
}

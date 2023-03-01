import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'
const MAIL_KEY = 'mailDB'

const TRASH_KEY = 'trashDB'

export const mailService = {
  query,
  // getMailById,
  remove,
  get,
  save,
  getEmptyMail,
  removeToTrash,
  updateIsRead,
}

const gMails = _createMails()
console.log('gMails', gMails)

function query() {
  return storageService.query(MAIL_KEY)
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
    isTrash: false,
    from,
    to: 'user@appsus.com',
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
  mail.subject = utilService.makeLorem(10)
  mail.body = utilService.makeLorem(100)
  mail.sentAt = Date.now()
  mail.from = from
  mail.isTrash = false
  mail.to = 'user@appsus.com'
  return mail
}

function _createMails() {
  let mails = utilService.loadFromStorage(MAIL_KEY)
  if (!mails || !mails.length) {
    mails = []
    console.log('mails', mails)
    mails.push(_createMail('momo@momo.com'))
    mails.push(_createMail('guyShilon@apsus.com'))
    mails.push(_createMail('ylcN@apsus.com'))
    utilService.saveToStorage(MAIL_KEY, mails)
  }
}

function removeToTrash(mailId) {
  const mail = getMailById(mailId)
  mail.removedAt = Date.now()
  mail.id = mailId
  mail.isTrash = true
  utilService.saveToStorage(TRASH_KEY, mail)
  remove(mailId)
}

function get(mailId) {
  return storageService.get(MAIL_KEY, mailId).then(setTrashMails)
}

function setTrashMails(mail) {
  mail.isTrash = true
  return mail
}

function updateIsRead(mailId) {
  console.log('mailId', mailId)
  const currMail = getMailById(mailId)
  currMail.isRead = true
  save(currMail)
}

function getMailById(mailId) {
  const mails = utilService.loadFromStorage(MAIL_KEY)
  const mail = mails.find((mail) => mail.id === mailId)
  return mail
}

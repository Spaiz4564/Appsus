import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'
const MAIL_KEY = 'mailDB'

export const mailService = {
  query,
  remove,
  get,
  getEmptyMail,
  updateIsRead,
  removeToTrash,
  getMailById,
  save,
  sendMail,
  // addMail,
  saveToDraft,
  updateStarMail,
}

const gLoggedinUser = {
  email: 'ylcN@appsus.com',
  fullname: 'Mahatma Appsus',
}

_createMails()

function query() {
  return storageService.query(MAIL_KEY)
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
    isSent: false,
    removedAt: null,
    isTrash: false,
    from,
    to: gLoggedinUser.email,
    isStared: false,
    labels: [],
  }
}

function _createMail(from, sentAt) {
  const mail = getEmptyMail(from)
  mail.id = utilService.makeId()
  mail.subject = utilService.makeLorem(5)
  mail.body = utilService.makeLorem(100)
  mail.sentAt = sentAt
  mail.from = from
  mail.isTrash = false
  mail.isSent = false
  mail.labels = []

  mail.isRead = false
  mail.isStared = false
  mail.to = gLoggedinUser.email
  return mail
}

function _createMails() {
  let mails = utilService.loadFromStorage(MAIL_KEY)
  if (!mails || !mails.length) {
    mails = []
    console.log('mails', mails)
    //today date
    const today = new Date()
    //yesterday date
    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)
    //last week date
    const lastWeek = new Date(today)
    lastWeek.setDate(lastWeek.getDate() - 7)
    //last month date
    const lastMonth = new Date(today)
    lastMonth.setDate(lastMonth.getDate() - 30)

    //last year date
    const lastYear = new Date(today)
    lastYear.setDate(lastYear.getDate() - 365)

    mails.push(_createMail('Guy@appsus.com', today))
    mails.push(_createMail('Lior@appsus.com', today))
    mails.push(_createMail('Ilan@appsus.com', today))
    mails.push(_createMail('TalTheBest@appsus.com', lastWeek))
    mails.push(_createMail('Bar@appsus.com', lastMonth))
    mails.push(_createMail('Dor@appsus.com', lastYear))

    utilService.saveToStorage(MAIL_KEY, mails)
  }
}

function removeToTrash(mailId) {
  const currMail = getMailById(mailId)
  if (currMail.isTrash) {
    remove(mailId)
    return
  }
  currMail.isTrash = true
  currMail.removedAt = Date.now()
  save(currMail)
}

function get(mailId) {
  return storageService.get(MAIL_KEY, mailId)
}

function updateIsRead(mailId) {
  const currMail = getMailById(mailId)
  currMail.isRead = true
  save(currMail)
}

function getMailById(mailId) {
  const mails = utilService.loadFromStorage(MAIL_KEY)
  const mail = mails.find((mail) => mail.id === mailId)
  return mail
}

function save(mail) {
  if (mail.id) return storageService.put(MAIL_KEY, mail)
  else return storageService.post(MAIL_KEY, mail)
}

function sendMail(mail) {
  mail.isSent = true
  mail.isDraft = false
  mail.isTrash = false
  mail.isRead = false
  mail.isStared = false
  mail.from = gLoggedinUser.email
  mail.sentAt = Date.now()
  save(mail)
}

function saveToDraft(mail) {
  mail.isDraft = true
  mail.isTrash = false
  mail.isRead = false
  mail.isStared = false
  mail.from = gLoggedinUser.email
  mail.sentAt = Date.now()
  save(mail)
}

function updateStarMail(mailId) {
  const mail = getMailById(mailId)
  mail.isStared = true
  save(mail)
}

function addTag(mailId, tag) {
  const mail = getMailById(mailId)
  mail.labels.push(tag)
  save(mail)
}

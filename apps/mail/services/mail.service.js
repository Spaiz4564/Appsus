import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'
const MAIL_KEY = 'mailDB'

const TRASH_KEY = 'trashDB'

export const mailService = {
  query,
  queryTrash,
  remove,
  get,
  save,
  getEmptyMail,
  updateIsRead,
  removeToTrash,
}

_createMails()

function query(criteria = {}) {
  return storageService.query(MAIL_KEY).then((mails) => {
    if (criteria.isRead) {
      mails = mails.filter((mail) => mail.isRead === criteria.isRead)
    }
    if (criteria.subject) {
      mails = mails.filter((mail) => mail.subject.includes(criteria.subject))
    }
    if (criteria.isTrash) {
      mails = mails.filter((mail) => mail.isTrash === criteria.isTrash)
    }
    return mails
  })
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

function _createMail(from, sentAt) {
  const mail = getEmptyMail(from)
  mail.id = utilService.makeId()
  mail.subject = utilService.makeLorem(5)
  mail.body = utilService.makeLorem(100)
  mail.sentAt = sentAt
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
  const mail = getMailById(mailId)
  mail.removedAt = Date.now()
  mail.id = mailId
  mail.isTrash = true
  save(mail)
}

function get(mailId) {
  return storageService.get(MAIL_KEY, mailId)
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

function queryTrash() {
  return storageService.query(TRASH_KEY)
}

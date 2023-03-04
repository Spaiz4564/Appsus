import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'

const note_KEY = 'noteDB'

export const noteService = {
  createNoteImg,
  createNoteList,
  saveNote,
  createNewNote,
  query,
  get,
  save,
  remove,
}
_createNotes()

function get(noteId) {
  return storageService.get(note_KEY, noteId)
}

function remove(noteId) {
  return storageService.remove(note_KEY, noteId)
}

function save(note) {
  if (note.id) {
    return storageService.put(note_KEY, note)
  } else {
    return storageService.post(note_KEY, note)
  }
}

function createNewNote() {
  return {
    id: utilService.makeId(4),
    createdAt: 1112222,
    type: 'NoteTxt',
    isPinned: false,
    style: {
      backgroundColor: getColor(),
    },
    info: {
      title: '',
      txt: '',
    },
  }
}

function createNoteImg() {
  return {
    id: '',
    type: 'NoteImg',
    isPinned: false,
    info: {
      url: 'https://source.unsplash.com/random/200x200?sig=1',
      title: '',
      txt: '',
    },
    style: {
      backgroundColor: getColor(),
    },
  }
}

function createNoteList() {
  return {
    id: '',
    type: 'NoteTodos',
    isPinned: false,
    style: {
      backgroundColor: getColor(),
    },
    info: {
      txt: '',
      title: '',
      todos: [],
    },
  }
}

function saveNote(note) {
  return storageService.post(note_KEY, note).then(note => {
    return note
  })
}

function _createNotes() {
  let notes = utilService.loadFromStorage(note_KEY)
  if (!notes || !notes.length) {
    notes = [
      {
        id: 'n101',
        createdAt: 1112222,
        type: 'NoteTxt',
        isPinned: true,
        style: {
          backgroundColor: getColor(),
        },
        info: {
          title: 'Note title',
          txt: 'Fullstack Me Baby!',
        },
      },
      {
        id: 'n102',
        type: 'NoteImg',
        isPinned: false,
        info: {
          url: 'http://some-img/me',
          title: 'Bobi and Me',
          txt: 'Wow ahi',
        },
        style: {
          backgroundColor: getColor(),
        },
      },
      {
        id: 'n103',
        type: 'NoteTodos',
        isPinned: false,
        style: {
          backgroundColor: getColor(),
        },
        info: {
          txt: 'This is a note',
          title: 'Get my stuff together',
          todos: [
            { txt: 'Driving license', doneAt: null },
            { txt: 'Coding power', doneAt: 187111111 },
          ],
        },
      },
      {
        id: 'n104',
        type: 'NoteTodos',
        isPinned: false,
        style: {
          backgroundColor: getColor(),
        },
        info: {
          txt: 'This is a note',
          title: 'Finish sprint 3',
          todos: [
            { txt: 'Driving license', doneAt: null },
            { txt: 'Coding power', doneAt: 187111111 },
          ],
        },
      },
    ]

    utilService.saveToStorage(note_KEY, notes)
  }
}

function query(filterBy = {}) {
  return storageService.query(note_KEY).then(notes => {
    if (filterBy.txt) {
      const regex = new RegExp(filterBy.txt, 'i')
      notes = notes.filter(note => regex.test(note.vendor))
    }
    if (filterBy.minSpeed) {
      notes = notes.filter(note => note.maxSpeed >= filterBy.minSpeed)
    }
    return notes
  })
}

function getColor() {
  var colors = [
    '#f28b82',
    '#fbbc04',
    '#fff475',
    '#ccff90',
    '#a7ffeb',
    '#cbf0f8',
    '#aecbfa',
    '#d7aefb',
    '#fdcfe8',
    '#e6c9a8',
    '#e8eaed',
    '#ffffff',
  ]

  return colors[Math.floor(Math.random() * colors.length)]
}

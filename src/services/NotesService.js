import { dbContext } from "../db/DbContext.js"

class NotesService {
  async createNote(noteData) {
    const createNote = await dbContext.Notes.create(noteData)
    await createNote.populate('creator')
    return createNote
  }

  async getNotesByBugId(bugId) {
    const notes = await dbContext.Notes.find({ bugId: bugId })
    return notes
  }
}

export const notesService = new NotesService()
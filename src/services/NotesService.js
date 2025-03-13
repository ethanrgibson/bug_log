import { dbContext } from "../db/DbContext.js"

class NotesService {
  async createNote(noteData) {
    const createNote = await dbContext.Notes.create(noteData)
    await createNote.populate('creator')
    return createNote
  }

}

export const notesService = new NotesService()
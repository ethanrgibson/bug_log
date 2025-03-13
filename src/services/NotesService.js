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

  async deleteNote(noteId, userInfo) {
    const noteToDelete = await dbContext.Notes.findById(noteId)
    if (noteToDelete.creatorId != userInfo.id) {
      throw new Error('cannot delete a bug you did not create')
    }
    await noteToDelete.deleteOne()
    return `${noteToDelete} note was deleted`
  }

}


export const notesService = new NotesService()
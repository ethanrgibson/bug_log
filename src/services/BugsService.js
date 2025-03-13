import { dbContext } from "../db/DbContext.js"

class BugsService {
  async createBug(bugData) {
    const createdBug = await dbContext.Bugs.create(bugData)
    await createdBug.populate('creator')
    return createdBug
  }
}


export const bugService = new BugsService()
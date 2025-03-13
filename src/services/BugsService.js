import { dbContext } from "../db/DbContext.js"

class BugsService {
  async createBug(bugData) {
    const createdBug = await dbContext.Bugs.create(bugData)
    await createdBug.populate('creator')
    return createdBug
  }

  async getAllBugs() {
    const bugs = await dbContext.Bugs.find()
    return bugs
  }
}


export const bugService = new BugsService()
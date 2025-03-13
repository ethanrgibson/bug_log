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


  async getBugById(bugId) {
    const bug = await dbContext.Bugs.findById(bugId).populate('creator')

    if (bug == null) {
      throw new Error('Bug does not exist, loser!')
    }
    return bug
  }
}


export const bugService = new BugsService()
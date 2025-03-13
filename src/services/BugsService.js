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

  async updateBug(bugId, bugData, userInfo) {
    const bugToUpdate = await dbContext.Bugs.findById(bugId).populate('creator')

    if (bugToUpdate.creatorId != userInfo.id) {
      throw new Error('you cannot update another users bug')
    }
    bugToUpdate.title = bugData.title ?? bugToUpdate.title
    bugToUpdate.description = bugData.description ?? bugToUpdate.description

    await bugToUpdate.save()

    return bugToUpdate
  }

  async deleteBug(bugId, userInfo) {
    const bugToDelete = await this.getBugById(bugId)
    if (bugToDelete.creatorId != userInfo.id) {
      throw new Error('cannot delete a bug you did not create')
    }
    await bugToDelete.deleteOne()
    return `${bugToDelete} bug was deleted`
  }

}


export const bugService = new BugsService()
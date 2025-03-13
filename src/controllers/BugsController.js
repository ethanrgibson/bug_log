
import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { bugService } from "../services/BugsService.js";
import { notesService } from "../services/NotesService.js";

export class BugsController extends BaseController {

  constructor() {
    super('api/bugs')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createBug)
      .get('', this.getAllBugs)
      .get('/:bugId', this.getBugById)
      .put('/:bugId', this.updateBug)
      .delete('/:bugId', this.deleteBug)
      .get('/:bugId/notes', this.getNotesByBugId)



  }


  async createBug(request, response, next) {

    try {
      const bugData = request.body
      const userInfo = request.userInfo
      bugData.creatorId = userInfo.id
      const createdBug = await bugService.createBug(bugData)
      response.send(createdBug)
    } catch (error) {
      next(error)
    }
  }

  async getAllBugs(request, response, next) {
    try {
      const bugs = await bugService.getAllBugs()
      response.send(bugs)
    } catch (error) {
      next(error)
    }
  }

  async getBugById(request, response, next) {
    try {
      const bugId = request.params.bugId
      const bug = await bugService.getBugById(bugId)
      response.send(bug)
    } catch (error) {
      next(error)
    }

  }

  async updateBug(request, response, next) {
    try {
      const bugId = request.params.bugId
      const bugData = request.body
      const userInfo = request.userInfo
      const updateBug = await bugService.updateBug(bugId, bugData, userInfo)
      response.send(updateBug)
    } catch (error) {
      next(error)
    }
  }

  async deleteBug(request, response, next) {
    try {
      const bugId = request.params.bugId
      const userInfo = request.userInfo
      const message = await bugService.deleteBug(bugId, userInfo)
      response.send(message)

    } catch (error) {
      next(error)
    }
  }

  async getNotesByBugId(request, response, next) {
    try {
      const bugId = request.params.bugId
      const note = await notesService.getNotesByBugId(bugId)
      response.send(note)
    } catch (error) {
      next(error)
    }
  }

}
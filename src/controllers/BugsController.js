
import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { bugService } from "../services/BugsService.js";

export class BugsController extends BaseController {

  constructor() {
    super('api/bugs')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createBug)
      .get('', this.getAllBugs)

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


}
const { createContainer, asClass, asValue, asFunction } = require('awilix');

//Config
const config = require('../config');
const app = require('.');

//Services
const { HomeService } = require('../services');

//Controllers
const { HomeController } = require('../controllers');

//Routes
const { HomeRoutes } = require('../routes/index.routes');
const Routes = require('../routes');

//Models
const { User, Comment, Idea } = require('../models');

//Repositories
const {
  UserRepository,
  IdeaRepository,
  CommentRepository,
} = require('../repositories');

const container = createContainer();

container
  .register({
    app: asClass(app).singleton(),
    router: asFunction(Routes).singleton(),
    config: asValue(config),
  })
  .register({
    HomeService: asClass(HomeService).singleton(),
  })
  .register({
    HomeController: asClass(HomeController.bind(HomeController)).singleton(),
  })
  .register({
    HomeRoutes: asFunction(HomeRoutes).singleton(),
  })
  .register({
    User: asValue(User),
    Comment: asValue(Comment),
    Idea: asValue(Idea),
  })
  .register({
    UserRepository: asClass(UserRepository).singleton(),
    IdeaRepository: asClass(IdeaRepository).singleton(),
    CommentRepository: asClass(CommentRepository).singleton(),
  });

module.exports = container;

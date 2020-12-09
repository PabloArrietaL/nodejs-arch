const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const { ErrorMiddleware, NotFoundMiddleware } = require('../middlewares');
require('express-async-errors');

module.exports = ({
  HomeRoutes,
  UserRoutes,
  IdeaRoutes,
  CommentRoutes,
  AuthRoutes,
}) => {
  const router = express.Router();
  const apiRoutes = express.Router();

  apiRoutes.use(express.json()).use(cors()).use(helmet()).use(compression());

  apiRoutes.use('/home', HomeRoutes);
  apiRoutes.use('/user', UserRoutes);
  apiRoutes.use('/idea', IdeaRoutes);
  apiRoutes.use('/comment', CommentRoutes);
  apiRoutes.use('/auth', AuthRoutes);

  router.use('/v1/api', apiRoutes);
  router.use(ErrorMiddleware);
  router.use(NotFoundMiddleware);

  return router;
};

const BaseService = require('./base.service');

let _ideaRepository = null;

class IdeaService extends BaseService {
  constructor({ IdeaRepository }) {
    super(IdeaRepository);
    _ideaRepository = IdeaRepository;
  }

  async getUserIdeas(author) {
    if (!author) {
      const error = new Error();
      error.status = 400;
      error.message = 'UserId must be sent';
      throw error;
    }
    return await _ideaRepository.getUserIdeas(author);
  }

  async upvotesIdea(ideaId) {
    if (!ideaId) {
      const error = new Error();
      error.status = 400;
      error.message = 'IdeaId must be sent';
      throw error;
    }

    const idea = _ideaRepository.get(ideaId);

    if (!idea) {
      const error = new Error();
      error.status = 404;
      error.message = 'Idea does not exist';
      throw error;
    }

    idea.upvotes.push(true);

    return await _ideaRepository.update(ideaId, { upvotes: idea.upvotes });
  }

  async downvotesIdea(ideaId) {
    if (!ideaId) {
      const error = new Error();
      error.status = 400;
      error.message = 'IdeaId must be sent';
      throw error;
    }

    const idea = _ideaRepository.get(ideaId);

    if (!idea) {
      const error = new Error();
      error.status = 404;
      error.message = 'Idea does not exist';
      throw error;
    }

    idea.downvotes.push(true);

    return await _ideaRepository.update(ideaId, { downvotes: idea.upvotes });
  }
}

module.exports = IdeaService;

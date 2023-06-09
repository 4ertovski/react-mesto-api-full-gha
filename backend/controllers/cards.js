const cardSchema = require('../models/card');
const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');
const ForbiddenError = require('../errors/ForbiddenError');

module.exports.getCards = (req, res, next) => {
  cardSchema
    .find({})
    .then((cards) => res.status(200)
      .send(cards))
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const {
    name,
    link,
  } = req.body;
  const owner = req.user._id;

  cardSchema
    .create({
      name,
      link,
      owner,
    })
    .then((card) => res.status(201)
      .send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные при создании карточки'));
      } else {
        next(err);
      }
    });
};

module.exports.deleteCard = (req, res, next) => {
  const { cardId } = req.params;

  cardSchema.findById(cardId)
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка не найдена');
      }
      if (!card.owner.equals(req.user._id)) {
        return next(new ForbiddenError('Вы не можете удалить чужую карточку'));
      }
      return card.deleteOne().then(() => res.send({ message: 'Карточка успешно удалена' }));
    })
    .catch(next);
};

module.exports.addLike = (req, res, next) => {
  cardSchema
    .findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true },
    )
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка не найдена');
      }
      res.send({ /* data: */ card });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequestError('Переданы некорректные данные для постановки лайка'));
      }
      return next(err);
    });
};

module.exports.deleteLike = (req, res, next) => {
  cardSchema
    .findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } },
      { new: true },
    )
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Пользователь не найден');
      }
      res.send({ /* data: */ card });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequestError('Переданы некорректные данные для удаления лайка'));
      }
      return next(err);
    });
};

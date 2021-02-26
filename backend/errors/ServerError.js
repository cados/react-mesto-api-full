class ServerError extends Error {
  constructor(message) {
    super();
    this.message = message;
    this.statusCode = 500;
  }
}

module.exports = ServerError;

// const deleteCard = (req, res, next) => {
//   console.log(req.params);
//   Card.findById(req.params.id)
//     .then((card) => {
//       if (!card) {
//         throw new NotFoundError('Нет карточки с таким id');
//       }
//       if (card.owner.toString() !== req.user._id) {
//         throw new BadRequestError('Нет прав на удаление карточки');
//       } else {
//         Card.findByIdAndDelete(req.params.id)
//           // eslint-disable-next-line no-shadow
//           .then((card) => {
//             res.status(200).send(card);
//           })
//           .catch(next);
//       }
//     })
//     .catch((err) => {
//       if (err.name === 'DocumentNotFoundError') {
//         throw new NotFoundError({ message: 'Нет пользователя с таким Id' });
//       } else if (err.name === 'CastError') {
//         throw new BadRequestError({ message: `Введены некорректные данные: ${err.name}` });
//       } else {
//         throw new ServerError({ message: `Внутренняя ошибка сервера: ${err}` });
//       }
//     });
// };

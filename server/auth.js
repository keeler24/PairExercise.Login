const router = require('express').Router();
const { User } = require('./db');
module.exports = router;

// auth routes go below!
router.put('/login', (req, res, next) => {
  // req.session
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ where: { email, password } })
    .then(user => {
      if (user) {
        req.session.userId = user.id;
        res.json(user);
      } else {
        const notFound = new Error('Incorrect email or password!');
        notFound.status = 401;
        next(notFound);
      }
    })
    .catch(next);
});

router.get('/me', (req, res, next) => {
  if (req.session.userId) {
    User.findOne({
      where: {
        id: req.session.userId,
      },
    })
      .then(user => {
        if (user) {
          res.json(user);
        } else {
          const notFound = new Error('Not found');
          notFound.status = 404;
          next(notFound);
        }
      })
      .catch(err => console.error(err));
  } else {
    res.sendStatus(404);
  }
});

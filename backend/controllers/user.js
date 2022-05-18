const bcrypt = require('bcrypt');

// pour la creation de token
const jwt = require('jsonwebtoken');

const User = require('../models/User');


// fct asynchrone pour creer un nouveau user
// crypter le mdp
exports.signup = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then(hash => {
      const user = new User({
        email: req.body.email,
        password: hash
      });
      user.save()
        .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
        .catch(error => {
          console.log(error);
          res.status(400).json({ error })
        });
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ error })
    });

};
// fct asynchrone pour login
// verifier si les identifiants correspondent avec le hash de la base de données
exports.login = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then(user => {
      if (!user) {
        return res.status(401).json({ error: 'Utilisateur non trouvé !' });
      }
      bcrypt.compare(req.body.password, user.password)
        .then(valid => {
          if (!valid) {
            return res.status(401).json({ error: 'Mot de passe incorrect !' });
          }
          res.status(200).json({
            userId: user._id,
            // La méthode  sign()  du package  jsonwebtoken  utilise une clé secrète pour encoder un token 
            // qui peut contenir un payload personnalisé et avoir une validité limitée
            token: jwt.sign(
              { userId: user._id },
              'RANDOM_TOKEN_SECRET',
              { expiresIn: '24h' }
            )
          });
        })
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};

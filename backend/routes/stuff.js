const express = require('express');

const router = express.Router();

const stuffCtrl = require('../controllers/stuff');
const auth = require('../middleware/auth');

// pour uploader des fichiers avec le middleware multer
const multer = require('../middleware/multer-config');

// avec l import de la fct createThing du fichier controllers/stuff.js
router.post('/', auth, multer, stuffCtrl.creatThing);
// ------------------ modification des objets ------------------------------
// mettre a jour
router.put('/:id', auth, multer, stuffCtrl.modifyThing);
// supprimer
router.delete('/:id', auth, stuffCtrl.deleteThing);
// recup 1 seul objet
router.get('/:id', auth, stuffCtrl.getOneThing);
// tout les objets
router.get('/', auth, stuffCtrl.getAllThings);


module.exports = router;
const express = require('express');
const userController = require('./users/userController');
const ruserController = require('./registeredUsers/userController');
const uploadUserImage = require('./util/multer');
const router = express.Router();

const authController = require('./authcontroller/authcontroller');

// router.param('id', userController.checkID);

// router.route('/forgetPassword').post(authController.forgetPassword);
// router.route('/resetPassword').post(authController.resetPassword);

// router.route('/pokemons').post(pokemonController.createPokemon).get(pokemonController.getAllPokemon);

// router.route('/pokemons/:name').get(pokemonController.getPokemonByName).patch(pokemonController.updatePokemonByName);

// router.route('/stats').get(pokemonController.getPokemonStats);

// router.route('/users').get(userController.getAllUsers);
// router.route('/signup').post(userController.createUser);

// router.route('/login').post(authController.protect, authController.login);

router.route('/register').post(uploadUserImage, ruserController.createUser).get(ruserController.getAllUsers);
//router.post('/register', uploadUserImage, ruserController.createUser);

module.exports = router;

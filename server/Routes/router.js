const Router = require('@koa/router');
const router = new Router();

const controller = require('../Controller/recipeController')
const authRoute = require('../Routes/authRoute'); 

router.get('/recipes', controller.getAllRecipe)
router.post('/recipes', controller.addRecipe)
router.delete('/recipes/:id', controller.deleteRecipe)
router.put('/recipes/:id', controller.modifyRecipe)

router.use(authRoute.routes());
router.use(authRoute.allowedMethods());

module.exports = router;


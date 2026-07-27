const Router = require('@koa/router');
const router = new Router();

const controller = require('../Controller/recipeController')
const authRoute = require('../Routes/authRoute'); 
const authMiddleware = require('../Middleware/authMiddleware');

router.get('/recipes', controller.getAllRecipe)
router.post('/recipes', authMiddleware, controller.addRecipe)
router.delete('/recipes/:id', authMiddleware, controller.deleteRecipe)
router.put('/recipes/:id', authMiddleware, controller.modifyRecipe)

router.use(authRoute.routes());
router.use(authRoute.allowedMethods());

module.exports = router;


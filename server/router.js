const Router = require('@koa/router');
const router = new Router();

const controller = require('./controller')

router.get('/recipes', controller.getAllRecipe)
router.post('/recipes', controller.addRecipe)
router.delete('/recipes/:id', controller.deleteRecipe)
router.put('/recipes/:id', controller.modifyRecipe)

module.exports = router;


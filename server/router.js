const Router = require('@koa/router');
const router = new Router();

const controller = require('./controller')

router.get('allRecipes', controller.getAllRecipe)
router.post('CreateRecipe', controller.addRecipe)

module.exports = router;


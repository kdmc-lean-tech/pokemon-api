const { Router } = require('express');
const pokemonTypesRouter = require('../components/pokemon-types/pokemon-types.router');
const rolesRouter = require('../components/roles/roles.router');
const authRouter = require('../components/auth/auth.router');

module.exports = {
  init: (app) => {
    const router = Router();
  
    router.use('/pokemon-types', pokemonTypesRouter);
    router.use('/roles', rolesRouter);
    router.use('/auth', authRouter);
  
    app.use('/api/v1/', router);
  }
}

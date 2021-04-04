const { Router } = require('express');
const pokemonTypesRouter = require('../components/pokemon-types/pokemon-types.router');
const rolesRouter = require('../components/roles/roles.router');
const authRouter = require('../components/auth/auth.router');
const pokemonAbilitiesRouter = require('../components/pokemon-abilities/pokemon-abilities.router');
const pokemonRouter = require('../components/pokemon/pokemon.router');
const messagesRouter = require('../components/messages/messages.router');
const uploadRouter = require('../components/uploads/uploads.router');
const pokemonCategoriesRouter = require('../components/pokemon-categories/pokemon-categories.router');
const pokemonStatusRouter = require('../components/pokemon-status/pokemon-status.router');
const modulesRouter = require('../components/modules/modules.router');
const permissionsRouter = require('../components/permissions/permissions.router');

module.exports = {
  init: (app) => {
    const router = Router();
  
    router.use('/pokemon-types', pokemonTypesRouter);
    router.use('/roles', rolesRouter);
    router.use('/auth', authRouter);
    router.use('/pokemon-abilities', pokemonAbilitiesRouter);
    router.use('/pokemon', pokemonRouter);
    router.use('/messages', messagesRouter);
    router.use('/upload', uploadRouter);
    router.use('/pokemon-categories', pokemonCategoriesRouter);
    router.use('/pokemon-status', pokemonStatusRouter);
    router.use('/modules', modulesRouter);
    router.use('/permissions', permissionsRouter);
  
    app.use('/api/v1/', router);
  }
}

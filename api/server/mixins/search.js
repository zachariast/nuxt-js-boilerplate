'use strict';
const _get = require('lodash/get')
module.exports = function(Model, options) {
  const modelProperties = Object.keys(Model.definition.properties)
  const defaults = {
    properties: [ 'title', 'description' ].filter(prop => modelProperties.includes(prop)),
    ...options
  }

  const like = like => ({ like: new RegExp(like, "i") });

  // Validate that all properties exist
  defaults.properties.forEach(prop => {
    const propExistInModel = modelProperties.includes(prop)
    if (!propExistInModel) throw new Error(`Property does not exist in model: `, Model.definition.name)
  })

  Model.beforeRemote('find', (ctx, unusedData, next) => {
    if (ctx.args && ctx.args.filter && ctx.args.filter.where && ctx.args.filter.where.q) {
      const search = ctx.args.filter.where.q
      delete ctx.args.filter.where.q // remove the q parameter because does not exist any at model
      // ctx.args.filter.where = {} // remove all where conditions
      ctx.args.filter.where.or = defaults.properties.reduce((_or, propName) => {
        return _or.concat({ [propName]: like(search) })
      }, [])
    }

    next();
  })
}

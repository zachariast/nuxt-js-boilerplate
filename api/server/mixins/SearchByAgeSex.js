'use strict';

module.exports = function(Model, options) {
  const like = like => new RegExp(like, "i");
  /**
   * Search remote method
   */
  Model.search = async function(sex, age, search, limit, skip) {
    // const ageCategory = { from: 20, to: 30 };
    console.log({
      sex, age, search, limit, skip
    })
    if (limit > 10000) throw new Error('Limit cannot be larger than 10000!')
    age = parseInt(age)
    skip = skip || 0
    const query = {
      where: {
        or: [
          { and: [{sex: sex, title: {like: like(search)} }]},
          { and: [{sex: 'B', title: {like: like(search)} }]},
          { and: [{sex: sex, description: {like: like(search)} }]},
          { and: [{sex: 'B', description: {like: like(search)} }]}
        ]
      },
      limit,
      skip
    }

    if (age) {
      query.where['fromAge'] = {
        lte: age
      },
      query.where['toAge'] = {
        gte: age
      }
    }

    console.log('query where: ', query);
    const count = await Model.count(query.where);
    const topics = await Model.find(query);

    return {
      skip,
      limit,
      total: count,
      data: topics
    };
  }

  Model.remoteMethod('search', {
    description: 'Search for rows by sex, age and search string.',
    accepts: [
      {arg: 'sex', type: 'string', description: 'Sex: accepts M (Male) F (Female)'},
      {arg: 'age', type: 'number', description: 'Age'},
      {arg: 'search', type: 'string', description: 'Search string used for searching like'},
      {arg: 'limit', type: 'number', description: 'Limit results', default: 100},
      {arg: 'skip', type: 'number', description: 'Skip rows', default: 0}
    ],
    http: {verb: 'get', path: '/search'},
    returns: {arg: 'data', type: 'object', root: true}
  });
}

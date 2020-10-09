'use strict';
const app = require('./server')

async function migrate(app) {
  // Create dummy age categories
  await app.models.AgeCategory.create([
    {
      title: 'Child',
      fromAge: 0,
      toAge: 18
    },
    {
      title: 'Adult 18 - 30',
      fromAge: 18,
      toAge: 30
    },
    {
      title: 'Adult 30 - 45',
      fromAge: 30,
      toAge: 45
    },
    {
      title: 'Adult 45 - 60',
      title: 'Child',
      fromAge: 45,
      toAge: 60
    },
    {
      title: 'Adult 60+',
      fromAge: 60,
      toAge: 100
    }
  ])
};

migrate(app);

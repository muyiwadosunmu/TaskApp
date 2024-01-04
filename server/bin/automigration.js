'use strict';

var app = require('../server');

// Get the dataSource
var dataSource = app.datasources.postgres;
// console.log(dataSource);

// List of models to automigrate
var lbTables = ['User', 'AccessToken', 'ACL', 'RoleMapping', 'Role', 'Task'];
app.datasources.postgres.log('Database connected');

// Automigrate each model
lbTables.forEach(function(modelName) {
  var model = app.models[modelName];
  if (model) {
    dataSource.automigrate(modelName, function(err) {
      if (err) {
        console.error(`Error migrating model ' + ${modelName} + ':', ${err}`);
      } else {
        // eslint-disable-next-line max-len
        console.log('LoopBack table ' + modelName + ' created in ' + dataSource.adapter.name);
      }
    });
  } else {
    console.log('Model ' + modelName + ' not found.');
  }
});

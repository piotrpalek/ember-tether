/* jshint node: true */
'use strict';

module.exports = {
  name: 'ember-tether',
  included: function (app) {
    this._super.included(app);

    app.import('bower_components/tether/tether.js');
  }
};

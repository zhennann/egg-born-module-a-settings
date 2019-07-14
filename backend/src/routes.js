const version = require('./controller/version.js');
const settings = require('./controller/settings.js');

module.exports = app => {
  const routes = [
    // version
    { method: 'post', path: 'version/update', controller: version, middlewares: 'inner' },
    { method: 'post', path: 'version/init', controller: version, middlewares: 'inner' },
    // settings:instance
    { method: 'post', path: 'settings/instance/list', controller: settings, action: 'instanceList',
      meta: { right: { type: 'function', name: 'settings' } },
    },
    { method: 'post', path: 'settings/instance/load', controller: settings, action: 'instanceLoad',
      meta: { right: { type: 'function', name: 'settings' } },
    },
    { method: 'post', path: 'settings/instance/save', controller: settings, action: 'instanceSave',
      meta: { right: { type: 'function', name: 'settings' } },
    },
    // settings:user
    { method: 'post', path: 'settings/user/list', controller: settings, action: 'userList' },
    { method: 'post', path: 'settings/user/load', controller: settings, action: 'userLoad' },
    { method: 'post', path: 'settings/user/save', controller: settings, action: 'userSave' },
  ];
  return routes;
};

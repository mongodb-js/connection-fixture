var _ = require('lodash');
var debug = require('debug')('mongodb-connection-fixture');
var format = require('util').format;

/**
 * For `ssl=SERVER || ssl=ALL`
 * @see https://github.com/mongodb/node-mongodb-native/tree/2.0/test/functional/ssl
 */
exports.ssl = require('./ssl');

/**
 * For `authentication=LDAP`
 *
 * @see https://github.com/mongodb-js/connection-model#authentication-ldap
 */
exports.LDAP = {
  name: 'Enterprise: LDAP (evergreen only)',
  hostname: 'ldaptest.10gen.cc',
  ldap_username: 'drivers-team',
  ldap_password: process.env.MONGODB_LDAP_PASSWORD
};

/**
 * For `authentication=KERBEROS`
 *
 * @see https://github.com/mongodb-js/connection-model#authentication-kerberos
 */
exports.KERBEROS = {
  name: 'Enterprise: Kerberos (evergreen only)',
  hostname: 'ldaptest.10gen.cc',
  port: 27017,
  kerberos_principal: 'drivers@LDAPTEST.10GEN.CC'
};

/**
 * For `authentication=X509`
 *
 * @see https://github.com/mongodb-js/connection-model#authentication-x509
 */
exports.X509 = {
  name: 'Enterprise: x509',
  ssl_certificate: exports.ssl.client,
  ssl_private_key: exports.ssl.client,
  x509_username: 'CN=client,OU=kerneluser,O=10Gen,L=New York City,ST=New York,C=US'
};

/**
 * For `authentication=MONGODB`
 *
 * @see https://github.com/mongodb-js/connection-model#authentication-mongodb
 */
exports.MONGODB = {};

/**
 * Feed the @medina by using passwords set via secure environment
 * variables on the build system of your choice.
 */
var USERNAME_TO_ENV = {
  integrations: 'MONGODB_PASSWORD_INTEGRATIONS',
  compass: 'MONGODB_PASSWORD_COMPASS',
  fanclub: 'MONGODB_PASSWORD_FANCLUB'
};

Object.keys(USERNAME_TO_ENV).map(function(username) {
  /* eslint no-console:0 */
  var key = USERNAME_TO_ENV[username];
  if (!process.env[key]) {
    debug(' The environment variable `%s` containing the '
    + 'password for `%s` MONGODB user is not set!',
      key, username);
  }
});

exports.MONGODB.INTEGRATIONS = {
  mongodb_username: 'integrations',
  mongodb_database_name: 'admin',
  mongodb_password: process.env.MONGODB_PASSWORD_INTEGRATIONS,
  roles: ['readWriteAnyDatabase@admin', 'dbAdminAnyDatabase@admin']
};

exports.MONGODB.COMPASS = {
  mongodb_username: 'compass',
  mongodb_database_name: 'admin',
  mongodb_password: process.env.MONGODB_PASSWORD_COMPASS,
  roles: ['readAnyDatabase@admin']
};

exports.MONGODB.FANCLUB = {
  mongodb_username: 'fanclub',
  mongodb_database_name: 'mongodb',
  mongodb_password: process.env.MONGODB_PASSWORD_FANCLUB,
  roles: ['read@mongodb']
};

/**
 * Test MongoDB deployments running on Cloud Manager maintained
 * by @mongodb-js/compass team.
 *
 * @note (imlucas): All deployments currently have auth enabled.
 */
exports.INSTANCES = [
  {
    name: '3.0 Standalone: Store 1',
    hostname: 'standalone.compass-test-1.mongodb.parts',
    port: 27000
  },
  {
    name: '2.6 Standalone: Store 1',
    hostname: 'standalone.compass-test-1.mongodb.parts',
    port: 26000
  },
  {
    name: '3.0 Replicaset: Store 1',
    hostname: 'replset-0.compass-test-1.mongodb.parts',
    port: 27000
  },
  {
    name: '3.0 Replicaset: Store 2',
    hostname: 'replset-1.compass-test-1.mongodb.parts',
    port: 27000
  },
  {
    name: '3.0 Replicaset: Store 3',
    hostname: 'replset-2.compass-test-1.mongodb.parts',
    port: 27000
  },
  {
    name: '3.0 Cluster: Router 1',
    hostname: 'replset-0.compass-test-1.mongodb.parts',
    port: 28017
  },
  {
    name: '3.0 Cluster: Router 2',
    hostname: 'replset-1.compass-test-1.mongodb.parts',
    port: 28017
  },
  {
    name: '3.0 Cluster: Router 3',
    hostname: 'replset-2.compass-test-1.mongodb.parts',
    port: 28017
  },
  {
    name: '3.0 Cluster: Config 1',
    hostname: 'replset-0.compass-test-1.mongodb.parts',
    port: 28200
  },
  {
    name: '3.0 Cluster: Config 2',
    hostname: 'replset-0.compass-test-1.mongodb.parts',
    port: 28200
  },
  {
    name: '3.0 Cluster: Config 3',
    hostname: 'replset-0.compass-test-1.mongodb.parts',
    port: 28200
  },
  {
    name: '3.0 Cluster: Store 1',
    hostname: 'replset-0.compass-test-1.mongodb.parts',
    port: 28100
  },
  {
    name: '3.0 Cluster: Store 2',
    hostname: 'replset-0.compass-test-1.mongodb.parts',
    port: 28100
  },
  {
    name: '3.0 Cluster: Store 3',
    hostname: 'replset-0.compass-test-1.mongodb.parts',
    port: 28100
  },
  {
    name: '2.6 Cluster: Router 1',
    hostname: 'replset-0.compass-test-1.mongodb.parts',
    port: 26017
  },
  {
    name: '2.6 Cluster: Store 1',
    hostname: 'replset-0.compass-test-1.mongodb.parts',
    port: 26100
  },
  {
    name: '2.6 Cluster: Store 2',
    hostname: 'replset-1.compass-test-1.mongodb.parts',
    port: 26100
  },
  {
    name: '2.6 Cluster: Store 3',
    hostname: 'replset-2.compass-test-1.mongodb.parts',
    port: 26100
  },
  {
    name: '2.6 Cluster: Config 1',
    hostname: 'replset-0.compass-test-1.mongodb.parts',
    port: 26200
  },
  {
    name: '2.6 Cluster: Config 2',
    hostname: 'replset-1.compass-test-1.mongodb.parts',
    port: 26200
  },
  {
    name: '2.6 Cluster: Config 3',
    hostname: 'replset-2.compass-test-1.mongodb.parts',
    port: 26200
  }
];

exports.MATRIX = _.chain(exports.MONGODB)
  .filter(function(d) {
    return d.mongodb_password !== undefined;
  })
  .map(function(d) {
    return _.map(exports.INSTANCES, function(instance) {
      var options = _.assign(_.clone(instance), d);
      options.name = format('🔒  %s@%s',
        d.mongodb_username, options.name);
      return options;
    });
  })
  .flatten()
  .value();

/**
 * Resources only accessible via evergreen boxes.
 */
if (process.env.MONGODB_LDAP_PASSWORD) {
  exports.MATRIX.push(exports.LDAP);
}

if (process.env.MONGODB_KERBEROS) {
  exports.MATRIX.push(exports.KERBEROS);
}

if (process.env.MONGODB_KERBEROS_PASSWORD) {
  exports.MATRIX.push(_.assign(_.clone(exports.KERBEROS), {
    name: 'Enterprise: Kerberos w/ password (evergreen only)',
    kerberos_password: process.env.MONGODB_KERBEROS_PASSWORD
  }));
}

/**
 * @todo (imlucas) Hostname for X509 instance?
 */
// exports.X509

debug('%d fixture connections available', exports.MATRIX.length);

/**
 * @todo (imlucas) Add SSL boxes to MATRIX when stabilized.
 */

module.exports = exports;

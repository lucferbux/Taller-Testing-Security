const alias = require('module-alias');
alias.addAliases({
    '@': __dirname + '/../src'
});

require('./setup');
require('./authIntegration');
require('./aboutMeIntegration');
require('./projectIntegration');

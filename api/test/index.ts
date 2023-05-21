import * as alias from 'module-alias';
alias.addAliases({
  '@': __dirname + '/../src'
});

import './setup';
import './authIntegration';
import './aboutMeIntegration';
import './projectIntegration';

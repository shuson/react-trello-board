import devCfg from './config.dev.js';
import prodCfg from './config.prod.js';

let cfg;

/* eslint-disable global-require */
if (process.env.NODE_ENV === 'production') {
  cfg = prodCfg;
} else {
  cfg = devCfg;
}

export default cfg;
/* eslint-enable global-require */

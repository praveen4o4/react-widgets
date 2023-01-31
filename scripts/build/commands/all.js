const path = require('path');

const {
  webpackBuild,
  transpile
} = require('../../utils/build');
const {getAllPackagePaths} = require('../../utils/package');


module.exports = {
  command: 'all',
  desc: 'Build all packages',
  builder: {},
  handler: () =>
    getAllPackagePaths().forEach((pkg) => {
      try {
        // eslint-disable-reason Needed for tooling
        // eslint-disable-next-line import/no-dynamic-require
        const pkgJson = require(path.resolve(pkg, 'package.json'));
        const pkgName = pkgJson.name.split('/').pop();
        const isWidget = pkgName.startsWith('widget-');
        if (isWidget && !pkgJson.private) {
          webpackBuild(pkgName, pkg);
        }
        transpile(pkgName, pkg);
      }
      catch (err) {
        console.log(err)
        throw err;
      }
    })
};

var chalk = require('chalk');
var s3sync = require('s3-sync');
var readdirp = require('readdirp');

module.exports = function(args) {
  var publicDir = this.config.public_dir;
  var log = this.log;

  if (!args.hasOwnProperty('concurrency')) {
    args.concurrency = 8;
  }

  if (!args.hasOwnProperty('aws_key')) {
    args.aws_key = process.env.AWS_KEY
  }

  if (!args.hasOwnProperty('aws_secret')) {
    args.aws_secret = process.env.AWS_SECRET;
  }

  if (!args.bucket || !args.aws_key || !args.aws_secret) {
    var help = '';

    help += 'You should configure deployment settings in _config.yml first!\n\n';
    help += 'Example:\n';
    help += '  deploy:\n';
    help += '    type: s3\n';
    help += '    bucket: <bucket>\n';
    help += '    [aws_key]: <aws_key>        # Optional, if provided as environment variable\n';
    help += '    [aws_secret]: <aws_secret>  # Optional, if provided as environment variable\n';
    help += '    [concurrency]: <concurrency>\n';
    help += '    [region]: <region>          # See https://github.com/LearnBoost/knox#region\n\n',
    help += 'For more help, you can check the docs: ' + chalk.underline('https://github.com/nt3rp/hexo-deployer-s3');

    console.log(help);
    return;
  }

  // s3sync takes the same options arguments as `knox`,
  // plus some additional options listed above
  return readdirp({root: publicDir, entryType: 'both'})
      .pipe(s3sync({
        key: args.aws_key,
        secret: args.aws_secret,
        bucket: args.bucket,
        prefix: args.prefix,
        concurrency: args.concurrency,
        region: args.region
      }).on('data', function(file) {
        log.info(file.fullPath + ' -> ' + file.url)
      }).on('end', function() {
        log.info('Done!');
      }).on('fail', function(err) {
        log.error(err)
      }));
};

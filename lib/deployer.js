var s3 = require('s3');
var chalk = require('chalk');

module.exports = function(args) {

  var config = {
    maxAsyncS3: args.concurrency,
    s3Options: {
      accessKeyId: args.aws_key || process.env.AWS_KEY,
      secretAccessKey: args.aws_secret || process.env.AWS_SECRET,
      region: args.region
    }
  };
  var client = s3.createClient(config);

  var publicDir = this.config.public_dir;
  var log = this.log;

  var customHeaders = args.hearders || {};

  if (!args.bucket || !config.s3Options.accessKeyId || !config.s3Options.secretAccessKey) {
    var help = '';

    help += 'You should configure deployment settings in _config.yml first!\n\n';
    help += 'Example:\n';
    help += '  deploy:\n';
    help += '    type: s3\n';
    help += '    bucket: <bucket>\n';
    help += '    [aws_key]: <aws_key>        # Optional, if provided as environment variable\n';
    help += '    [aws_secret]: <aws_secret>  # Optional, if provided as environment variable\n';
    help += '    [concurrency]: <concurrency>\n';
    help += '    [region]: <region>          # See https://github.com/LearnBoost/knox#region\n',
    help += '    [headers]: <JSON headers>   # Optional, see README.md file\n\n';
    help += 'For more help, you can check the docs: ' + chalk.underline('https://github.com/nt3rp/hexo-deployer-s3');

    console.log(help);
    return;
  }

  var params = {
    localDir: publicDir,
    deleteRemoved: true,
    s3Params: {
      Bucket: args.bucket,
      headers: customHeaders
    }
  }

  var uploader = client.uploadDir(params);
  log.info('Uploading...');
  
  return uploader
    .on('progress', function() {
      //   log.info(uploader.progressAmount + ' / ' + uploader.progressTotal);
    }).on('end', function() {
      log.info('Done!');
    }).on('error', function(err) {
      log.error(err)
    });
};

var level = require('level')
  , s3sync = require('s3-sync')
  , readdirp = require('readdirp')



var public_dir = hexo.config.public_dir || './public';


hexo.extend.deployer.register('s3', function (args, callback) {
  var config = hexo.config.deploy;

  config.aws_key = config.aws_key || process.env.AWS_KEY;
  config.aws_secret = config.aws_secret || process.env.AWS_SECRET;

  if (!config.bucket || !config.aws_key || !config.aws_secret){
    var help = [
      'You should configure deployment settings in _config.yml first!',
      '',
      'Example:',
      '  deploy:',
      '    type: s3',
      '    bucket: <bucket>',
      '    [aws_key]: <aws_key>        # Optional, if provided as environment variable',
      '    [aws_secret]: <aws_secret>  # Optional, if provided as environment variable',
      '    [concurrency]: <concurrency>',
      '    [region]: <region>          # See https://github.com/LearnBoost/knox#region',
      '',
      'For more help, you can check the docs: ' + 'https://github.com/joshstrange/hexo-deployer-s3'
    ];

    console.log(help.join('\n'));
    return callback();
  }

  var files = readdirp({
      root: public_dir,
      entryType: 'both'
  });

  if(!config.concurrency)
  {
    config.concurrency = 8;
  }

  // Takes the same options arguments as `knox`,
  // plus some additional options listed above
  var uploader = s3sync({
      key: config.aws_key
    , secret: config.aws_secret
    , bucket: config.bucket
    , concurrency: config.concurrency
    , region: config.region
  }).on('data', function(file) {
    console.log(file.fullPath + ' -> ' + file.url)
  }).on('end', function() {
    console.log('Done!');
    callback();
  });

  files.pipe(uploader);
  

});

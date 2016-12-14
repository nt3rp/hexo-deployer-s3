# hexo-deployer-s3

Amazon S3 deployer plugin for [Hexo](http://hexo.io/)

## Installation

``` bash
$ npm install hexo-deployer-s3 --save
```

## Options

You can configure this plugin in `_config.yml`.

``` yaml
# You can use this:
deploy:
  type: s3
  bucket: <S3 bucket>
  aws_key: <AWS id key>  // Optional, if the environment variable `AWS_ACCESS_KEY_ID` is set
  aws_secret: <AWS secret key>  // Optional, if the environment variable `AWS_SECRET_ACCESS_KEY` is set
  concurrency: <number of connections> // Optional
  region: <region>  // Optional, see https://github.com/LearnBoost/knox#region
  headers: <headers in JSON format> // pass any headers to S3, usefull for metadata cache setting of Hexo assets
```
#### Example: header Cache-Control

``` yaml
deploy:
  type: s3-cloudfront
  bucket: my-site-bucket
  cf_distribution: mydistributionid
  headers: {CacheControl: 'max-age=604800, public'}
```

This will set "Cache-Control" header in every file deployed to max-age 1 week. This solves "Leverage browser caching" on most page speed analyzers. For custom metadata use:

``` yaml
  headers: {Metadata : { x-amz-meta-mykey: "my value" }}
```

## Contributors

- Josh Strange ([joshstrange](https://github.com/joshstrange); original implementation)
- Josenivaldo Benito Jr. ([JrBenito](https://github.com/jrbenito))

## License

MIT

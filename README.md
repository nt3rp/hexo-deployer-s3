# S3 deployer plugin for [Hexo](http://zespia.tw/hexo/)

This plugin can deploy your blog via S3.

## Usage

### Install

```
npm install hexo-deployer-s3 --save
```

### Enable

Add `hexo-deployer-s3` to `plugins` in `_config.yml`.

``` yaml
plugins:
- hexo-deployer-s3
```

### Configure

Add `bucket`, `aws_key` and `aws_secret` to `deploy` in `_config.yml`.

```
deploy:
  type: s3
  bucket: <S3 bucket>
  aws_key: <AWS id key>
  aws_secret: <AWS secret key>
  concurrency: <number of connections> //Optional
```

### Disable

Remove `hexo-deployer-s3` from `plugins` in `_config.yml`.

``` yaml
plugins:
- hexo-deployer-s3
```

### Update

Execute the following command.

```
npm update
```

### Uninstall

Execute the following command. Don't forget to disable the plugin before uninstalling.

```
npm uninstall hexo-deployer-s3
```

[Hexo]: http://zespia.tw/hexo
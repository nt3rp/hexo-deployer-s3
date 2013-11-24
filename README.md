# FTP deployer plugin for [Hexo]

This plugin can deploy your blog via FTP.

## Usage

### Install

```
npm install hexo-deployer-ftp --save
```

`lftp` is required. Install it with `apt-get install lftp` or `brew install lftp` depending on your OS.

### Enable

Add `hexo-deployer-ftp` to `plugins` in `_config.yml`.

``` yaml
plugins:
- hexo-deployer-ftp
```

### Configure

Add `host`, `user` and `root` to `deploy` in `_config.yml`.

```
deploy:
  type: ftp
  host: <ftp host>
  user: <ftp user>
  root: <path/to/your/blog/on/the/server>
```

### Disable

Remove `hexo-deployer-ftp` from `plugins` in `_config.yml`.

``` yaml
plugins:
- hexo-deployer-ftp
```

### Update

Execute the following command.

```
npm update
```

### Uninstall

Execute the following command. Don't forget to disable the plugin before uninstalling.

```
npm uninstall hexo-deployer-ftp
```

[Hexo]: http://zespia.tw/hexo
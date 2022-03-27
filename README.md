# js-share-texts

A tiny web service for sharing texts on the LAN. I run it on my routers.

## 1. Install

```sh
npm install
```

Install PM2:

```sh
sudo npm install -g pm2
sudo pm2 startup
```

Reference: <https://pm2.io/doc/zh/runtime/quick-start/>


## 2. Config

```sh
cp conf.json.example conf.json
```

Modify `conf.json` as you need.

Run `pm2 start -n js-share-texts ./index.js`

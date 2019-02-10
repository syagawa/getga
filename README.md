# get Google Analytics Report

## About
Google Analyticsのレポートをnodeで取得する。

## 設定
### 準備
1. <https://console.developers.google.com>からプロジェクトを作成。適当な名前でいい
1. 「APIを有効」にするから、Google Analytics Reporting APIを有効にする
1. 左側の「認証情報」から認証情報の作成を押す。
1. まずサービスアカウントキーを選択。名前は適当にして、役割にはProjectの閲覧者。キーのタイプはjsonで作成。
1. 秘密鍵の保存ダイアログが出るので保存。
1. GoogleAnalyticsの管理画面からビューのユーザー管理へ行く。 新しいユーザを登録する、アドレスは先ほど取ったサービスアカウントキーjson内にある"client_email"の値
1. 取得するビューのIDもメモしておく
### 設定
1. settingsディレクトリにサービスアカウントキーファイルを置く
1. settingsディレクトリの`config.js.sample`を`config.js`にリネーム
1. Change Meの部分を書き換える

## 実行

```bash
$ gulp
# localhost:3000/gaを開き ブラウザの開発者ツールのconsoleでg_objと叩くと結果を表示
```



参照URL
<http://beyondjapan.com/blog/2017/04/get-google-analytics-data-by-nodejs>
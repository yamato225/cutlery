# メモ

cutleryの設計に関してメモを残す。

## cutleryの目的

* スマホからRaspberry Piを操作し、IoTアプリを利用できる環境を提供する。

## cutleryの機能

* アクセスポイント機能  
Raspberry PiをAPとして起動し、wifiにてスマホから接続できるようにする。
* wifi設定機能
スマホからSSID/パスワードを設定してRaspberry PiをWifi接続可能にする。
* beebotte連携
アプリにコマンドを連携することでインターネット経由でのアプリの操作を可能にする。
* アプリ追加
Cutlery用に開発されたアプリをインストールして実行する。

## アプリ案

* リモコン
リモコンの信号を学習して送信する。
* Felica
Felicaを読み取る。(駅名、Idm)
* HDMI出力
HDMIに接続したTV等に動画・静止画を描画する。
* LINE連携
LINEのメッセージ/静止画/動画を受けとる。
あるいはGPIOよりメッセージを送信する。
* サーボ
サーボモータ操作。

## 全体構成

* web-console
スマホから操作するためのWebインタフェース。Reactで実装
* mosquitto
各コンポーネントのメッセージを仲介する。
* process-waker
アプリのためのプロセスを起動する。

### Wifi設定

###### 必要なAPI

* get_status
AP/wifiの状態を返す。APならSSID名、wifiなら接続しているSSID名を返す。
* set_status
AP/wifiの状態を設定する。
* get_ssid
wifiモードのとき、接続可能なSSIDのリストを取得する。
* connect_ssid
wifiモードのとき、指定したSSIDに接続する。

RESTで実装するか、MQTTで実装するか？ どちらが早いか？
⇛現状ではMQTTのほうが早そう。アプリ機能実装時に一部はRESTで作り直してもよいかも。

応答をAPI名respondで取得するようルール化する。

###### 構成するプロセス

* ステータス管理プロセス
AP/wifiの状態を返し、設定するプロセス。常駐する。
* Wifiリスト取得プロセス
接続可能なSSIDリストを返すプロセス。常駐しない。
* Wifi設定プロセス
Wifi設定ファイルを変更するプロセス。常駐しない。変更後にステータス管理プロセスに通知して再接続させる。

### リモコン

###### API一覧

* receive_status
シグナルの受信状態（受信準備中⇛受信可能⇛受信完了・・・）と受信した信号をweb-consoleに送信する。
* get_saved_signals
保存済みシグナル一覧を取得する。
* save_signal
受信したシグナルを保存する。
* send_signal
指定したシグナルを送信する。

###### 構成するプロセス

* シグナル記録プロセス
pigpioでGPIOから信号をファイルに保存するプロセス。常駐しない。
* シグナル一覧取得プロセス
保存済みのシグナル一覧を返すプロセス。常駐しない。
* シグナル送信プロセス
指定したシグナルを送信するプロセス。常駐しないが、beebotte連携を設定した場合はbeebotteプロセスの子プロセスとして常駐する。

### beebotte機能

・・・

## アプリ追加機能実現方式案

まずはアプリ追加機能は作り込まず、リモコンアプリ起動を優先する。

* 個別UI方式
アプリ毎にWeb用のプロセスを起動する。
React等のプラグインがアプリ毎に必要で容量が大きくなるのがネック（ビルドしてしまえば数MB程度なので気にしなくて良いかも）

* 全体ビルド方式
アプリをまとめてwebpackで固める。react-routerが機能するので高速。 


## 雑多なメモ
yarn licenses listでライセンスリスト取得。⇛web-consoleのどこかに表示しておく。

debパッケージ化検討する。
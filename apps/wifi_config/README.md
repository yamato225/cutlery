files: 

# 共通ファイル

* init.json
起動するプロセスのリスト

* install.sh
インストール用スクリプト(前提pkgの追加など)

# 独自ファイル

* send_status.py
AP/Wifiの状態を送る。wifiのときは接続可能なwifiのSSIDリストを送る。
常駐し、リクエストor定期的に状態を送る

* change_mode.py
AP⇔wifiの状態を変更する。

* set_wifi_password.py
SSIDとパスワードの組み合わせを受け取る。

* activate_ap.sh
APモードを有効化する。

* activate_wifi.sh
wifiモードを有効化する。



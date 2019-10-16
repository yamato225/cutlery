import paho.mqtt.publish as mqtt_pub

mqtt_pub.single("process_waker/wake", "wifi_scanner",hostname="localhost",port=1883)
mqtt_pub.single("process_waker/wake", "wifi_setter",hostname="localhost",port=1883)
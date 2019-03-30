#!/bin/bash

# BUNBUN Cutlery

# CONST
HOME_DIR="/home/pi"
HOSTNAME="dish0004"

# before run this script:
# * setup wifi (add "ssh" and "wpa_supplicant.conf" on /boot )
# * move resieze script(/etc/rc3.d/S01resize2fs_once) to /home/pi because keep filesystem small

# install dependency
echo "----------------------"
echo "1. install dependency"
echo "----------------------"
sudo apt update
sudo apt install -y lirc dnsmasq hostapd python3-rpi.gpio

# resize fs
## activate resize2fs script(expanding filesystem size to use all of SD card space)
echo "----------------------"
echo "2. resize2fs script"
echo "----------------------"
restore_path="/etc/rc3.d/S01resize2fs_once"
sudo ln -s "../init.d/resize2fs_once" $restore_path

# add lirc config to /boot/config.txt
echo "----------------------"
echo "3. lirc config to /boot/config.txt"
echo "----------------------"
echo "dtoverlay=lirc-rpi:gpio_in_pin=24,gpio_out_pin=25" | sudo tee -a /boot/config.txt

# copy scripts
echo "----------------------"
echo "4. copy scripts"
echo "----------------------"
cp homescripts/* ${HOME_DIR}/.
sudo mv ${HOME_DIR}/hostapd.conf /etc/hostapd/.
sudo mv ${HOME_DIR}/dnsmasq.conf /etc/.
sudo rm -rf homescripts

# disable startup network daemons
echo "----------------------"
echo "5. disable network daemons"
echo "----------------------"
sudo systemctl disable dhcpcd
sudo systemctl disable wpa_supplicant
sudo systemctl disable dnsmasq

# add wifi_activate.sh on /etc/rc.local
echo "----------------------"
echo "6. add wifi config "
echo "----------------------"
sudo sed -i -e "$ i bash /home/pi/wifi_activate.sh" /etc/rc.local

# change host name
echo "----------------------"
echo "7. change hostname"
echo "----------------------"
sudo sed -i "s/raspberrypi/${HOSTNAME}/" /etc/hosts
sudo sed -i "s/raspberrypi/${HOSTNAME}/" /etc/hostname

# change password
echo "----------------------"
echo "8. change password"
echo "----------------------"
echo "pi:bunbunbun" | sudo /usr/sbin/chpasswd

# set timezone JST
echo "----------------------"
echo "9. change timezone"
echo "----------------------"
sudo ln -fs /usr/share/zoneinfo/Asia/Tokyo /etc/localtime
sudo dpkg-reconfigure -f noninteractive tzdata

echo "hdmi_group=1" | sudo tee -a /boot/config.txt
echo "hdmi_mode=16" | sudo tee -a /boot/config.txt

[ -e /boot/wpa_supplicant.conf ] && sudo rm -rf /boot/wpa_supplicant.conf
[ -e /etc/wpa_supplicant.conf ] && sudo rm -rf /etc/wpa_supplicant/wpa_supplicant.conf

sudo sed -i 's/^driver.*/driver = default/' /etc/lirc/lirc_options.conf
sudo sed -i 's/^device.*/device = \/dev\/lirc0/' /etc/lirc/lirc_options.conf

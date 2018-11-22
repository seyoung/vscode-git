#install
cd /home/pi/

echo "start install"
sudo apt-get update
sudo apt-get upgrade

#LIST="xinit x11-xserver-utils nginx php5-fpm php-apc unclutter gnome-schedule ttf-unfonts-core ibus ibus-hangul"
LIST1="xscreensaver xinit x11-xserver-utils nginx php-fpm php-apcu unclutter gnome-schedule fonts-unfonts-core ibus ibus-hangul samba samba-common-bin git-core vim openssh-server ssh"
sudo apt-get install $LIST1 -y

# ssh server restart
sudo /etc/init.d/ssh restart

# Free tds & unixodbc install
LIST2="python-pip freetds-dev freetds-bin unixodbc-dev tdsodbc"
sudo apt-get install $LIST2 -y

# /etc/odbcinst.ini
#[FreeTDS]
# Driver = /usr/lib/arm-linux-gnueabihf/odbc/libtdsodbc.so
sudo rm /etc/odbcinst.ini
sudo cp /var/www/html/kiosk/file/odbcinst.ini /etc

# for touch screen calc because rotate screen
LIST3="libx11-dev libxext-dev libxi-dev x11proto-input-dev xinput-calibrator"
sudo apt-get install $LIST3 -y

# for python package
LIST4="app flask flask_cors json pyodbc"
sudo pip install $LIST4

echo "finish install package"

apt-get remove xscreensaver -y

wget https://raw.githubusercontent.com/seyoung/vscode-git/master/installer/update.sh
chmod +x update.sh

./update.sh

wget https://raw.githubusercontent.com/seyoung/vscode-git/master/installer/run.sh
chmod +x run.sh

wget https://raw.githubusercontent.com/seyoung/vscode-git/master/installer/default
mv default /etc/nginx/sites-available/default
#nginx setting file download

chmod -R 777 /var/www/html/

ibus engine hangul

#auto append crontab
crontab -u pi -l > mycron
echo "@reboot /home/pi/run.sh &" >> mycron
#echo "* * * * * wget -O /var/www/html/weather.txt http://www.kma.go.kr/wid/queryDFSRSS.jsp?zone=4420035000" >> mycron
crontab -u pi mycron
rm mycron

echo ""
echo "next install the chromium-borwser :)"
echo "After five seconds to exit."
echo "5"
sleep 1
echo "4"
sleep 1
echo "3"
sleep 1
echo "2"
sleep 1
echo "1"
sleep 1
reboot

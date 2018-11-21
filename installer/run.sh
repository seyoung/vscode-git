#run setup
sleep 5
unclutter -idle 0 &

export DISPLAY=:0
xset s off
xset -dpms
xset s 0 0

#matchbox-window-manager &
#matchbox-keyboard &

while true; do
# excute the background python app
python /var/www/html/kiosk/py/GetDatabases.py &
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

#--virtual-keyboard
DISPLAY=:0 chromium-browser --disable-translate --noerrdialogs --kiosk --touch-events=enabled --disable-pinch --noerrdialogs --disable-session-crashed-bubble --app=http://127.0.0.1/kiosk/index.html --incognito

# kill the background python app
killall -9 python
killall -9 chromium-browse
done

#while true; do
#	#sudo matchbox-window-manager -use_cursor no -use_titlebar no &
#done;

#florence --daemon &
#matchbox-keyboard --daemon &

#DISPLAY=:0 chromium-browser --disable-translate --noerrdialogs --kiosk --app=http://127.0.0.1/home.html --incognito &
#DISPLAY=:0 chromium-browser --disable-translate --noerrdialogs --kiosk --app=http://127.0.0.1/home.html --incognito
#DISPLAY=:0 chromium-browser --disable-translate --noerrdialogs --kiosk --app=http://gw.idreamtech.co.kr/GWMain/Frame.aspx --incognito

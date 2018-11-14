#run setup
sleep 10
unclutter -idle 0 &

export DISPLAY=:0
xset s off
xset -dpms
xset s 0 0

matchbox-window-manager &
matchbox-keyboard &

while true; do

DISPLAY=:0 chromium-browser --disable-translate --noerrdialogs --kiosk --touch-events=enabled --virtual-keyboard --disable-pinch --noerrdialogs --disable-session-crashed-bubble --app=http://127.0.0.1/DreamtechWeb/index.html --incognito

done

#while true; do
#	#sudo matchbox-window-manager -use_cursor no -use_titlebar no &
#done;

#florence --daemon &
#matchbox-keyboard --daemon &

#DISPLAY=:0 chromium-browser --disable-translate --noerrdialogs --kiosk --app=http://127.0.0.1/home.html --incognito &
#DISPLAY=:0 chromium-browser --disable-translate --noerrdialogs --kiosk --app=http://127.0.0.1/home.html --incognito
#DISPLAY=:0 chromium-browser --disable-translate --noerrdialogs --kiosk --app=http://gw.idreamtech.co.kr/GWMain/Frame.aspx --incognito

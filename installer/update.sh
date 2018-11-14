wget https://github.com/keepworking/RPS_BOARD/archive/master.zip
unzip master.zip
rm master.zip
cp -R -f RPS_BOARD-master/* /var/www/html/
rm -r RPS_BOARD-master/

wget https://github.com/seyoung/vscode-git/archive/master.zip
unzip master.zip
rm master.zip
cp -R -f vscode-git-master/* /var/www/html/
rm -r vscode-git-master/

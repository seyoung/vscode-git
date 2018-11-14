wget https://github.com/seyoung/vscode-git/archive/vscode-git-master.zip
unzip vscode-git-master.zip
rm vscode-git-master.zip
cp -R -f vscode-git-master/* /var/www/html/
rm -r vscode-git-master/

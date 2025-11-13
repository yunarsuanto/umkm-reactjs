deploy:
	@ echo "Building..."
	@ yarn build
	@ echo "Build completed, sending compiled data to server"
	@ zip -r dist.zip dist
	@ scp ./dist.zip majid@143.198.89.101:~/yokila/yokila-fe
	@ ssh majid@143.198.89.101 "cd ~/yokila/yokila-fe && unzip -o dist.zip && rm dist.zip"
	@ echo "Deployed successfully"
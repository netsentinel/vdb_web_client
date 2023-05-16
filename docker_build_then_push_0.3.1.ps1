docker build . -t "luminodiode/vdb_web_client:0.3.1-beta" -t "luminodiode/vdb_web_client:latest";
docker push "luminodiode/vdb_web_client:0.3.1-beta"; docker push "luminodiode/vdb_web_client:latest";
pause "Press any key to exit";
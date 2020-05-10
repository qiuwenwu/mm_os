@echo off
loadtest http://localhost:5000/test/helloworld -t 20 -c 10 --keepalive --rps 1000
pause
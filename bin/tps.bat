@echo off
loadtest -n 10000 -s TLSv1_method http://localhost:5000/ws/tt
pause
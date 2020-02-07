@echo off
Rem CUIDADO: APAGA TODAS AS IMAGENS E CONTÊINERES
FOR /f "tokens=*" %%i IN ('docker ps -aq') DO docker rm %%i
FOR /f "tokens=*" %%i IN ('docker images --format "{{.ID}}"') DO docker rmi %%i
#!/bin/sh -x

touch /home/drevak/test.js
sudo -u postgres pg_dump bibliotekanarynku9 > /home/drevak/tem.bak
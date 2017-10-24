# Návrh

V našom zadaní sa budeme držať postupov v článku. V článku, nezverejnili zdrojové súbory firewallu,
takže miesto nich použijeme ryu firewall. Experiment postavíme na nasledovných komponentoch:
* Apache HTTP Server (verzia httpd-2.4.29)
* Mininet network emulator (verzia 2.2.1)
* Ryu
* REST API - Ryu
* Web rozhranie

## Príprava experimentu

Experiment budeme robiť na emulovanej sieti z emulátoru Mininet. Vytvoríme sieť so stromovou topológiou.
V tejto sieti sme si pripravili podľa podobne ako v článku testovacie scenáre, ktoré by mal byť schopný náš firewall obslúžiť.

Nastavenie parametrov bude možné cez webové rozhranie pripojené k sieti.

Náš testovací scénar je:
* h1 by nemalo byť schopné pingnúť h2.
* h1 by nemalo byť schopné pingnúť h7.
* h1 by nemalo byť schopné pristúpiť na web servér h4.
* h7 by nemalo byť schopné pristúpiť na udp port 53 na stroji h8.


![topology](https://github.com/aks-2017/semestralne-zadania-semestralne-zadanie-xharvan-xbenod/blob/master/docs/topology.jpg)

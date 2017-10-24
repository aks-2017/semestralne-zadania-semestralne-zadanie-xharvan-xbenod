# Návrh

V našom zadaní sa budeme držať postupov v článku. Autori článku, nezverejnili zdrojové súbory firewallu, ktorý použili, takže miesto nich použijeme Ryu firewall. Experiment postavíme na nasledovných komponentoch:
* Apache HTTP Server (verzia httpd-2.4.29)
* Mininet network emulator (verzia 2.2.1)
* Ryu
* REST API - Ryu
* Web rozhranie

## Príprava experimentu

Experiment budeme robiť na emulovanej sieti v emulátore Mininet. Vytvoríme sieť so stromovou topológiou.
V tejto sieti sme si pripravili, podobne ako v článku, testovacie scenáre, ktoré by mal byť náš firewall schopný obslúžiť.

Nastavenie parametrov bude možné cez webové rozhranie pripojené k sieti, ktoré vytvoríme my. Nastavenia firewallu, ktoré budú napĺňať naše testovacie scenáre, sa budú dať vykonať cez naše webové rozhranie. Naša aplikácia bude s firewallom komunikovať cez REST API.

Náš testovací scénar je:
* h1 by nemalo byť schopné pingnúť h2.
* h1 by nemalo byť schopné pingnúť h7.
* h1 by nemalo byť schopné pristúpiť na web servér h4.
* h7 by nemalo byť schopné pristúpiť na udp port 53 na stroji h8.


![topology](https://github.com/aks-2017/semestralne-zadania-semestralne-zadanie-xharvan-xbenod/blob/master/docs/topology.jpg)

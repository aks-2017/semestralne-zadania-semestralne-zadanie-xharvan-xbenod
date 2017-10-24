# Implementing openflow based distributed firewall
Documentation regarding this project can be found in folder
```
docs/
```

## Abstract
Softvérovo definované siete (SDN) sú technológia, ktorá bude jadrom sietí dalších generácií. Veľa spoločností a organizácií začalo používať SDN aplikácie. Toto dáva administrátorom flexibilitu pri implementovaní vlastných sieti. Ale zároveň vyvstávajú nové bezpečnostné problémy. Aby sme mohli zabezpečiť SDN siete potrebujeme silný firewall. Aktuálne už existujú firewally, ale majú určite nevýhody. Jeden z hlavných nedostatkov existujúcich riešení je, že sú umiestnené na jednom centrálnom zariadení a celý firewall zlyhá ak zlýha jedno zariadenie. Ďalší nedostatok existujúcich riešení je, že väčšina z nich sú firewall-y druhej vrstvy. V tomto článku implementuje distribuovaný firewall, kde sa každý OpenFlow prepínač v sieti môže správať ako firewall. Navyše bude tento firewall zvládnuť prevádzku protokolu  TCP, UDP a ICMP. Testovali sme tento firewall pomocou emulátora Mininet Emulator, ktorý je nainštalovaný v Ubuntu 14.04  nainštalovaným pod VirtualBox. Používame POX kontrolér založený na Pythone. Táto práca je rozšírením našej predchádzajúcej práce na programovateľných firewall-och.

Originál: http://ieeexplore.ieee.org/document/7857611/

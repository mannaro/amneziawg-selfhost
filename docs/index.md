# 🚀 AmneziaWG Self-Hosted

Полное русскоязычное руководство по развёртыванию собственного сервера **AmneziaWG 2.0** с нативным модулем ядра Linux, веб-панелью управления, защищённым доступом, Split Routing, OpenWrt и Podkop.

!!! note "Нативная реализация AmneziaWG"

    В проекте используется реализация AmneziaWG в виде нативного модуля ядра Linux, а не VPN-туннель внутри Docker-контейнера или userspace-реализация.

    Обработка VPN-трафика выполняется непосредственно сетевым стеком Linux. Итоговая производительность определяется ресурсами VPS, шириной его канала, качеством маршрута и возможностями клиентского оборудования.

## Что входит в проект

- нативный AmneziaWG 2.0 на Ubuntu;
- управление клиентами через Web Panel;
- защищённый доступ к панели только из VPN;
- firewall и NAT на nftables;
- клиенты Windows и iPhone;
- Cudy WR3000S с OpenWrt;
- Split Routing;
- Podkop;
- sing-box и TPROXY;
- Policy Routing;
- резервное копирование;
- диагностика неисправностей.

## Архитектура

```text
Клиентское устройство
        │
        ▼
Cudy OpenWrt
        │
        ▼
Podkop
        │
        ▼
nftables: fwmark 0x100000
        │
        ▼
Policy Routing: table podkop
        │
        ▼
TPROXY
        │
        ▼
sing-box: 127.0.0.1:1602
        │
        ▼
AmneziaWG: awg0
        │
        ▼
VPS
        │
        ▼
NAT / Masquerade
        │
        ▼
Интернет
```

## Быстрый старт

Начните с [истории проекта](00-project-history.md), а затем последовательно пройдите руководство:

1. [Подготовка VPS](01-vps-preparation.md)
2. [Установка AmneziaWG](02-amneziawg-installation.md)
3. [Настройка Web Panel](03-web-panel.md)
4. [Настройка Firewall](04-firewall.md)
5. [Split Routing](05-split-routing.md)
6. [Клиент Windows](06-client-windows.md)
7. [Клиент iPhone](07-client-ios.md)
8. [OpenWrt на Cudy](08-cudy-openwrt.md)
9. [Podkop и выборочная маршрутизация](09-podkop.md)
10. [Резервное копирование](10-backup-restore.md)
11. [Диагностика](11-troubleshooting.md)

!!! warning "Не публикуйте секреты"

    Никогда не публикуйте `PrivateKey`, `PresharedKey`, реальные клиентские конфигурации, QR-коды, пароли, токены или резервные архивы.

## Проверенная конфигурация

```text
VPN-интерфейс сервера: awg0
VPN-сеть:              10.66.66.0/24
VPN-адрес сервера:     10.66.66.1
UDP-порт сервера:      53925
Web Panel:             10.66.66.1:8080
OpenWrt-клиент:        10.66.66.4/32
Policy fwmark:         0x100000
Routing table:         podkop
sing-box TPROXY:       127.0.0.1:1602
```

---

[Открыть репозиторий на GitHub](https://github.com/mannaro/amneziawg-selfhost)

```
C:\Users\sns\AppData\Local\Arduino15\packages\esp32\tools\esptool_py\4.2.1/esptool.exe --chip esp32 --port COM5 --baud 921600 --before default_reset --after hard_reset write_flash -z --flash_mode dio --flash_freq 80m --flash_size 4MB 0x1000 ./ESP_LITE23.ino.bootloader.bin 0x8000 ./ESP_LITE23.ino.partitions.bin 0xe000 ./boot_app0.bin 0x10000 ./ESP_LITE23.ino.bin 
```

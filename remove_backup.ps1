Get-ChildItem -Path "." -Filter "*backup*" -Recurse -File | Remove-Item  -Force -WhatIf

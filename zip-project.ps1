# zip-project.ps1
# Имя итогового архива
$zipName = "AutoMoto.zip"

# Удаляем архив, если он уже существует
if (Test-Path $zipName) {
    Remove-Item $zipName
}

# Собираем все файлы кроме исключённых папок
$filesToArchive = Get-ChildItem -Recurse -File | Where-Object {
    $_.FullName -notmatch '\\node_modules\\' -and
    $_.FullName -notmatch '\\\.git\\' -and
    $_.FullName -notmatch '\\dist\\'
}

# Архивируем
Compress-Archive -Path $filesToArchive.FullName -DestinationPath $zipName -Force

Write-Host "The project has been successfully archived in $zipName"

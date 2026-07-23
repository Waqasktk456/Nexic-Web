# Script to add style.css, config.js, and app.js to all detail pages

$files = Get-ChildItem -Filter "*detail.html" | Where-Object { $_.Name -ne "w3detail.html" }

Write-Host "Found $($files.Count) detail pages to update..."

foreach ($file in $files) {
    Write-Host "Processing $($file.Name)..."
    
    $content = Get-Content $file.FullName -Raw
    
    # Add style.css link after font-awesome if not already present
    if ($content -notmatch '<link rel="stylesheet" href="style\.css">') {
        $content = $content -replace '(<link rel="stylesheet" href="https://cdnjs\.cloudflare\.com/ajax/libs/font-awesome[^>]*>)', "`$1`n<link rel=`"stylesheet`" href=`"style.css`">"
        Write-Host "  Added style.css link"
    }
    
    # Add config.js and app.js before closing </body> or before first <script> tag if not present
    if ($content -notmatch '<script src="config\.js">') {
        # Find first <script> tag or </body>
        if ($content -match '<script>') {
            $content = $content -replace '(<script>)', "<script src=`"config.js`"></script>`n<script src=`"app.js`"></script>`n`$1"
        } elseif ($content -match '</body>') {
            $content = $content -replace '(</body>)', "<script src=`"config.js`"></script>`n<script src=`"app.js`"></script>`n`$1"
        }
        Write-Host "  Added config.js and app.js"
    }
    
    Set-Content $file.FullName -Value $content -NoNewline
    Write-Host "  Updated $($file.Name)"
}

Write-Host "Done! Updated $($files.Count) files."

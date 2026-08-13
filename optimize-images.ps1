# Image Optimization Script for NexicWeb
# This script helps optimize images for faster loading

Write-Host "🚀 NexicWeb Image Optimization Script" -ForegroundColor Cyan
Write-Host "======================================" -ForegroundColor Cyan
Write-Host ""

# Check if image folder exists
if (-not (Test-Path ".\image")) {
    Write-Host "❌ Error: 'image' folder not found!" -ForegroundColor Red
    exit 1
}

Write-Host "📊 Analyzing images..." -ForegroundColor Yellow
Write-Host ""

# Get all images
$images = Get-ChildItem -Path ".\image" -Include *.png,*.jpg,*.jpeg -Recurse
$totalSize = 0
$totalCount = 0

Write-Host "Found Images:" -ForegroundColor Green
Write-Host "=============" -ForegroundColor Green

foreach ($image in $images) {
    $sizeKB = [math]::Round($image.Length / 1KB, 2)
    $totalSize += $sizeKB
    $totalCount++
    
    $color = "White"
    if ($sizeKB -gt 500) { $color = "Red" }
    elseif ($sizeKB -gt 200) { $color = "Yellow" }
    else { $color = "Green" }
    
    Write-Host "  📷 $($image.Name): ${sizeKB} KB" -ForegroundColor $color
}

Write-Host ""
Write-Host "Total Images: $totalCount" -ForegroundColor Cyan
Write-Host "Total Size: $([math]::Round($totalSize / 1024, 2)) MB" -ForegroundColor Cyan
Write-Host ""

# Recommendations
Write-Host "📋 RECOMMENDATIONS:" -ForegroundColor Magenta
Write-Host "==================" -ForegroundColor Magenta
Write-Host ""

if ($totalSize -gt 10240) { # > 10 MB
    Write-Host "⚠️  CRITICAL: Your images are TOO LARGE ($([math]::Round($totalSize / 1024, 2)) MB total)" -ForegroundColor Red
    Write-Host "   This will cause very slow loading times!" -ForegroundColor Red
    Write-Host ""
}

Write-Host "To optimize your images, choose ONE method:" -ForegroundColor Yellow
Write-Host ""
Write-Host "METHOD 1: Online Tools (Easiest)" -ForegroundColor Green
Write-Host "  1. Go to https://tinypng.com/" -ForegroundColor White
Write-Host "  2. Upload all images from the 'image' folder" -ForegroundColor White
Write-Host "  3. Download optimized versions" -ForegroundColor White
Write-Host "  4. Replace original images" -ForegroundColor White
Write-Host ""

Write-Host "METHOD 2: Use Sharp (Node.js required)" -ForegroundColor Green
Write-Host "  Run these commands:" -ForegroundColor White
Write-Host "    npm install -g sharp-cli" -ForegroundColor Cyan
Write-Host "    sharp -i image/*.png -o image/optimized/ --webp -q 80" -ForegroundColor Cyan
Write-Host ""

Write-Host "METHOD 3: Use ImageMagick (if installed)" -ForegroundColor Green
Write-Host "  Run this command:" -ForegroundColor White
Write-Host "    magick mogrify -quality 80 -strip image/*.png" -ForegroundColor Cyan
Write-Host ""

Write-Host "🎯 TARGET: Get each image under 150 KB" -ForegroundColor Yellow
Write-Host ""
Write-Host "💡 Expected Results:" -ForegroundColor Cyan
Write-Host "   • 60-70% smaller file sizes" -ForegroundColor White
Write-Host "   • 3-5x faster page loading" -ForegroundColor White
Write-Host "   • Better Google PageSpeed score" -ForegroundColor White
Write-Host ""

# Check for very large images
$largeImages = $images | Where-Object { $_.Length -gt 500KB }
if ($largeImages) {
    Write-Host "⚠️  PRIORITY - Optimize these images first:" -ForegroundColor Red
    foreach ($img in $largeImages) {
        $sizeKB = [math]::Round($img.Length / 1KB, 2)
        Write-Host "   • $($img.Name) (${sizeKB} KB)" -ForegroundColor Red
    }
    Write-Host ""
}

Write-Host "✅ Analysis complete!" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "1. Optimize images using one of the methods above" -ForegroundColor White
Write-Host "2. Test your site speed at https://pagespeed.web.dev/" -ForegroundColor White
Write-Host "3. Check PERFORMANCE_OPTIMIZATION_GUIDE.md for more tips" -ForegroundColor White

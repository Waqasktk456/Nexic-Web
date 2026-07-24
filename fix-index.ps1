# Remove duplicate inline auth code from index.html
$file = "index.html"
$content = Get-Content $file -Raw

# Find and remove the inline script block (lines 602-795)
$pattern = '(?s)<script>\s*document\.addEventListener\("DOMContentLoaded".*?document\.getElementById\("resend-otp"\)\.addEventListener.*?\}\);.*?</script>'

$newScript = @'


<script>
// Lazy load images and pause animations when tab is hidden
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('img').forEach(img => {
    if (!img.loading) img.loading = 'lazy';
    img.decoding = 'async';
  });

  document.addEventListener('visibilitychange', () => {
    document.documentElement.classList.toggle('tab-hidden', document.hidden);
  });
});

// Note: All auth functionality (signup, login, OTP) is handled in app.js
</script>


'@

$newContent = $content -replace $pattern, $newScript

Set-Content $file -Value $newContent -NoNewline

Write-Host "✓ Fixed index.html - removed duplicate auth code" -ForegroundColor Green

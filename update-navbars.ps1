# Script to update all detail page navbars to match w3detail.html

$newNavbar = @'
<!-- ==== NAVBAR ======= -->
<nav class="navbar" id="navbar">
  <div class="nav-inner">
    <a href="index.html" class="nav-logo">
      <span class="logo-icon">⬡</span>
      <svg class="logo-text" viewBox="0 0 600 100">
        <defs>
          <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style="stop-color: var(--text);" />
            <stop offset="100%" style="stop-color: var(--accent2);" />
          </linearGradient>
        </defs>
        <text x="0" y="70" fill="url(#grad1)" font-size="70" font-weight="800">
          NexicWeb
        </text>
      </svg>
    </a>
    <ul class="nav-links">
      <li><a href="index.html#home" class="nav-link">Home</a></li>
      <li><a href="index.html#websites" class="nav-link">Websites</a></li>
      <li><a href="index.html#membership" class="nav-link">Membership</a></li>
      <li><a href="index.html#experts" class="nav-link">Experts</a></li>
      <li>
        <a href="support.html" class="nav-link">
          Support Center
        </a>
      </li>
      <li>
        <a href="index.html#cart" class="nav-link cart-btn" id="nav-cart-btn">
          <i class="fas fa-bag-shopping"></i>
          <span class="cart-badge" id="cart-badge">0</span>
        </a>
      </li>
      <li><a href="#" class="nav-link btn-login" id="open-auth">Login</a></li>
      <li id="user-display" style="display:none;">
        <span class="user-name" id="user-name"></span>
        <a href="#" class="logout-link" id="logout-link">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
            <polyline points="16 17 21 12 16 7"></polyline>
            <line x1="21" y1="12" x2="9" y2="12"></line>
          </svg>
          Logout
        </a>
      </li>
    </ul>
    <button class="hamburger" id="hamburger"><i class="fas fa-bars"></i></button>
  </div>
</nav>
'@

# Get all detail HTML files except w3detail.html
$files = Get-ChildItem -Filter "*detail.html" | Where-Object { $_.Name -ne "w3detail.html" }

Write-Host "Found $($files.Count) detail pages to update..."

foreach ($file in $files) {
    Write-Host "Processing $($file.Name)..."
    
    $content = Get-Content $file.FullName -Raw
    
    # Pattern to match <nav> tags
    $pattern = '(?s)<!-- (NAV|NAVBAR|==== NAVBAR =======) -->.*?</nav>'
    
    if ($content -match $pattern) {
        $content = $content -replace $pattern, $newNavbar
        Set-Content $file.FullName -Value $content -NoNewline
        Write-Host "  Updated $($file.Name)"
    }
}

Write-Host "Done! Updated all files."

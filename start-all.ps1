param(
    [switch]$frontend,   # runs Vite (npm.cmd run dev)
    [switch]$backend,    # runs Node server.js
    [switch]$python,     # runs python main.py
    [switch]$all         # runs everything
)

function Start-Terminal($path, $cmd) {
    Start-Process powershell -ArgumentList "cd `"$path`"; $cmd"
}

# If passed nothing, treat it like --all
if (-not ($frontend -or $backend -or $python -or $all)) {
    $all = $true
}

$frontendPath = "C:\path\to\frontend"
$backendPath  = "C:\path\to\backend"
$pythonPath   = "C:\path\to\backend\agent"

if ($all -or $frontend) {
    Start-Terminal $frontendPath "npm.cmd run dev"
}

if ($all -or $backend) {
    Start-Terminal $backendPath "node server.js"
}

if ($all -or $python) {
    Start-Terminal $pythonPath "python main.py"
}

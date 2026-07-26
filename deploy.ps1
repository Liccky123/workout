# =============================================
#  筋トレログ → GitHub Pages 公開スクリプト
#  使い方: このファイルがある場所で
#          powershell -ExecutionPolicy Bypass -File deploy.ps1
# =============================================
$ErrorActionPreference = "Stop"
$RepoName = "workout"

Set-Location $PSScriptRoot

function Step($n, $msg) { Write-Host "`n[$n] $msg" -ForegroundColor Cyan }

# --- 1. GitHub ログイン ---
Step 1 "GitHub にログインしています..."
$loggedIn = $false
try { gh auth status *> $null; if ($LASTEXITCODE -eq 0) { $loggedIn = $true } } catch {}

if ($loggedIn) {
    Write-Host "  すでにログイン済みです。" -ForegroundColor Green
} else {
    Write-Host "  ブラウザで承認が必要です。以下の質問に答えてください:" -ForegroundColor Yellow
    Write-Host "    What account do you want to log into?  ->  GitHub.com"
    Write-Host "    What is your preferred protocol?        ->  HTTPS"
    Write-Host "    Authenticate Git with your credentials? ->  Yes"
    Write-Host "    How would you like to authenticate?     ->  Login with a web browser"
    Write-Host "    表示される8桁コードをブラウザに貼り付けて承認`n"
    gh auth login --hostname github.com --git-protocol https --web
    if ($LASTEXITCODE -ne 0) { Write-Host "ログインに失敗しました。もう一度実行してください。" -ForegroundColor Red; exit 1 }
}

$User = (gh api user --jq .login)
Write-Host "  ユーザー: $User" -ForegroundColor Green

# --- 2. リポジトリ作成 & プッシュ ---
Step 2 "リポジトリ '$RepoName' を作成してアップロードしています..."
$exists = $false
try { gh repo view "$User/$RepoName" *> $null; if ($LASTEXITCODE -eq 0) { $exists = $true } } catch {}

if ($exists) {
    Write-Host "  既存のリポジトリに追加プッシュします。" -ForegroundColor Yellow
    git remote remove origin 2>$null
    git remote add origin "https://github.com/$User/$RepoName.git"
    git push -u origin main --force
} else {
    gh repo create $RepoName --public --source=. --remote=origin --push `
        --description "筋トレログ - オフライン対応のPWA筋トレ記録アプリ"
}
if ($LASTEXITCODE -ne 0) { Write-Host "アップロードに失敗しました。" -ForegroundColor Red; exit 1 }
Write-Host "  アップロード完了 (161ファイル)" -ForegroundColor Green

# --- 3. GitHub Pages 有効化 ---
Step 3 "GitHub Pages を有効化しています..."
$body = '{"source":{"branch":"main","path":"/"}}'
$body | gh api -X POST "repos/$User/$RepoName/pages" --input - *> $null
if ($LASTEXITCODE -ne 0) {
    # すでに有効な場合は設定更新
    $body | gh api -X PUT "repos/$User/$RepoName/pages" --input - *> $null
}
Write-Host "  有効化しました" -ForegroundColor Green

# --- 4. 公開を待つ ---
$Url = "https://$User.github.io/$RepoName/"
Step 4 "公開されるのを待っています (最大3分)..."
$ok = $false
for ($i = 1; $i -le 36; $i++) {
    Start-Sleep -Seconds 5
    try {
        $r = Invoke-WebRequest -Uri $Url -UseBasicParsing -TimeoutSec 10
        if ($r.StatusCode -eq 200) { $ok = $true; break }
    } catch {}
    Write-Host "." -NoNewline
}
Write-Host ""

Write-Host "`n=======================================================" -ForegroundColor Green
if ($ok) {
    Write-Host " 公開完了!" -ForegroundColor Green
} else {
    Write-Host " アップロード完了 (反映まで数分かかる場合があります)" -ForegroundColor Yellow
}
Write-Host " URL:  $Url" -ForegroundColor White
Write-Host "=======================================================" -ForegroundColor Green
Write-Host @"

■ iPhone にインストール
   1. Safari で上のURLを開く
   2. 共有ボタン → 「ホーム画面に追加」
   3. ホーム画面のアイコンから起動

■ Android にインストール
   1. Chrome で上のURLを開く
   2. メニュー → 「アプリをインストール」

■ 今後アプリを更新したいとき
   このスクリプトをもう一度実行するだけでOK
"@
try { Set-Clipboard -Value $Url; Write-Host "(URLをクリップボードにコピーしました)" -ForegroundColor DarkGray } catch {}

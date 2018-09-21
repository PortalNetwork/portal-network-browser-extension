# Portal Network Browser Extension

## Environment Setup
```
npm install
```
## Test cases

- 輸入 Domain
    - [] `phyrextsai.eth || phyrextsai.etc || phyrextsai.wan` : 可以轉跳顯示的ipfs頁面
    - [] `phyrextsai.ethxxx` : 錯誤的 tld 無法進入extension查詢loading畫面
    - [] `abcdefghijk.eth` : 輸入沒有存在的 domain 轉跳到 not found 頁面
    - [] multihash : 查 domain 的 resolver 是否有 multihash，有的話就使用 multihash
- 進入 loading 頁面
    - [] Loading 時間過久 : 轉跳到404頁面
    - [] 查詢不到ipfs頁面 : 轉跳到 not found 頁面
    - [] loading進行中切換分頁 : 原本的loading會轉跳成指定的ipfs頁面而不是被切換的分頁轉跳
- 點擊 Link
    - [] Join Us On Telegram : 開啟 Telegram
    - [] twitter icon : 轉跳 twitter 頁面
    - [] medium icon : 轉跳 medium 頁面
    - [] main icon : 開啟 mail 視窗
    - [] Powered by Portal Network : 開啟官網
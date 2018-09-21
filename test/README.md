# Portal Network Browser Extension

## Environment Setup
```
npm install
```
## Test cases

- 輸入 Domain
    - [x] `phyrextsai.eth || phyrextsai.etc || phyrextsai.wan` : 可以轉跳顯示的ipfs頁面
    - [x] `phyrextsai.ethxxx` : 錯誤的 tld 無法進入extension查詢loading畫面
    - [x] `abcdefghijk.eth` : 輸入沒有存在的 domain 轉跳到 not found 頁面
    - [x] multihash : 查 domain 的 resolver 是否有 multihash，有的話就使用 multihash
- 進入 loading 頁面
    - [x] Loading 時間過久 : 轉跳到404頁面
    - [x] 查詢不到ipfs頁面 : 轉跳到 not found 頁面
    - [x] loading進行中切換分頁 : 原本的loading會轉跳成指定的ipsfs頁面而不是被切換的分頁轉跳
- 點擊 Link
    - [x] Join Us On Telegram : 開啟 Telegram
    - [x] twitter icon : 轉跳 twitter 頁面
    - [x] medium icon : 轉跳 medium 頁面
    - [x] main icon : 開啟 mail 視窗
    - [x] Powered by Portal Network : 開啟官網
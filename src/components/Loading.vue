<script>
import LogingLogo from "loginglogo.svg";
import extension from "extensionizer";
import resolver from "../lib/resolver";
export default {
  components: {
    LogingLogo
  },
  data() {
    return {
      infura: "https://ipfs.infura.io/ipfs/"
    };
  },
  methods: {
    UrlSearch() {
      const strUrl = location.search;
      let getPara, ParaVal;
      let aryPara = [];
      if (strUrl.indexOf("?") !== -1) {
        let getSearch = strUrl.split("?");
        getPara = getSearch[1].split("&");
        for (let i = 0; i < getPara.length; i++) {
          ParaVal = getPara[i].split("=");
          aryPara.push(ParaVal[0]);
          aryPara[ParaVal[0]] = ParaVal[1];
        }
      }
      return aryPara;
    },
    updateUrl404(tabid) {
      extension.tabs.update(tabid, { url: "404.html" });
    },
    resolverUpdata(name, tabid) {
      resolver(name)
        .then(ipfsHash => {
          let url1 = `${this.infura}${ipfsHash}`;
          return fetch(url1, { method: "HEAD" })
            .then(res => res.status)
            .then(statusCode => {
              if (statusCode !== 200) return "Local";
              extension.tabs.update(tabid, { url: url1 });
            })
            .catch(err => {
              let url2 = `${this.infura}${ipfsHash}`;
              extension.tabs.update(tabid, { url: url2 });
              return err;
            });
        })
        .catch(err =>
          extension.tabs.update(tabid, { url: "error.html?name=" + name })
        );
    }
  },
  mounted() {
    const tabid = this.UrlSearch()["tabid"];

    if (tabid === "undefined") {
      this.updateUrl404(parseFloat(tabid));
      return;
    }

    const name = this.UrlSearch()["name"];
    this.resolverUpdata(name, parseFloat(tabid));
    setTimeout(() => {
      this.updateUrl404(tabid);
    }, 60000);
  }
};
</script>
<template>
    <div class="loading">
        <loging-logo></loging-logo>
    </div>
</template>
<style lang='scss' scoped>
@keyframes pulse {
  0% {
    opacity: 1;
    transform: scale(1.4, 1.4);
  }
  50% {
    opacity: 0.5;
    transform: scale(1, 1);
  }
  100% {
    opacity: 1;
    transform: scale(1.4, 1.4);
  }
}
.loading {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
svg {
  animation: pulse 1s ease-in-out infinite;
}
</style>


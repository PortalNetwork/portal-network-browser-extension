<script>
import LogingLogo from "loginglogo.svg";
import extension from "extensionizer";
export default {
    components: {
        LogingLogo
    },
    methods:{
        UrlSearch () {
            var strUrl = location.search
            var getPara, ParaVal
            var aryPara = []
            if (strUrl.indexOf('?') !== -1) {
                var getSearch = strUrl.split('?')
                getPara = getSearch[1].split('&')
                for (var i = 0; i < getPara.length; i++) {
                        ParaVal = getPara[i].split('=')
                        aryPara.push(ParaVal[0])
                        aryPara[ParaVal[0]] = ParaVal[1]
                }
            }
            return aryPara
        },
        updateUrl404(){
            extension.tabs.update(tabid, { url: '404.html' });
        }
    },
    mounted(){
        const tabid = this.UrlSearch()['tabid'];
        if (tabid === 'undefined') return this.updateUrl404();
        setTimeout(() => {
            this.updateUrl404();
        }, 60000)
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
        0% { opacity: 1; transform: scale(1.4, 1.4);}
        50% { opacity: 0.5; transform: scale(1, 1); }
        100% { opacity: 1; transform: scale(1.4, 1.4);}
    }
    .loading{
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


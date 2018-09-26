<template>
    <div class="content">
        <h1>Try our services</h1>
        <ul>
            <li>Get a unique blockchain domain name at <a id="MarketplaceUrlBtn" target="_blank" href="https://market.portal.network/">Marketplace.</a></li>
            <li>Create a ÐWeb with Web <a target="_blank" href="https://web.portal.network/">Builder.</a></li>
            <li>Check out other ÐWebs on <a target="_blank" href="https://search.portal.network/">Showcase.</a></li>
        </ul>
    </div>
</template>
<style lang='scss' scoped>
    .content{
        width: 100%;
        text-align: left;
        background-color: #08142b;
        padding: 25px 0;
        >h1{
            font-family: Roboto;
            font-size: 18px;
            font-weight: bold;
            line-height: 1.5;
            text-align: center;
            color: #ffffff;
            margin-bottom: 15px;
        }
        ul{
            width: 83%;
            margin: 0 auto;
            li{
                position: relative;
                color: #fff;
                font-family: Roboto;
                font-size: 12px;
                line-height: 2;
                color: #ffffff;
                &::before{
                    position: absolute;
                    top: 0;
                    left: -20px;
                    display: block;
                    width: 16px;
                    height: 26px;
                    content:"";
                    color:red;
                    background-image: url("~ChromeStore/arrow@2x.png");
                    transform: scale(0.5);
                }
                >a{
                    color: #679cf8;
                    font-weight: bold;
                }
            }
        }
    }
</style>

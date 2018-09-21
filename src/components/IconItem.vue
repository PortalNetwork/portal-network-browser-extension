<script>
import PoweredLink from 'Powered.vue';
export default {
    components: {
       PoweredLink
    },
}
</script>
<template>
    <div class="iconItom">
        <a href="https://t.me/portalnetworkofficial" target="_blank">
            <i class="fab fa-telegram-plane fa-2x"></i>
            <span>Join Us On Telegram</span>
        </a>
        <div class="iconLink">
            <a href="https://twitter.com/itisportal" target="_blank"><i class="fab fa-twitter fa-2x"></i></a>
            <a href="https://medium.com/portalnetworkofficial" target="_blank"><i class="fab fa-medium fa-2x"></i></a>
            <a href="mailto:support@portal.network" target="_blank"><i class="fas fa-envelope fa-2x"></i></a> 
        </div>
        <powered-link></powered-link>
    </div>
</template>
<style lang='scss' scoped>
    .iconItom{
        width: 100%;
        height: 165.3px;
        background-color: #0042b4;
        padding-top: 16px;
        >a{
            color: #fff;
            font-family: Roboto;
            font-size: 14px;
            font-weight: 500;
            width: 180px;
            height: 28px;
            margin: 0 auto;
            display: flex;
            justify-content: space-around;
            align-items: center;
        }
        .iconLink{
            width: 50%;
            height: auto;
            display: flex;
            justify-content: space-around;
            align-items: center;
            margin: 25px auto 0 auto;
            >a{
                color: #fff;
            }
        }
    }
    // ul{
    //     display: flex;
    //     width: 50%;
    //     height: auto;
    //     margin: 20px auto 0 auto;
    //     justify-content: space-between;
    //     li{
    //         >a{
    //             color: #648393;
    //         }
    //     }
    // }
</style>

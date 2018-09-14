<script>
import HeaderLogo from 'Header.vue';
import ContentText from 'Content.vue';
import IconItem from 'IconItem.vue';
import PoweredLink from 'Powered.vue';
export default {
    components: {
        HeaderLogo,
        ContentText,
        IconItem,
        PoweredLink
    },
}
</script>

<template>
    <div id="app">
        <header-logo></header-logo>
        <content-text></content-text>
        <icon-item></icon-item>
        <powered-link></powered-link>
    </div>
</template>

<style lang='scss' scoped>
    #app{
        width: 350px;
        height: 600px;
        padding-top: 30px;
        font-family: 'Rokkitt', sans-serif;
        text-align: justify;
    }
</style>
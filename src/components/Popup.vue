<script>
import HeaderLogo from 'Header.vue';
import ContentText from 'Content.vue';
import IconItem from 'IconItem.vue';
export default {
    components: {
        HeaderLogo,
        ContentText,
        IconItem,
    },
}
</script>

<template>
    <div id="app">
        <header-logo></header-logo>
        <content-text></content-text>
        <icon-item></icon-item>
    </div>
</template>

<style lang='scss' scoped>
    #app{
        width: 380px;
        height: 600px;
        font-family: 'Rokkitt', sans-serif;
        text-align: justify;
    }
</style>
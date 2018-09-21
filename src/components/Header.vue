<template>
    <div class="header">
        <img id="logo" src="~logo.png" />
        <h1>Portal Network Browser Extension</h1>
        <p>Browse ÐWebs with ease</p>
    </div>
</template>
<style lang='scss' scoped>
    .header{
        width: 100%;
        height: 262px;
        background-image: url("~ChromeStore/bg@2x.png");
        background-size: 100% auto;
        padding-top: 40px;
        >img#logo{
            width: 30%;
            margin: 0 auto
        }
        >h1, >p{
            color: #fff;
        }
        >h1{
            text-align: center;
            font-family: Roboto;
            font-size: 20px;
            font-weight: 500;
            line-height: 1.5;
            color: #ffffff;
            margin-top: 15px;
        }
        >p{
            font-size: 18px;
            line-height: 1.67;
            text-align: center;
        }
    }
</style>

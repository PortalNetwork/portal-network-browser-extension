<script>
import UrlSearch from '../lib/UrlSearch';
export default {
    data(){
        return {
            nameDom: "domain"
        };
    },
    mounted(){
        this.nameDom = UrlSearch()['name'];
    }
};

</script>

<template>
    <div class="error">
        <div class="center">
            <img src="~deadface.png" alt="">
            <div class="errorBox">
                <h1><span id="name">{{nameDom}}</span> not found</h1>
                <h2>Powered by <a href="https://www.portal.network/">Portal Network</a></h2>
                <div class="LogoBox">
                    <img src="~logo.png" alt="">
                    <p>X</p>
                    <img src="~logo2.png" alt="">
                </div>
            </div>
        </div>
    </div>
</template>

<style lang='scss' scoped>
@keyframes logoAmin{
  from {transform: scale(1);}
  50%{transform: scale(1.1);}
  to {transform: scale(1);}
}
.error{
    width: 100%;
    height: 100%;

    display: flex;
    justify-content: center;
    align-items: center;
    .center{
        > img{
            width: 300px;
            height: auto;
            margin-bottom: 25px;
            margin: 0 auto 25px auto;
            animation: logoAmin 1s infinite linear;
        }
        .errorBox{
            .LogoBox{
                display: flex;
                justify-content: center;
                align-items: center;
                margin-top: 30px;
                >img{
                    width: 60px;
                    height: auto;
                    margin: 0 20px;
                }
            }
        }
    }
}
.errorBox > h1, .errorBox > h2{
  letter-spacing: 2px;
}
.errorBox > h1{
    text-align: center;
    color: #9b9b9b;
    font-size: 20px;
}
.errorBox > h2{
    text-align: center;
    color: #1b243d;
    font-size: 14px;
    padding-top: 5px;
}
.errorBox > h2 >a{
  color: #1b243d;
}
.errorBox > h2 >a:hover{
  color: #44588e;
}

.errorBox > h1 > span{
  color: #33559f;
} 

</style>

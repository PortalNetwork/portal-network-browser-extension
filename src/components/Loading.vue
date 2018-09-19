<script>
import LogingLogo from "loginglogo.svg";
export default {
    components: {
        LogingLogo
    },
    data(){
        return {

        };
    },
    watch:{
    },
    computed:{
    },
    methods:{
    },
    created(){
    },
    mounted(){
        
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


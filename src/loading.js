import Vue from 'vue'
import Loading from 'Loading.vue';
import './scss/global/global.scss';
new Vue({
    el: '#app',
    render: h=>h(Loading),
});
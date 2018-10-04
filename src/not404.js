import Vue from 'vue'
import not404 from 'not404.vue';
import './scss/global/global.scss';
new Vue({
    el: '#app',
    render: h=>h(not404),
});
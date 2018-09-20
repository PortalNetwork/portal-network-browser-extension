import Vue from 'vue'
import ErrorPage from 'Error.vue';
import './scss/global/global.scss';
new Vue({
    el: '#app',
    render: h=>h(ErrorPage),
});
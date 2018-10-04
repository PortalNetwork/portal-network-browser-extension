import Vue from 'vue'
import Popup from 'Popup.vue';
import './scss/global/pop.scss';
new Vue({
    el: '#app',
    render: h=>h(Popup),
});
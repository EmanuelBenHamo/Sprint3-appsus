import {router} from './routes.js';
import pageHeader from './pages/page-header.cmp.js';
import pageFooter from './pages/page-footer.cmp.js';

new Vue({
    el:'#app',
    router,
    template:
    `<section class="main-app-container flex column">
        <page-header></page-header>
        <router-view class="page-content grow-1 flex"></router-view>
        <page-footer></page-footer>
    </section>
        `,
        components:{
            pageHeader,
            pageFooter
        }        
})
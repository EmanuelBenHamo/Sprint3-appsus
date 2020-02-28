import {router} from './routes.js';
import pageHeader from './pages/page-header.cmp.js'
import pageFooter from './pages/page-footer.cmp.js'


new Vue({
    el:'#app',
    router,
    template:
    `<section class="flex column">
        <page-header class="page-header"></page-header>
        <router-view class="page-content"></router-view>
        <page-footer class="page-footer"></page-footer>

    </section>
        `,
        components:{
            pageHeader,
            pageFooter
        }        
})
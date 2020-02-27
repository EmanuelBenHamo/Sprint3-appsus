import {router} from './routes.js';

new Vue({
    el:'#app',
    router,
    template:
    `<section>
        <router-view></router-view>
    </section>
        `,        
})
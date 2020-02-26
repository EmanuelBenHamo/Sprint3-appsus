import {router} from './routes.js';

new Vue({
    el:'#app',
    router,
    template:
    `<section>
        <h1>Hello World!</h1>
        <router-view></router-view>
    </section>
        `,        
})
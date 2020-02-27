import keepApp from './pages/keep-app.cmp.js';
import mailApp from './pages/mail-app.cmp.js';

const routes =[
    {path:'/keep', component:keepApp},
    {path:'/mail', component:mailApp}
];

export const router = new VueRouter({routes});
import keepApp from './pages/keep-app.cmp.js';

const routes =[
    {path:'/keep', component:keepApp}   
];

export const router = new VueRouter({routes});
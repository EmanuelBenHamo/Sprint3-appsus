import homePage from './pages/home-page.cmp.js';
import keepApp from './pages/keep-app.cmp.js';
import mailApp from './pages/mail-app.cmp.js';
import mailList from './apps/email/cmps/mail-list.cmp.js';
import mailDetails from './apps/email/pages/mail-details.cmp.js';
import mailCompose from './apps/email/pages/mail-compose.cmp.js';



const routes = [
    { path: '/', component: homePage },
    { path: '/keep', component: keepApp },
    { path: '/mail', component: mailApp,
children: [
        { path: '/', component: mailList },
        { path: 'details/:id', component: mailDetails },
        { path: 'compose', component: mailCompose },

]
},
];

export const router = new VueRouter({ routes });
'use strict';

export default {
    template:`
    <section class="header-container flex space-between align-center">
        <h1>appsus</h1>
        <div class="header-nav">
             <router-link to="/">Home</router-link>
            |<router-link to="/mail">Mail</router-link>
            |<router-link to="/keep">Keep</router-link>
        </div>
    </section>`
}
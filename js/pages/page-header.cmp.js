'use strict';

export default {
    template:`
    <section class="header-container flex space-between align-center">
        <router-link to="/"><h1>appsus</h1></router-link>
        
        <div class="header-nav">
            <router-link to="/mail?directory=inbox">Mail</router-link>
            <router-link to="/keep">Keep</router-link>
        </div>
    </section>`
}
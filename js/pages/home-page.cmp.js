export default {
    template: `
        <section class="home-page-container flex grow-1">
            <h1>Welcome To The Home Page</h1>
            <router-link to="/keep">Keep</router-link>
            |
            <router-link to="/mail?directory=inbox">Mail</router-link>
        </section>
    `
}
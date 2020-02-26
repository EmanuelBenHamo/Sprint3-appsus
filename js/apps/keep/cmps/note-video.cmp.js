export default {
    template: `
        <section>
            <h1>I am note-video cmp of keep app</h1>
            <iframe :src="info.url" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"></iframe>
        </section>
    `,
    props:['info']
}
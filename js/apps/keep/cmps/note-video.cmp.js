export default {
    template: `
        <section>
            <h1>I am note-video cmp of keep app</h1>
            <iframe :src="info.url" width=250 frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </section>
    `,
    props:['info']
}
export default {
    template: `
        <section>
            <iframe :src="note.info.url" width=250 frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            <!-- <iframe width="500" height="230" src="https://www.youtube.com/embed/RBumgq5yVrA " frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> -->
        </section>
    `,
    props:['note']
}
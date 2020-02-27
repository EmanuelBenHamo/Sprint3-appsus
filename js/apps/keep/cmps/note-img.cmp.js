export default {
    template: `
        <section>
            <img :src="note.info.url" :title="note.info.title">
        </section>
    `,
    props:['note']
}
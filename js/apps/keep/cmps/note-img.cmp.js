export default {
    template: `
        <section>
            <img width="285" :src="note.info.url" :title="note.info.title">
        </section>
    `,
    props:['note']
}
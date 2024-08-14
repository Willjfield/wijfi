<template>
    <div class="my-4 py-2 px-8">
        <div class="classes" v-for="_class, t in this.teaching">
            <b class="class-title">{{ _class.title }}</b>
            <br>
            <i>{{ _class.institution }}</i>
            {{ _class.year }}

        </div>
    </div>
</template>
<script>
import teaching from './assets/teaching.json';
export default {
    name: 'Teaching',
    data: () => ({
        teaching
    }),
}
</script>
<style scoped>
.classes {
    text-align: left;
    margin-bottom: 15px;
}

.co-authors {
    font-style: italic;
    font-size: small;
    white-space: break-spaces;
}

.class-title {
    white-space: break-spaces;
    line-height: 1.25em;
    max-width: 75%;
    margin: 0 auto;
}
</style>
<template>
    <div
    class="my-4 py-2 px-8"
    >
    <div  v-for="_class, t in this.teaching" >
   {{ _class }}
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
.co-authors {
    font-style: italic;
    font-size: small;
    white-space: break-spaces;
}

.v-card-title {
    white-space: break-spaces;
    line-height: 1em;
    max-width: 75%;
    margin: 0 auto;
}
</style>
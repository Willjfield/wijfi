<template>
<v-card class="ma-2 pa-1">
    <a :href="href" class="flex flex-shrink-0 xl:flex-grow-0 w-full xl:w-[38rem] p-3 border-2 rounded-2xl hover:border-sky-500">
        <div class="">
            <div class="flex w-full">
                <div class="flex flex-shrink-0">
                    <v-img class="rounded-2xl w-24 h-24 sm:w-48 sm:h-48 border-2" :src="image" :alt="title" />
                </div>
                <div class="flex flex-col ml-4">
                    <h3 class="w-full text-xl font-bold">{{ title }}</h3>
                    <small>{{ date }}</small>
                    <p>{{ excerpt }}</p>
                </div>
            </div>
        </div>
    </a>
</v-card>
</template>
<script>
export default {
    props: {
        title: {
            type: String,
            required: true,
        },
        excerpt: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            required: true,
        },
        date: {
            type: String,
            required: true,
        },
        href: {
            type: String,
            required: true,
        },
    },
};
</script>
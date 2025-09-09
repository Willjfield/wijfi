<template>
    <v-app-bar elevation="8" density="compact" app color="primary">
        <v-app-bar-title style="text-align: left; padding-left: 24px;">
            <!-- <h3>Will J Field</h3> -->
        </v-app-bar-title>
        <template v-slot:append>
            <v-btn stacked href="mailto:willjfield@proton.me">
                <v-icon>mdi-email</v-icon>
                <span v-show="$vuetify.display.mdAndUp" class="email-address"></span>
            </v-btn>
            <v-btn stacked href="https://github.com/willjfield" target="_blank">
                <v-icon>mdi-github</v-icon>
                <span v-show="$vuetify.display.mdAndUp" class="email-address"></span>

            </v-btn>
            <v-btn stacked href="https://fosstodon.org/@Wijfi" target="_blank">
                <v-icon>mdi-mastodon</v-icon>
                <span v-show="$vuetify.display.mdAndUp" class="email-address"></span>
            </v-btn>
            <v-btn href="/protected" target="_blank">
                <v-icon size="large">mdi-file-account</v-icon>
                <span v-show="$vuetify.display.mdAndUp" class="email-address">(<v-icon
                        size="x-small">mdi-lock</v-icon>)</span>
            </v-btn>
        </template>
    </v-app-bar>
</template>
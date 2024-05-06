<template>

    <v-layout class="rounded rounded-md">

        <v-container fluid>
            <v-row class="ma-4 ma-xs-0" no-gutters>
                <v-col cols="12" md="4">
                    <h1>SOMA Pesticide Map</h1>
                </v-col>
                <v-col cols="12" md="8">
                    <div id="map"></div>
                </v-col>
            </v-row>

            <v-divider></v-divider>
            <v-sheet class="text-left ma-sm-4 pa-sm-4 ma-0 pa-0">
                <v-card variant="outlined" class="ma-0 pa-0 ma-sm-4 pa-sm-4" justify="start" title="The Goal">
                    <v-card-text>
                        The goal of the project is to collect and make publicly available data about where residential
                        and commercial pesticides are being used in South Orange and Maplewood. The data may be used for
                        any purpose the public sees fit including but not limited to policy making, research, and
                        outreach. Pesticides are neither effective nor safe and in most cases there are much better
                        alternatives that are more effective, less expensive, less harmful to humans and pets, and less
                        devastating to the environment. We hope this data will help to our communities find better
                        alternatives to chemicals whenever possible. For more information on pesticides see <a
                            href="https://www.pollinator-pathway.org/pesticides/">https://www.pollinator-pathway.org/pesticides/</a>
                    </v-card-text>
                </v-card>

                <v-card variant="outlined" class="ma-0 pa-0 ma-sm-4 pa-sm-4" subtitle="How to contribute to the project"
                    title="Contributing">
                    <v-card-text>
                        This section describes how to download and set up the project so that you can contribute data
                        (Steps 1-2) and how to update and share the data (Steps 3-5). The project uses <a
                            href="https://www.qfield.org/">QField</a> and <a href="https://qfield.cloud">QField
                            Cloud</a>. QField is an application for collecting geographic based data and QField Cloud is
                        a free
                        online service that syncs data in the QField app.
                    </v-card-text>
                    <v-card class="ma-0 pa-0 ma-sm-4 pa-sm-4" title="1) Sign up for a free qfield cloud account">
                        <v-card-text>
                            The first step in contributing is to sign up for a free qfield cloud account from
                            <a
                                href="https://app.qfield.cloud/accounts/signup/">https://app.qfield.cloud/accounts/signup/</a>
                            <br>Once you have signed up, email <a href="mailto:wijfi@proton.me">wijfi@proton.me</a> with
                            the Username or Email that you
                            signed up
                            with and I will add
                            you as a collaborator.
                            <a href="https://docs.qfield.org/get-started/tutorials/get-started-qfc/">Find general
                                information about getting started with qfield here.</a>

                        </v-card-text>
                    </v-card>
                    <v-card class="ma-0 pa-0 ma-sm-4 pa-sm-4" title="2) Download the qfield app">
                        <v-card-text>
                            <a href="https://www.qfield.org">https://www.qfield.org</a> has links to download QField
                            from Google Play and the App Store or you can search from inside the store. Download and
                            install QField on your device.
                        </v-card-text>
                    </v-card>
                    <v-card class="ma-0 pa-0 ma-sm-4 pa-sm-4" title="3) Connect to and syncronize the project">
                        <v-card-text>
                            <v-container>
                                <v-row>
                                    <v-col cols="12" md="4">
                                        <video-player class="video-player-elem ma-4 pa-1"
                                            src="/videos/QFieldLogin.mp4" />
                                    </v-col>
                                    <v-col cols="12" md="8">
                                        <v-card variant="tonal" class="ma-4">
                                            <v-card-text>
                                                <v-list>
                                                    <v-list-item>
                                                        First open the app and choose QFieldCloud projects
                                                    </v-list-item>
                                                    <v-list-item>
                                                        Enter your username and password to login
                                                    </v-list-item>
                                                    <v-list-item>
                                                        If you have emailed <a
                                                            href="mailto:wijfi@proton.me">wijfi@proton.me</a> with
                                                        your
                                                        username and I have added you as a collaborator, you should
                                                        see
                                                        Maplewood-Pesticide-Use as a project option
                                                    </v-list-item>
                                                    <v-list-item>
                                                        When you open the project, if you have granted location
                                                        permissions, you should see an icon showing your location
                                                        and
                                                        the tax parcels near you.
                                                    </v-list-item>
                                                </v-list>
                                            </v-card-text>
                                        </v-card>
                                    </v-col>
                                </v-row>
                                <v-divider></v-divider>
                                <v-row>
                                    <v-col cols="12" md="4">
                                        <video-player class="video-player-elem ma-4 pa-1"
                                            src="/videos/QFieldSync.mp4" />
                                    </v-col>
                                    <v-col cols="12" md="8">
                                        <v-card variant="tonal" class="ma-4">
                                            <v-list>
                                                <v-list-item>
                                                    The first thing you should do when you open the project is to
                                                    syncronize it. This will make sure that the local version on your
                                                    phone is up to date. <b>Note: I strongly recommend you do this
                                                        connected to WiFi both for speed and to save data.</b> But the
                                                    project is about 20 MB so it may not be a big problem if you need to
                                                    use mobile data.
                                                </v-list-item>
                                                <v-list-item>
                                                    To syncronize, first open the menu from the "hamburger" icon
                                                    <v-icon>mdi-menu</v-icon> on the top
                                                    left.
                                                </v-list-item>
                                                <v-list-item>
                                                    Next, chose the cloud option
                                                    <v-icon>mdi-cloud</v-icon> on the top
                                                    and select Synchronize.
                                                </v-list-item>
                                                <v-list-item>
                                                    After synchronization is complete, click the back arrow at the top
                                                    to go back to the map.
                                                    <v-icon>mdi-arrow-left</v-icon>
                                                </v-list-item>
                                            </v-list>
                                        </v-card>
                                    </v-col>
                                </v-row>
                            </v-container>
                        </v-card-text>
                    </v-card>
                    <v-card class="ma-0 pa-0 ma-sm-4 pa-sm-4" title="4) Update a parcel">
                        <v-card-text>
                            <v-container>
                                <v-row>Look for pesticide signs.</v-row>
                                <v-row>Examples of signs that unambigiously indicate pesticide use:</v-row>
                                <v-row height="200px">
                                    <v-img max-width="200px" max-height="100%" src="/flag.jpg"></v-img>
                                    <v-img max-width="200px" max-height="100%" src="/mosh.jpg"></v-img>
                                    <v-img max-width="200px" max-height="100%" src="/msq.png"></v-img>

                                </v-row>
                                <v-row>
                                    <p>Below are examples of signs that <b> might</b> indicate pesticide use but
                                        need to be verified because the companies also provide other services:</p>
                                </v-row>

                                <v-row height="200px">
                                    <v-img max-width="200px" max-height="100%" src="/dial.png"></v-img>
                                    <v-img max-width="200px" max-height="100%" src="/grn.webp"></v-img>

                                </v-row>
                                <v-row>
                                    <p>Do not confuse PSE&G flags (red, blue, yellow, green, or orange) or invisible
                                        fence flags with pesticide flags!</p>
                                </v-row>

                                <v-row>
                                    <v-col cols="12" md="4">
                                        <video-player class="video-player-elem ma-4 pa-1"
                                            src="/videos/QFieldEditParcel.mp4" />
                                    </v-col>
                                    <v-col cols="12" md="8">
                                        <v-card variant="tonal" class="ma-4">
                                            <v-list>
                                                <v-list-item>
                                                    Tap the location icon on the lower right of the map
                                                    <v-icon>mdi-crosshairs-gps</v-icon> and the compass needle on the
                                                    lower left to switch modes <v-icon>mdi-compass-outline </v-icon>
                                                    You can either orient the map to your phone's current orientation or
                                                    orient to fixed North, South, East,West.
                                                </v-list-item>
                                                <v-list-item>
                                                    Tap on a parcel. You may select multiple parcels at once either
                                                    intentionally or by accident. If you select multiple parcels, you
                                                    can chose one from the next menu and
                                                    will see one highlighted on the map and < and> arrows that you can
                                                        tap to switch between them.
                                                </v-list-item>
                                                <v-list-item>
                                                    When updating a parcel, the first thing you should do is tap the
                                                    calendar icon <v-icon>mdi-calendar-today</v-icon> which
                                                    will
                                                    set the current date.
                                                </v-list-item>
                                                <v-list-item>
                                                    Next chose an option from the dropdown list under PEST_USE.
                                                    <b>Landscapers/Lawn Companies are grouped together because there
                                                        are just too many to keep track. If you notice another pesticide
                                                        company that's not in the drop down, select the "other" option
                                                        and then email me <a
                                                            href="mailto:wijfi@proton.me">wijfi@proton.me</a> with
                                                        the
                                                        name so that I can add it.</b>
                                                </v-list-item>
                                                <v-list-item>
                                                    The NOTE field can be used to add any notes that might be relevant.
                                                    For example if there is something ambiguous about the parcel (eg.
                                                    parcel boundaries seem to line up) or any other miscellaneous
                                                    information. (eg. there's a pesticide free sign and a mosquito
                                                    shield sign in the parcel)
                                                </v-list-item>

                                                <v-list-item>
                                                    Finally, tap check <v-icon>mdi-check</v-icon> to update the
                                                </v-list-item>
                                            </v-list>
                                        </v-card>
                                    </v-col>
                                </v-row>
                            </v-container>
                        </v-card-text>
                    </v-card>
                    <v-card class="ma-0 pa-0 ma-sm-4 pa-sm-4" title="5) Push updates">
                        <v-card-text>
                            <v-container>
                                <v-row>
                                    <v-col cols="12" md="4">
                                        <video-player class="video-player-elem ma-4 pa-1"
                                            src="/videos/QFieldPushChanges.mp4" />
                                    </v-col>
                                    <v-col cols="12" md="8">
                                        <v-card variant="tonal" class="ma-4">
                                            <v-card-text>
                                                <v-list-item>
                                                    Push your new updates: first open the menu again from the
                                                    "hamburger" icon
                                                    <v-icon>mdi-menu</v-icon> on the top
                                                    left.
                                                </v-list-item>
                                                <v-list-item>
                                                    Next, chose the cloud option
                                                    <v-icon>mdi-cloud</v-icon> on the top
                                                    and select Push changes. (Synchronize will work too but it takes
                                                    longer and uses more bandwidth because it also downloads new
                                                    data
                                                    from the cloud)
                                                </v-list-item>
                                                <v-list-item>
                                                    After you push changes or synchronize, you can click the back
                                                    arrow
                                                    <v-icon>mdi-arrow-left</v-icon> to go back to the map or quit
                                                    the
                                                    app if you're done.
                                                </v-list-item>
                                            </v-card-text>
                                        </v-card>
                                    </v-col>
                                </v-row>
                            </v-container>

                        </v-card-text>
                    </v-card>

                </v-card>
                <v-card variant="outlined" class="ma-0 pa-0 ma-sm-4 pa-sm-4" title="Output">
                    <v-card-text>
                        The final output of the project will be an interactive web map to help non-technical users to
                        explore the data, as well as the underlying data in the form of GIS files (geojson and
                        shapefiles). The data contains 3 main fields in addition to tax parcel geometry.
                        <v-list lines="one">
                            <v-list-item title="PAMS_PIN">Each parcel contains a field named PAMS_PIN based on a
                                concatenation of the county/municipality code, block number, lot number and
                                qualification code. </v-list-item>
                            <v-list-item title="LASTUPDATE">
                                This is the date that the parcel was most recently updated. The default value is
                                2012-08-01 which should be assumed to mean that the parcel has not been visited during
                                the course of the project or that the parcel has not been marked as using pesticides.
                            </v-list-item>
                            <v-list-item title="PEST_USE">
                                This field contains the most recent observation of pesticide use on the parcel by noting
                                the name of the company that put up the flag or lawn sign. Additional values for this
                                can be added. Null values are assumed to mean that no pesticide use has been identified
                                on the parcel.
                                <v-table>
                                    <thead>
                                        <tr>
                                            <th class="text-left">
                                                Code
                                            </th>
                                            <th class="text-left">
                                                Value
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="item in Object.keys(useMapping)" :key="item">
                                            <td>{{ item }}</td>
                                            <td>{{ useMapping[item] }}</td>
                                        </tr>
                                    </tbody>
                                </v-table>
                            </v-list-item>
                            <v-list-item title="NOTE">
                                This field is optional and should usually be left blank. It is for any additional notes
                                that might be relevant or anything ambiguous about the property.
                            </v-list-item>
                            <v-list-item title="Parcel Geometry">Parcel geometry is provided by NJ.gov<br>
                                <a href="https://nj.gov/njgin/edata/parcels/">https://nj.gov/njgin/edata/parcels/</a>
                                <br>
                                <a
                                    href="https://www.arcgis.com/home/item.html?id=34f9940598fc409094a28032e54c864e">https://www.arcgis.com/home/item.html?id=34f9940598fc409094a28032e54c864e</a></v-list-item>
                        </v-list>
                    </v-card-text>
                </v-card>
            </v-sheet>
        </v-container>
    </v-layout>
</template>
<style>
#app {
    max-width: none;
    width: 100%;
}

#map {
    height: 600px;
    width: 100%;

}

.video-player-elem,
.video-player-elem video {
    width: 300px;
    max-width: 100%;
}
</style>
<script>
import ml from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import 'vue-md-player/dist/style.css'
import { VideoPlayer } from 'vue-md-player'
export default {
    name: 'SOMAPest',
    components: {
        VideoPlayer
    },
    data() {
        return {
            useMapping: {

                'Lc': 'Lawn Company',
                'MsqSh': 'Mosquito Shield',
                'MsqSq': 'Mosquito Squad',
                'TrGrn': 'True Green',
                'SvAT': 'Save A Tree',
                'Other': 'Other',
                'Grn': 'Green Roots',
                'Dia': 'Dial Environmental'

            }
        }
    },
    mounted() {

        const map = new ml.Map({
            container: 'map', // container id
            style: '/basic.json', // style URL
            minZoom: 12,
            center: [-74.2644, 40.73766], // starting position [lng, lat]
            zoom: 12.65 // starting zoom
        });

        map.addControl(new ml.NavigationControl());
        const popup = new ml.Popup({
            closeButton: false,
            closeOnClick: false
        });
        map.on('mousemove', 'maplewood', (e) => {
            map.getCanvas().style.cursor = 'pointer';

            const coordinates = map.unproject(e.point);
            const use = e.features[0].properties.PEST_USE;
            const useMapping = this.useMapping;
            popup.setLngLat(coordinates).setHTML(use ? useMapping[use] || `Other (${use})` : 'none or no data').addTo(map);

        });

        // When the mouse leaves the state-fill layer, update the feature state of the
        // previously hovered feature.
        map.on('mouseleave', 'maplewood', () => {
            map.getCanvas().style.cursor = '';
            popup.remove();
        });
    }
}
</script>
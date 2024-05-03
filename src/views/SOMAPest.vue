<template>

    <v-layout class="rounded rounded-md">

        <v-container fluid>
            <v-row class="ma-4" no-gutters>
                <v-col cols="12" sm="4">
                    <h1>SOMA Pesticide Map</h1>
                </v-col>
                <v-col cols="12" sm="8">
                    <div cols="12" sm="4" id="map"></div>
                </v-col>
            </v-row>

            <v-divider></v-divider>
            <v-sheet class="text-left ma-4 pa-4">
                <v-card justify="start" title="The Goal">
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
                <v-card title="Output">
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
                                {{ JSON.stringify(useMapping, null, 4) }}
                            </v-list-item>
                            <v-list-item title="Parcel Geometry"><a
                                    href="https://nj.gov/njgin/edata/parcels/">https://nj.gov/njgin/edata/parcels/</a>
                                <br>
                                <a
                                    href="https://www.arcgis.com/home/item.html?id=34f9940598fc409094a28032e54c864e">https://www.arcgis.com/home/item.html?id=34f9940598fc409094a28032e54c864e</a></v-list-item>
                        </v-list>
                    </v-card-text>
                </v-card>
                <v-card subtitle="How to contribute" title="Contributing">
                    <v-card-text>
                        <a
                            href="https://app.qfield.cloud/accounts/signup/">https://app.qfield.cloud/accounts/signup/</a>
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
</style>
<script>
import ml from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
export default {
    name: 'SOMAPest',
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
            style: 'basic.json', // style URL
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
            popup.setLngLat(coordinates).setHTML(use ? useMapping[use] || `Other (${use})`  : 'none or no data').addTo(map);

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
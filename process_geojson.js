import fs from 'fs';
import path from 'path';

// Function to round coordinates to 5 decimal places
function roundCoordinates(coordinates) {
    if (Array.isArray(coordinates)) {
        return coordinates.map(coord => {
            if (Array.isArray(coord)) {
                return roundCoordinates(coord);
            } else if (typeof coord === 'number') {
                return Math.round(coord * 100000) / 100000;
            }
            return coord;
        });
    }
    return coordinates;
}

// Function to process a feature
function processFeature(feature) {
    // Keep only PEST_USE property
    const newProperties = {};
    if (feature.properties && feature.properties.PEST_USE !== undefined) {
        newProperties.PEST_USE = feature.properties.PEST_USE;
    }
    
    // Round coordinates in geometry
    const newGeometry = {
        ...feature.geometry,
        coordinates: roundCoordinates(feature.geometry.coordinates)
    };
    
    return {
        ...feature,
        properties: newProperties,
        geometry: newGeometry
    };
}

// Read the GeoJSON file
const inputPath = './public/Maplewood_Parcels_md.geojson';
const outputPath = './public/Maplewood_Parcels_md.geojson';

try {
    console.log('Reading GeoJSON file...');
    const data = JSON.parse(fs.readFileSync(inputPath, 'utf8'));
    
    console.log('Processing features...');
    const processedFeatures = data.features.map(processFeature);
    
    const processedData = {
        ...data,
        features: processedFeatures
    };
    
    console.log('Writing processed file...');
    // Minify output: no whitespace, newlines, or tabs
    fs.writeFileSync(outputPath, JSON.stringify(processedData));
    
    console.log('Processing complete!');
    console.log(`Original features: ${data.features.length}`);
    console.log(`Processed features: ${processedFeatures.length}`);
    
} catch (error) {
    console.error('Error processing file:', error);
} 
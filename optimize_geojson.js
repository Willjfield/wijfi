import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read the GeoJSON file
const geojsonPath = path.join(__dirname, 'public', 'Maplewood_sm.geojson');
const geojson = JSON.parse(fs.readFileSync(geojsonPath, 'utf8'));

console.log(`Original file has ${geojson.features.length} features`);

// Function to round coordinates to 4 decimal places (about 10 meter precision)
function roundCoordinates(coords) {
  if (Array.isArray(coords)) {
    return coords.map(coord => roundCoordinates(coord));
  }
  if (typeof coords === 'number') {
    return Math.round(coords * 10000) / 10000; // 4 decimal places
  }
  return coords;
}

// Function to simplify polygon coordinates by removing redundant points
function simplifyPolygon(coords) {
  if (!Array.isArray(coords) || coords.length === 0) return coords;
  
  return coords.map(ring => {
    if (ring.length <= 4) return ring; // Keep small rings as-is
    
    const simplified = [ring[0]]; // Always keep first point
    let lastPoint = ring[0];
    
    for (let i = 1; i < ring.length - 1; i++) {
      const currentPoint = ring[i];
      const nextPoint = ring[i + 1];
      
      // Calculate distance between current and last point
      const dx1 = currentPoint[0] - lastPoint[0];
      const dy1 = currentPoint[1] - lastPoint[1];
      const dist1 = Math.sqrt(dx1 * dx1 + dy1 * dy1);
      
      // Calculate distance between current and next point
      const dx2 = nextPoint[0] - currentPoint[0];
      const dy2 = nextPoint[1] - currentPoint[1];
      const dist2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);
      
      // Keep point if it's significantly different (more than 0.001 degrees)
      if (dist1 > 0.001 || dist2 > 0.001) {
        simplified.push(currentPoint);
        lastPoint = currentPoint;
      }
    }
    
    simplified.push(ring[ring.length - 1]); // Always keep last point
    return simplified;
  });
}

// Process each feature to optimize coordinates and simplify geometries
geojson.features = geojson.features.map(feature => {
  if (feature.geometry && feature.geometry.coordinates) {
    // Round coordinates first
    feature.geometry.coordinates = roundCoordinates(feature.geometry.coordinates);
    
    // Simplify polygon coordinates if it's a polygon type
    if (feature.geometry.type === 'MultiPolygon') {
      feature.geometry.coordinates = simplifyPolygon(feature.geometry.coordinates);
    }
  }
  return feature;
});

// Write the optimized GeoJSON with minimal whitespace
fs.writeFileSync(geojsonPath, JSON.stringify(geojson));
console.log('Successfully optimized Maplewood_sm.geojson - reduced precision and simplified geometries');

// Check file size after optimization
const stats = fs.statSync(geojsonPath);
console.log(`File size after optimization: ${(stats.size / 1024 / 1024).toFixed(2)} MB`);

// Calculate compression ratio
const originalSize = 6.9; // MB
const compressionRatio = ((originalSize - stats.size / 1024 / 1024) / originalSize * 100).toFixed(1);
console.log(`Compression achieved: ${compressionRatio}%`); 
import { lineString, length as turfLength, along as turfAlong } from '@turf/turf';

/**
 * Given an array of [lng, lat] coordinates, returns an interpolator for the line.
 * @param {Array<[number, number]>} coordinates - The LineString coordinates.
 * @returns {{ totalLength: number, interpolate: (t: number) => [number, number] }}
 */
export function createLineInterpolator(coordinates) {
  const line = lineString(coordinates);
  const totalLength = turfLength(line, { units: 'kilometers' });

  /**
   * Get the interpolated point at completion t (0=start, 1=end).
   * @param {number} t - Completion (0=start, 1=end)
   * @returns {[number, number]} - [lng, lat]
   */
  function interpolate(t) {
    const dist = t * totalLength;
    const pt = turfAlong(line, dist, { units: 'kilometers' });
    return pt.geometry.coordinates;
  }

  return { totalLength, interpolate };
} 
/*!
 * Get the contrasting color for any hex color
 * (c) 2021 Chris Ferdinandi, MIT License, https://gomakethings.com
 * Derived from work by Brian Suda, https://24ways.org/2010/calculating-color-contrast/
 * @param  {String} A color value
 * @return {String} The contrasting hex color (#000 or #fff)
 */
export const getContrast = (color) => {
  // remove any empty spaces
  color = color.replace(/ /g, '');

  // If # is leading character, remove it
  if (color.slice(0, 1) === '#') {
    color = color.slice(1);
  }

  // If color is a three-character hexcode, make six-character
  if (color.length === 3) {
    color = color
      .split('')
      .map(function (hex) {
        return hex + hex;
      })
      .join('');
  }

  // Convert to RGB value
  const r = parseInt(color.substr(0, 2), 16);
  const g = parseInt(color.substr(2, 2), 16);
  const b = parseInt(color.substr(4, 2), 16);

  // Get YIQ ratio
  const yiq = (r * 299 + g * 587 + b * 114) / 1000;

  // Check contrast
  return yiq >= 128 ? 'darker' : 'lighter';
};

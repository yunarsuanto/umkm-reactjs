const randomBoldColor = () => {
  const r = Math.floor(Math.random() * 81);
  const g = Math.floor(Math.random() * 81);
  const b = Math.floor(Math.random() * 81);
  const toHex = (n: number) => n.toString(16).padStart(2, '0');
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
};


const randomLightColor = () => {
    const r = Math.floor(175 + Math.random() * 81);
    const g = Math.floor(175 + Math.random() * 81);
    const b = Math.floor(175 + Math.random() * 81);
    const toHex = (n: number) => n.toString(16).padStart(2, '0');
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
};
export default {randomBoldColor, randomLightColor};
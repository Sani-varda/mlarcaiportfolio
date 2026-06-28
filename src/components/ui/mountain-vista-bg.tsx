import React, { useMemo } from 'react';

// No props needed

// Data Configuration
const layersData = [
  { className: 'layer-6', speed: '120s', size: '222px', zIndex: 1, image: '6' },
  { className: 'layer-5', speed: '95s',  size: '311px', zIndex: 1, image: '5' },
  { className: 'layer-4', speed: '75s',  size: '468px', zIndex: 1, image: '4' },
  { className: 'bike-1',  speed: '40s',  size: '75px',  zIndex: 2, image: 'bike', animation: 'parallax_bike', bottom: '100px', noRepeat: true, delay: '0s' },
  { className: 'bike-2',  speed: '55s',  size: '70px',  zIndex: 2, image: 'bike', animation: 'parallax_bike', bottom: '98px',  noRepeat: true, delay: '12s' },
  { className: 'bike-3',  speed: '70s',  size: '60px',  zIndex: 2, image: 'bike', animation: 'parallax_bike', bottom: '105px', noRepeat: true, delay: '6s' },
  { className: 'bike-4',  speed: '48s',  size: '80px',  zIndex: 3, image: 'bike', animation: 'parallax_bike', bottom: '90px',  noRepeat: true, delay: '18s' },
  { className: 'layer-3', speed: '55s',  size: '158px', zIndex: 3, image: '3' },
  { className: 'layer-2', speed: '30s',  size: '145px', zIndex: 4, image: '2' },
  { className: 'layer-1', speed: '20s',  size: '136px', zIndex: 5, image: '1' },
];

const MountainVistaParallax: React.FC = () => {
  // Generate dynamic CSS for each layer
  const dynamicStyles = useMemo(() => {
    return layersData
      .map(layer => {
        const url = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/24650/${layer.image}.png`;
        return `
          .${layer.className} {
            background-image: url(${url});
            animation-duration: ${layer.speed};
            background-size: auto ${layer.size};
            z-index: ${layer.zIndex};
            ${layer.animation ? `animation-name: ${layer.animation};` : ''}
            ${layer.bottom ? `bottom: ${layer.bottom};` : ''}
            ${layer.noRepeat ? 'background-repeat: no-repeat;' : ''}
            ${layer.delay ? `animation-delay: ${layer.delay};` : ''}
          }
        `;
      })
      .join('\n');
  }, []);

  return (
    <section
      className="hero-container"
      aria-label="An animated parallax landscape of mountains and cyclists."
    >
      {/* Inject dynamic layer styles safely in React */}
      <style dangerouslySetInnerHTML={{ __html: dynamicStyles }} />

      {/* Render each parallax layer */}
      {layersData.map(layer => (
        <div
          key={layer.className}
          className={`parallax-layer ${layer.className}`}
        />
      ))}

    </section>
  );
};

MountainVistaParallax.displayName = 'MountainVistaParallax';

export default React.memo(MountainVistaParallax);

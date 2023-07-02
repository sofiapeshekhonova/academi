import { useState } from 'react';
import { PLACES } from '../../constants';
import MapAdress from '../map-adress/map-adress';
import MapPicture from '../map-picture/map-picture';

function Map() {
  const [activeLink, setActiveLink] = useState<null | number>(1);

  return (
    <section className="map">
      <div className="container">
        <h2 className="map__title">адреса</h2>
        <MapPicture activeLink={activeLink}/>
        <ul className="map__addresses">
          {PLACES.map((place) => (
            <MapAdress key={place.id}
              address={place.location.address}
              name={place.location.name}
              id={place.id}
              activeLink={activeLink}
              setActiveLink={setActiveLink}
            />
          ))}
        </ul>
      </div>
    </section>
  );
}

export default Map;

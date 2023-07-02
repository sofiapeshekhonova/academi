type PropsType ={
  address: string;
  name: string;
  setActiveLink: (tab: number) => void;
  id: number;
  activeLink: number | null;
}

function MapAdress({address, name, setActiveLink, id, activeLink}: PropsType) {
  return (
    <li className="map__address">
      <div className="custom-toggle custom-toggle--radio custom-toggle--address">
        <input type="radio" value={address} id={address} name="user-agreement" checked={activeLink === id} onChange={() => setActiveLink(id)}/>
        <label className="custom-toggle__label" htmlFor={address}>{name}</label>
        <address className="custom-toggle__address">{address}
          <svg className="custom-toggle__icon" width="26" height="24" aria-hidden="true">
            <use xlinkHref="#icon-keks-footprint"></use>
          </svg>
        </address>
      </div>
    </li>
  );
}

export default MapAdress;

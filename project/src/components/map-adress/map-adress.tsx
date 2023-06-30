type PropsType ={
  address: string;
  name: string;
  setActiveLink: (tab: number) => void;
  id: number;
}

function MapAdress({address, name, setActiveLink, id}: PropsType) {
  return (
    <li className="map__address" onClick={() => setActiveLink(id)}>
      <div className="custom-toggle custom-toggle--radio custom-toggle--address">
        {/* если получиться сделать изначально первую кондитерскую */}
        <input type="radio" value={address} id={address} name="user-agreement" defaultChecked />
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

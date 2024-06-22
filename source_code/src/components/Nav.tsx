import { useEffect, useState } from "react";

type Planet = {
  name: string;
};

interface NavProps {
  planets: Planet[];
  sendPlanetName: (data: string) => void;
}
export const Nav: React.FC<NavProps> = ({ planets, sendPlanetName }) => {
  const [isMobile, setIsMobile] = useState(true);
  const [mobileList, setMobileList] = useState(false);

  const toggleMobileList = () => {
    setMobileList(!mobileList ? true : false);
  };

  useEffect(() => {
    // Function to handle changes in viewport size
    const handleViewportChange = () => {
      window.matchMedia("(max-width: 40rem)").matches
        ? setIsMobile(false)
        : setIsMobile(true);
    };
    handleViewportChange(); // Call handler initially
    window.addEventListener("resize", handleViewportChange); // Listen for changes in viewport size
    return () => {
      window.removeEventListener("resize", handleViewportChange); // Clean up event listener on component unmount
    };
  }, []); // Empty dependency array ensures this effect runs only once on mount
  return (
    <header id='planets-header'>
      <div className='nav-container'>
        <div className='nav-logo-container'>
          <a href='/' className='nav-logo'>
            The Planets
          </a>
        </div>
        <nav className='nav-ul-container'>
          {!isMobile && (
            <button
              className='btn-hamburger'
              type='button'
              aria-label={mobileList ? "open" : "close"}
              onClick={toggleMobileList}></button>
          )}

          {isMobile && (
            <ul role='list' className='nav-list' aria-hidden={!isMobile}>
              {planets.map((planet) => {
                const endpoint = `#${planet.name}`;
                const handlePlanetChange = () => sendPlanetName(planet.name);

                return (
                  <li
                    className={`${planet.name}-border`}
                    key={planet.name}
                    onClick={handlePlanetChange}>
                    <a href={endpoint}>{planet.name}</a>
                  </li>
                );
              })}
            </ul>
          )}
        </nav>
      </div>
      {!isMobile && mobileList && (
        <nav className='nav-ul-mobile-container' aria-hidden={isMobile}>
          <ul role='list' className='nav-list-mobile' aria-hidden={isMobile}>
            {planets.map((planet) => {
              const endpoint = `#${planet.name}`;
              const handlePlanetChange = () => sendPlanetName(planet.name);
              return (
                <li key={planet.name} onClick={toggleMobileList}>
                  <div className='mobile-list-container'>
                    <div className={`planet-color ${planet.name}`}></div>
                    <a href={endpoint} onClick={handlePlanetChange}>
                      {planet.name}
                    </a>
                  </div>
                  <span className='moblie-list-arrow'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='6'
                      height='8'>
                      <path
                        fill='none'
                        stroke='#FFF'
                        opacity='.4'
                        d='M1 0l4 4-4 4'
                      />
                    </svg>
                  </span>
                </li>
              );
            })}
          </ul>
        </nav>
      )}
    </header>
  );
};

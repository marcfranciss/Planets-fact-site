import { useEffect, useState } from "react";

type Planet = {
  name: string;
  overview: {
    content: string;
    source: string;
  };
  structure: {
    content: string;
    source: string;
  };
  geology: {
    content: string;
    source: string;
  };
  rotation: string;
  revolution: string;
  radius: string;
  temperature: string;
  images: {
    planet: string;
    internal: string;
    geology: string;
  };
};

interface NavProps {
  planets: Planet[];
  recievedPlanetName: string;
}

export const Content: React.FC<NavProps> = ({
  planets,
  recievedPlanetName,
}) => {
  const mainPage = "/Planets-fact-site";
  const selectedSection = planets.find(
    (planet) => planet.name === recievedPlanetName
  );

  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(true);
  const [selectedView, setSelectedView] = useState("overview");

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
  }, []);

  return (
    <main className='main-container'>
      {selectedSection ? (
        <section id={`#${selectedSection.name}`} key={selectedSection.name}>
          {/* MOBILE VIEW TOP NAVIGATION */}
          {!isMobile && (
            <ul role='list' className='mobile-details-nav'>
              <li
                className={`${
                  activeIndex === 0 ? `${selectedSection.name}-border` : ""
                }`}
                onClick={() => {
                  setActiveIndex(0);
                  setSelectedView("overview");
                }}>
                <span>Overview</span>
              </li>
              <li
                className={`${
                  activeIndex === 1 ? `${selectedSection.name}-border` : ""
                }`}
                onClick={() => {
                  setActiveIndex(1);
                  setSelectedView("structure");
                }}>
                <span>Structure</span>
              </li>
              <li
                className={`${
                  activeIndex === 2 ? `${selectedSection.name}-border` : ""
                }`}
                onClick={() => {
                  setActiveIndex(2);
                  setSelectedView("geology");
                }}>
                <span>Surface</span>
              </li>
            </ul>
          )}
          {/* <--------MAIN IMAGES--------> */}
          <div className='image-nav-container'>
            <div className='images-container'>
              {activeIndex === 0 ? (
                <img
                  src={`${mainPage}${selectedSection.images.planet}`}
                  alt=''
                />
              ) : activeIndex === 1 ? (
                <img
                  src={`${mainPage}${selectedSection.images.internal}`}
                  alt=''
                />
              ) : (
                <div className='compund-image'>
                  <img
                    className='attached-image'
                    src={`${mainPage}${selectedSection.images.planet}`}
                    alt=''
                  />
                  <img
                    className='attached-image2'
                    src={`${mainPage}${selectedSection.images.geology}`}
                    alt=''
                  />
                </div>
              )}

              {/* {Object.keys(selectedSection.images).map((key, i) => (
                <img
                  className={`${activeIndex === i ? "" : "isHidden"}`}
                  key={key}
                  src={`${mainPage}${
                    selectedSection.images[
                      key as keyof typeof selectedSection.images
                    ]
                  }`}
                  alt=''
                />
              ))} */}
            </div>
            {/* <--------MAIN DETAILS--------> */}
            <div className='details-container'>
              <div className='details-content'>
                <h2>{selectedSection.name}</h2>
                <p>
                  {selectedView === "structure"
                    ? selectedSection.structure.content
                    : selectedView === "geology"
                    ? selectedSection.geology.content
                    : selectedSection.overview.content}
                </p>
                <div className='details-source'>
                  <p>Source:</p>
                  <a
                    href={
                      selectedView === "structure"
                        ? selectedSection.structure.source
                        : selectedView === "geology"
                        ? selectedSection.geology.source
                        : selectedSection.overview.source
                    }
                    target='_blank'>
                    Wikipedia
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='12'
                      height='12'>
                      <path
                        fill='#FFF'
                        d='M11.34.66C10.9.22 10.37 0 9.75 0h-7.5C1.63 0 1.1.22.66.66.22 1.1 0 1.63 0 2.25v7.5c0 .62.22 1.15.66 1.59.44.44.97.66 1.59.66h7.5c.62 0 1.15-.22 1.59-.66.44-.44.66-.97.66-1.59v-7.5c0-.62-.22-1.15-.66-1.59zM10 6.25a.467.467 0 01-.305.46.544.544 0 01-.195.04.465.465 0 01-.352-.149L8.023 5.476 3.852 9.648a.481.481 0 01-.352.149.48.48 0 01-.352-.149l-.796-.797a.48.48 0 01-.149-.351.48.48 0 01.149-.352l4.172-4.172-1.125-1.125c-.162-.15-.198-.333-.11-.546A.467.467 0 015.75 2H9.5c.135 0 .253.05.352.148A.48.48 0 0110 2.5v3.75z'
                        opacity='.5'
                      />
                    </svg>
                  </a>
                </div>
              </div>
              {isMobile && (
                <ul role='list' className='details-nav'>
                  <li
                    className={`${
                      activeIndex === 0 ? `${selectedSection.name}` : ""
                    }`}
                    onClick={() => {
                      setActiveIndex(0);
                      setSelectedView("overview");
                    }}>
                    <span>01</span>
                    <p>Overview</p>
                  </li>
                  <li
                    className={`${
                      activeIndex === 1 ? `${selectedSection.name}` : ""
                    }`}
                    onClick={() => {
                      setActiveIndex(1);
                      setSelectedView("structure");
                    }}>
                    <span>02</span>
                    <p>Internal Structure</p>
                  </li>
                  <li
                    className={`${
                      activeIndex === 2 ? `${selectedSection.name}` : ""
                    }`}
                    onClick={() => {
                      setActiveIndex(2);
                      setSelectedView("geology");
                    }}>
                    <span>03</span>
                    <p>Surface Geology</p>
                  </li>
                </ul>
              )}
            </div>
          </div>
          {/* <--------ADDTIONAL DETAILS--------> */}

          <div className='added-details-container'>
            <div className='added-details_card'>
              <h3>Rotation time</h3>
              <h2>{selectedSection.rotation}</h2>
            </div>

            <div className='added-details_card'>
              <h3>Revolution time</h3>
              <h2>{selectedSection.revolution}</h2>
            </div>
            <div className='added-details_card'>
              <h3>Radius</h3> <h2>{selectedSection.radius}</h2>
            </div>
            <div className='added-details_card'>
              <h3>Average Temo</h3>
              <h2>{selectedSection.temperature}</h2>
            </div>
          </div>
        </section>
      ) : (
        <p>Planet not found</p>
      )}
    </main>
  );
};

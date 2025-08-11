import { HOUSE_IMAGES, HOUSE_TRANSLATIONS, HOUSE_IDS } from '../assets/houses';
import { Link } from "react-router-dom";
import * as amplitude from '@amplitude/analytics-browser';

/**
 * Grid de brasões das casas com links.
 */


export default function HouseGrid() {
  
function handleClick(e){
    try {
      amplitude.track('House Crest Clicked', {
        houseName:e,
        timestamp: new Date().toISOString(),
        screenWidth: window.innerWidth,
      }).promise;
      console.log(`Amplitude event fired successfully for house: ${e}`); 
    } catch (err) {
      console.error('Amplitude event failed:', err);
      // Navegue mesmo se o evento falhar (opcional)
     
    }
  };


    
  return (
    <div className="min-h-screen flex flex-col items-center">
      <h1 className="text-3xl md:text-5xl font-bold mt-8 mb-2">Casas de Hogwarts</h1>
      <p className="text-gray-600 mb-8">Clique em uma casa para ver detalhes</p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 justify-items-center p-8">
        {Object.keys(HOUSE_IMAGES).map(house => (
          <Link
            key={house}
            to={`/house/${HOUSE_IDS[house]}`}
            className="hover:scale-105 transition-transform flex flex-col items-center"
          >
          
            <img
              src={HOUSE_IMAGES[house]}
              alt={HOUSE_TRANSLATIONS[house]}
              className="w-32 h-32 object-contain drop-shadow-xl"
              loading="lazy"
              onClick={ () =>handleClick(HOUSE_TRANSLATIONS[house])}
            />
            <span className="block mt-2 text-lg font-semibold">{HOUSE_TRANSLATIONS[house]}
                  
            </span>
            
          </Link>
        ))}
      </div>
    </div>
  );
}
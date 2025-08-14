import { HOUSE_IMAGES } from '../assets/houses';
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loading from "../components/Loading";
import * as amplitude from '@amplitude/analytics-browser';

/**
 * Grid de brasões das casas com links.
 */


export default function HouseGrid() {
const [house, setHouse] = useState(null);  
const [loading, setLoading] = useState(true);

function handleClick(e){
    try {
      amplitude.track(e+' House Crest Clicked', {
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
  useEffect(() => {
    fetch(`https://wizard-world-api.herokuapp.com/Houses/`)
      .then(res => res.json())
      .then(data => {
        setHouse(data);
        setLoading(false);
      });
  },[])

 if (loading) return <Loading />;

  return (
    <div className="min-h-screen flex flex-col items-center">
      <h1 className="text-3xl md:text-5xl font-bold mt-8 mb-2">Casas de Hogwarts</h1>
      <p className="text-gray-600 mb-8">Clique em uma casa para ver detalhes</p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 justify-items-center p-8">
        {house?.map(houseKey => (
          <Link
            key={houseKey}
            to={`/house/${houseKey.id}`}
            onClick={ () =>handleClick(houseKey.name)}
            className="hover:scale-105 transition-transform flex flex-col items-center"
          >
          
            <img
              src={HOUSE_IMAGES[houseKey.name]}
              alt={houseKey.name}
              className="w-25 h-24 object-fit drop-shadow-xl"
              loading="lazy"
             
            />
            <span className="block mt-2 text-lg font-semibold">{houseKey.name}
                  
            </span>
            
          </Link>
        ))}
      </div>
    </div>
  );
}
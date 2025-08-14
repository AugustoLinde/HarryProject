import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { HOUSE_IMAGES } from "../assets/houses";
import Loading from "../components/Loading";
import HeadAvatar from "../components/HeadAvatar";
import * as amplitude from '@amplitude/analytics-browser';

export default function HouseDetail() {
  const { id } = useParams();
  const [house, setHouse] = useState(null);
  const [loading, setLoading] = useState(true);
  function handleClick(e){
      try {
        amplitude.track('Viewed '+ e.name + ' House details', {
          houseName:e.name,
          houseColors:e.houseColours,
          timestamp: new Date().toISOString(),
          screenWidth: window.innerWidth,
        }).promise;
        console.log(`Amplitude event fired successfully for house: ${e.name}`); 
      } catch (err) {
        console.error('Amplitude event failed:', err);
        // Navegue mesmo se o evento falhar (opcional)
       
      }
    };
  useEffect(() => {
    fetch(`https://wizard-world-api.herokuapp.com/Houses/${id}`)
      .then(res => res.json())
      .then(data => {
        setHouse(data);
        setLoading(false);
      });
  }, [id]);
  if (loading) return <Loading />;
  if (!house) return <div className="text-center mt-10">Casa não encontrada.</div>;
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-100 flex flex-col items-center">
      <div className="max-w-2xl w-full bg-white/80 rounded-2xl shadow-lg p-8 mt-8 mb-8">
        <Link to="/" className="text-blue-600 hover:underline">&larr; Voltar</Link>
        <div className="flex flex-col items-center" onLoad={ () =>handleClick(house)}>
          <img src={HOUSE_IMAGES[house.name]} alt={house.name} className="w-32 my-4" />
          <h1 className="text-3xl font-bold mb-2">{ house.name}</h1>
          <div className="text-gray-700 space-y-1 mb-6">
            <div><b>Cores:</b> {house.houseColours}</div>
            <div><b>Animal:</b> {house.animal}</div>
            <div><b>Elemento:</b> {house.element}</div>
            <div><b>Fundador:</b> {house.founder}</div>
            <div><b>Fantasma:</b> {house.ghost}</div>
            <div><b>Sala Comunal:</b> {house.commonRoom}</div>
          </div>
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <h2 className="text-xl font-semibold mb-2">Heads</h2>
              {house.heads?.length
                ? house.heads.map((head) => (
                    <div key={head.id} className="flex items-center gap-2 mb-2">
                      <HeadAvatar firstName={head.firstName} lastName={head.lastName} />
                      <span>{head.firstName} {head.lastName}</span>
                    </div>
                  ))
                : <span className="text-gray-500">Sem informação</span>
              }
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-2">Traits</h2>
              <ul className="list-disc ml-6">
                {house.traits?.map((trait) => (
                  <li key={trait.id}>{trait.name}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
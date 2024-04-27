import React, { useState, useEffect } from 'react';
import Sector from './Sector';

function Questionnaire(data){
    const [sectors, setSectors] = useState([]);
    const [currentSector, setCurrentSector] = useState(null);
    const [completed, setCompleted] = useState(false);

    useEffect(() => {
        // Simulate fetching data or use actual API calls
        setSectors(data);
    }, [data]);

    const selectSector = (sectorId) => {
        const sector = sectors.find(s => s.name === sectorId);
        setCurrentSector(sector);
        // Assuming resetQuestions is a method to reset state within Sector
    };

    return (
        <div>
            {completed ? renderResults() : (
                sectors.map(sector => (
                    <button key={sector.name} onClick={() => selectSector(sector.name)}>
                        {sector.name}
                    </button>
                ))
            )}
            {currentSector && <Sector sector={currentSector} setCompleted={setCompleted} />}
        </div>
    );
};

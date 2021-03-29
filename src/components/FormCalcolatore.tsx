import React, { useState } from 'react';
import { AnnoScolastico } from '../class';
import AnnoScolasticoComponent from './AnnoScolastico';
import { useRecoilValue } from 'recoil';
import { globalTotalPoints } from '../recoil/atom';

export default function FormCalcolatore() {

    const points = useRecoilValue(globalTotalPoints);

    const [anni, setAnni] = useState<AnnoScolastico[]>([]);
    const [idAnno, setIdAnno] = useState<number>(0);

    const idAnnoGenerator = () => {
        let currentId:number = idAnno;
        let newId:number = currentId + 1;
        setIdAnno(newId);
        return currentId;
    }

    const createNewAnno = () => {
        let id = idAnnoGenerator();
        let label = (id+1) + ".o anno"
        let anno: AnnoScolastico = {
            id: id,
            label: label,
            contratti: []
        };

        setAnni((oldList) => [
            ...oldList,
            anno
        ]);
    }

    return (
        <div>
            <div className="box">
                <button className="button is-primary" onClick={createNewAnno}>Inserisci anno scolastico</button>
            </div>
            {
                anni.length>0 && 
                    anni.map((anno:AnnoScolastico, i:number ) => (
                        <AnnoScolasticoComponent key={"anno_"+i} annoScolastico={anno} />   
                    ))
            }

            <div className="box">
                <h4 className="title is-4">Punteggio totale {points}</h4>
            </div>
            
            

        </div>
    )
} 
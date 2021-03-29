import React, { useEffect, useState } from 'react';
import { AnnoScolastico, Contratto } from '../class';
import moment from 'moment';
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import it from "date-fns/locale/it";
import { useRecoilState } from 'recoil';
import { globalTotalPoints } from '../recoil/atom';
registerLocale("it", it);

export default function AnnoScolasticoComponent(props:any) {

    const [totalPoints, setTotalPoints] = useRecoilState(globalTotalPoints)//punteggio di tutti i contratti degli anni scolastici

    let annoScolastico:AnnoScolastico = props.annoScolastico;
    const[contratti, setContratti] = useState<Contratto[]>([]);//contratti associati all'anno scolastico corrente
    const [showModal, setShowModal] = useState<Boolean>(false);

    const [totaleGiorni, setTotaleGiorni] = useState<number>(0)//numero di giorni totale dell'anno scolastico corrente
    const [totalePunteggio, setTotalePunteggio] = useState<number>(0);//punteggio totale dell'anno scolastio corrente

    const [startDate, setStartDate] = useState<Date>(new Date());
    const [endDate, setEndDate] = useState<Date>(new Date());

    const showModalContratto = () => {
        setShowModal(true);
    }

    const hideShowModal = () => {
        setShowModal(false);
    }

    const saveContratto = () => {
        setShowModal(false);
        let currentTotalePunteggio = totalePunteggio;//prendo il punteggio totale dell'anno corrente
        let a = moment(endDate);
        let b = moment(startDate);
        let days = a.diff(b, 'days') + 1;
        let daysUpdated = totaleGiorni + days;
        let newContratto:Contratto = {
            id: 0,
            data_inizio: startDate,
            data_fine: endDate,
            days: days
        } 
        setContratti((oldList) => [
            ...oldList,
            newContratto
        ]);
        setTotaleGiorni(daysUpdated);//aggiorna il totale dei giorni dell'anno corrente
        let updatePoints = calculatePoints(daysUpdated);
        setTotalePunteggio(updatePoints);//aggiorno il punteggio dell'anno scolastico corrente
        let diff = updatePoints - currentTotalePunteggio;
        setTotalPoints(totalPoints + diff);
    }

    const calculatePoints = (days:number) => {
        let months = Math.floor(days / 30);
        let others = days - (30 * months);
        let points = months/2;
        return (others >= 16) ? points + 0.5 : points;
    }

    useEffect(() => {
        setContratti(annoScolastico.contratti);
    }, [props.contratti, annoScolastico.contratti])

    return (
        <>

        <div className="box">
            <h5 className="title is-5">{annoScolastico.label}</h5>
            <h5 className="subtitle is-5">Totale {totaleGiorni}</h5>
            <h5 className="subtitle is-5">Punti {totalePunteggio}</h5>
            <button className="button is-info" onClick={() => {showModalContratto()}}>aggiungi contratto</button>
            {contratti && contratti.length>0 &&
            contratti.map((cont:Contratto, i:number) => (
            <p key={"contratto_" + cont.id + "_" + i}>dal {cont.data_inizio.toLocaleDateString()} al {cont.data_fine.toLocaleDateString()} {cont.days} giorni</p>
            ))
            }
        </div>
        <div className={"modal " + (showModal ? "is-active" : "")}>
        <div className="modal-background"></div>
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">Inserisci Contratto</p>
            <button className="delete" aria-label="close" onClick={hideShowModal}></button>
          </header>
          <section className="modal-card-body">
              <div className="block modal-min-height">
                  <p>
                      <span>dal </span>
                      <DatePicker showYearDropdown={true} showMonthDropdown={true} locale="it" selected={startDate} onChange={(date:Date) => setStartDate(date)} />   
                  </p>
                  <p>
                    <span>al </span>
                    <DatePicker showYearDropdown={true} showMonthDropdown={true} locale="it" selected={endDate} onChange={(date:Date) => setEndDate(date)} />
                  </p>
              </div>
            
          </section>
          <footer className="modal-card-foot">
            <button className="button is-success" disabled={(startDate === undefined || endDate === undefined)} onClick={saveContratto}>Salva</button>
            <button className="button" onClick={hideShowModal}>Cancel</button>
          </footer>
        </div>
      </div>
      </>

    )
}
const express = require('express');
const router = express.Router();
let arduinoId = [];
const db = require('./db').Machine;

let leituraData = "";
let leituraHora = "";

let month = {
    "Jan": 1,
    "Feb": 2,
    "Mar": 3,
    "Aph": 4,
    "May": 5,
    "Jun": 6,
    "jul": 7,
    "Aug": 8,
    "Sep": 9,
    "Oct": 10,
    "Nov": 11,
    "Dec": 12
}

let jan = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31];
let feb = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28];
let mar = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31];
let aph = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30];
let may = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31];
let jun = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30];
let jul = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31];
let aug = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31];
let sep = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,30];
let oct = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31];
let nov = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,30];
let dec = [1,2,3,4,5,6,7,8,9,10,11,12];

db.getAllMachines()
    .then(machines => {
        let machinesId = []
        for (let i = 0; i < machines.length; i++) {
            machinesId.push(machines[i].idMachine);
        }
        setInterval(() => {
            let inserts = [];
            addMeasurement(inserts, jan, machinesId);
            addMeasurement(inserts, feb, machinesId);
            addMeasurement(inserts, mar, machinesId);
            addMeasurement(inserts, aph, machinesId);
            addMeasurement(inserts, may, machinesId);
            addMeasurement(inserts, jun, machinesId);
            addMeasurement(inserts, jul, machinesId);
            Promise.all(inserts)
                        .then((results) => {
                            console.log("Worked");
                        })
                        .catch(err => console.log(err));
        }, 60000);
    })

function addMeasurement(insert, month, ids) {
    let date = new Date();
    let da = date.toString().split(' ');
    leituraHora = `${da[4]}`;
    for (let j = 0; j < month.length; j++) 
    {
        for (let i = 0; i < ids.length; i++) 
        {
            let variacao = 0;

            variacao = (Math.random() > 0.5 ? -1 : 1) * (Math.random() * 40);
            let useRam = 50.0 + variacao;
            variacao = (Math.random() > 0.5 ? -1 : 1) * (Math.random() * 20);
            let tempGPU = 45.0 + variacao;
            variacao = (Math.random() > 0.5 ? -1 : 1) * (Math.random() * 20);
            let tempCPU = 45.0 + variacao;
            variacao = (Math.random() > 0.5 ? -1 : 1) * (Math.random() * 40);
            let useGPU = 50.0 + variacao;
            variacao = (Math.random() > 0.5 ? -1 : 1) * (Math.random() * 40);
            let useDisc = 50.0 + variacao;
            variacao = (Math.random() > 0.5 ? -1 : 1) * (Math.random() * 40);
            let rpmCooler = 50.0 + variacao;
            leituraData = `${da[3]}/${1}/${month[j]}`;

            insert.push(db.insertMeasurent({
                useRam: useRam.toFixed(2),
                tempCPU: tempCPU.toFixed(2),
                tempGPU: tempGPU.toFixed(2),
                useGPU: useGPU.toFixed(2),
                useDisc: useDisc.toFixed(2),
                rpmCooler: rpmCooler.toFixed(0),
                metricDate: leituraData,
                metricTime: leituraHora,
                idMachine: ids[i]
            }));
        }
    }
}

router.get('/', (request, response, next) => {
    res.json({a: "asdsa"})
});

module.exports = router;

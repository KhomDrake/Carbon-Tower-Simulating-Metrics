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

let idMatch = 1;

let times = []

let players = []

let empresas = [];

db.getAllEmrpesas()
    .then(empresasDb => {
        empresas = empresasDb;
        // console.log(empresas);
        for (let i = 0; i < empresas.length; i++) {
            let streams = [];
            db.getAllStreams(empresas[i].idUserRole)
                .then(streamsDb => {
                    // console.log(streamsDb);
                    streams = streamsDb;
                    return db.getAllChampionship(empresas[i].idUserRole)
                })
                .then(championshipsDb => {
                    // console.log(championshipsDb);
                    for (let j = 0; j < streams.length; j++) {
                        if(j < championshipsDb.length) {
                            console.log(`insert into T_STREAM_OF_CHAMPION values (${championshipsDb[j].idChampionship},'${streams[j].idStream}');`);
                        }
                    }
                })
            
        }
    })

// db.getAllPlayers()
//     .then(resultado => {
//         players = resultado;
//         return db.getAllChampionship();
//     })
//     .then(championships => {
//         let idChampionship = 0;
//         for (let i = 0; i < players.length; i+= 10) {
//             console.log(`insert into T_ADMINISTRATOR_CHAMPIONSHIP values (${players[i].idUserRole}, ${championships[idChampionship].idChampionship})`)
//             idChampionship++;
//             if(idChampionship == championships.length)
//                 idChampionship = 0;            
//         }
//     })
//     .catch(err => console.log(err));

// db.getAllTimes()
//     .then(resultado => {
//         times = resultado;
//         return db.getAllPlayers()
//     })
//     .then(players => {
//         let quantidade = parseInt(players.length/times.length);
//         let playerId = 1;
//         times.forEach(time => {
//             if(playerId > players[players.length - 1].idUserRole) return;

//             for (let i = 0; i < quantidade; i++) {
//                 console.log(`insert into T_PLAYER_IN_TEAM values(${players[playerId + i].idUserRole}, ${time.idTeam});`);                
//             }
//             playerId += quantidade;
//         });
//         console.log(players.length);
//     })


// db.getAllTimeInChampionship()
//     .then(resultado => {
//         for (let i = 0; i < resultado.length; i+= 2) {
//             showMatchs(resultado[i], resultado[i + 1])
//         }
//         console.log(idMatch)
//         // console.log(resultado);
//     });

// function showMatchs(timeInChampionshipOne, timeInChampionshipTwo) {
//     let date = new Date();
//     let da = date.toString().split(' ');
//     let meses = [jan, feb, mar, aph, may, jun, jul];
//     let mesesNumber = [1, 2, 3, 4, 5, 6, 7]
//     let winner = false;
//     for (let i = 0; i < meses.length; i++) {
//         let day = parseInt(Math.random() * (meses[i].length - 1))
//         leituraData = `${da[3]}/${mesesNumber[i]}/${meses[i][day]}`;
//         leituraHora = `${da[4]}`;
//         console.log(`insert into T_MATCH values('${leituraData}', '${leituraHora}', ${timeInChampionshipOne.idChampionship_fk}, ${winner ? timeInChampionshipOne.idTeam_fk : timeInChampionshipTwo.idTeam_fk})`)
//         console.log(`insert into T_TEAM_IN_MATCH values(${timeInChampionshipOne.idTeam_fk}, ${idMatch})`);
//         console.log(`insert into T_TEAM_IN_MATCH values(${timeInChampionshipTwo.idTeam_fk}, ${idMatch})`);
//         winner = !winner;
//         idMatch++;
//     }
// }

// db.getAllMachines()
//     .then(machines => {
//         let machinesId = []
//         for (let i = 0; i < machines.length; i++) {
//             machinesId.push(machines[i].idMachine);
//         }
//         setInterval(() => {
//             let inserts = [];
//             addMeasurement(inserts, jan, machinesId, 1);
//             addMeasurement(inserts, feb, machinesId, 2);
//             addMeasurement(inserts, mar, machinesId, 3);
//             addMeasurement(inserts, aph, machinesId, 4);
//             addMeasurement(inserts, may, machinesId, 5);
//             addMeasurement(inserts, jun, machinesId, 6);
//             addMeasurement(inserts, jul, machinesId, 7);
//             Promise.all(inserts)
//                         .then((results) => {
//                             console.log("");
//                         })
//                         .catch(err => console.log(err));
//         }, 2000);
//     })

function addMeasurement(insert, month, ids, m) {
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
            leituraData = `${da[3]}/${m}/${month[j]}`;

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


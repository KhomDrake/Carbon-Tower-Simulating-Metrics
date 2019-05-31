let db = require("mssql");
let config = {
    user: "tower",
    password: "!Carbon6",
    server: "servercarbontower.database.windows.net",
    database: "carbontower",
    options: {
        encrypt: true
    }
}

function SQLQuery(queryLine)
{
    if(global.conn)
    {
        return global.conn.request().
        query(queryLine).
        then(results => {
            return results.recordset;
        })
        .catch(err => {
            console.log(err);
        })
    }
    else
    {
        return db.connect(config)
            .then(conn => {
                global.conn = conn;
                return global.conn.request().query(queryLine);
            })
            .then(results => {
                return results.recordset;
            })
            .catch(err =>{
                console.log(err);
            });
    }
}

module.exports.Machine = {
    getAllMachines: () => {
        return SQLQuery("select * from T_MACHINE");
    },
    insertMeasurent: (measurement) => {
        console.log(`insert into T_MACHINE_METRIC values(${measurement.useRam}, ${measurement.tempGPU}, ${measurement.useGPU}, ${measurement.useDisc}, ${measurement.rpmCooler}, ${measurement.tempCPU}, 'asd', ${measurement.idMachine}, '${measurement.metricDate}', '${measurement.metricTime}')`)
        // return SQLQuery(`insert into T_MACHINE_METRIC values(${measurement.useRam}, 
        //     ${measurement.tempGPU}, 
        //     ${measurement.useGPU}, 
        //     ${measurement.useDisc}, 
        //     ${measurement.rpmCooler}, 
        //     ${measurement.tempCPU}, 
        //     'asd',
        //     ${measurement.idMachine}, 
        //     '${measurement.metricDate}', 
        //     '${measurement.metricTime}')`);
    },
    getAllTimeInChampionship: () => {
        return SQLQuery("select * from T_TEAM_IN_CHAMPIONSHIP");
    },
    getAllTimes: () => {
        return SQLQuery("select * from T_TEAM");
    },
    getAllPlayers: () => {
        return SQLQuery("select * from T_USER_ROLE where idRole_fk = 3");
    }
}
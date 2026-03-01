async function calcScores() {
  const leaderboard = await getLeaderboard();
  const pickorder = await getPickOrder(leaderboard.race_id);

  const ARR = [];
  const dobj = { id: 0, name: '', pos: 0, pts: 0 };
  pickorder.forEach(function (each) {
    ARR.push({
      id: each.playerid,
      name: '',
      group: Number(each.groupid),
      drivers: [structuredClone(dobj), structuredClone(dobj)],
      total: 0,
      winnings: 0,
      raceid: leaderboard.race_id
    });
  });

  const players = await getPlayers();
  console.log(players);
  ARR.forEach(function (each) {
    each.name = players[each.id];
  });

  const picks = await getPicks(leaderboard.race_id);
  const pickso = {};
  picks.forEach(function (each) {
    pickso[each.playerid] = [];
  });
  picks.forEach(function (pick) {
    pickso[pick.playerid].push(pick.driverid);
  });
  console.log('pickso', pickso);

  const leaderboardo = {};
  leaderboard.vehicles.forEach(function (driver) {
    leaderboardo[driver.driver.driver_id] = driver;
  });

  ARR.forEach(function (each) {
    each.drivers.forEach(function (each2, i) {
      each2.id = pickso[each.id][i];
      each2.name = leaderboardo[each2.id].driver.full_name;
      each2.pos = leaderboardo[each2.id].running_position;
    });
  });

  const scores = [];
  const scoreso = [];
  ARR.forEach(function (each) {
    scores[each.group] = [];
    scoreso[each.group] = {};
  });
  ARR.forEach(function (each, i) {
    each.drivers.forEach(function (item) {
      scores[each.group].push(item);
      scoreso[each.group][item.id] = 0;
    });
  });
  scores.forEach(function (each) {
    let counter = 1;
    each.sort(function (a, b) {
      return b.pos - a.pos;
    });
    each.forEach(function (item) {
      item.pts = counter++;
      if (item.pos == 1) item.pts = item.pts + 2;
    });
  });

  console.log('ARR', ARR);

  ARR.forEach(function (each) {
    each.drivers.forEach(function (item) {
      each.total += item.pts;
    });
  });

  ARR.sort(function (a, b) {
    return b.total - a.total;
  });

  return ARR;
}


async function makePickOrder() {
  const raceid = await getLeaderboard().then(function (res) {
    return res.race_id;
  });
  const scores = await getScores(raceid);
  console.log('scores', scores);

  const OBJ = {};
  scores.forEach(function (each) {
    OBJ[each.playerid] = 0;
  });
  scores.forEach(function (each) {
    OBJ[each.playerid] += each.score;
  });
  console.log('OBJ', OBJ);

  const season = await getSeason();
  console.log('season', season);
  const seasono = {};
  season.forEach(function (each) {
    seasono[each.id] = each.sum;
  });

  const TEMP = Object.entries(OBJ);
  TEMP.forEach(function (each) {
    each[1] = each[1] + seasono[each[0]] / 10000;
  });

  TEMP.sort(function (a, b) {
    return a[1] - b[1];
  });

  TEMP.forEach(function (each, i) {
    each[2] = i % 2;
  });
  console.log(TEMP);

  const ARR = [];
  TEMP.forEach(function (each) {
    ARR[each[2]] = [];
  });

  const players = await getPlayers();
  TEMP.forEach(function (each) {
    ARR[each[2]].push({
      id: each[0],
      name: players[each[0]],
      rank: each[1],
    });
  });

  console.log('ARR', ARR);
  return ARR;
}

async function getPickSummary() {
  const schedule = await getSchedule()
  const race = schedule.find(x => !x.winner_driver_id)
  console.log("race", race)
  const pickorder = await getPickOrder(race.race_id)
  console.log("pickorder", pickorder)
  let ARR = []
  const groups = await getGroups()
  console.log("groups", groups)
  groups.forEach(function (each, i) {
    ARR.push({
      name: each.name,
      players: [],
      group: i
    })
  })
  const players = await getPlayers()
  pickorder.forEach(function (each) {
    ARR[each.groupid].players.push({
      id: each.playerid,
      name: players[each.playerid],
      score: Math.floor(each.rank),
      drivers: []
    })
  })
  const picks = await getPicks(race.race_id)
  const pickso = {}
  console.log("pickso", pickso)
  picks.forEach(function (each) {
    pickso[each.playerid] = []
  })
  const drivers = await getDrivers()
  const driverso = {}
  drivers.forEach(function (each) {
    driverso[each.driver_id] = each.driver_name
  })
  picks.forEach(function (each) {
    pickso[each.playerid].push({
      id: each.driverid,
      name: driverso[each.driverid]
    })
  })
  ARR.forEach(function (each) {
    each.players.forEach(function (item) {
      item.drivers = pickso[item.id] || []
    })
  })
  console.log("ARR", ARR)
  return ARR
}




async function showLeaderboard() {
  const leaders = await getLeaderboard()
  let ARR = []
  let pobj = { id: "", name: "", score: 0 }
  leaders.vehicles.forEach(function (each) {
    ARR.push({
      id: each.driver.driver_id,
      name: each.driver.full_name,
      pos: each.running_position,
      players: [structuredClone(pobj), structuredClone(pobj)]
    })
  })
  const picks = await getPicks(leaders.race_id)
  console.log("PICKS", picks)
  let pickso = {}
  picks.forEach(function (each) {
    pickso[each.driverid] = []
  })
  picks.forEach(function (each) {
    pickso[each.driverid][each.groupid] = each.playerid
  })
  const players = await getPlayers()
  ARR.forEach(function (each) {
    each.players.forEach(function (item, i) {
      item.id = pickso[each.id]?.[i]
      item.name = players[item.id] || ""
    })


  })

  ARR.reverse();
  [1, 2].forEach(function (_, i) {
    let counter = 1
    ARR.forEach(function (item) {
      if (item.players[i]?.id) {
        item.players[i].score = counter++
      }
      if (item.pos == 1) {
        item.players[i].score++
        item.players[i].score++
      }
    })
  })
  ARR.reverse()
  return ARR
}



async function makePicks(x) {
  const schedule = await getSchedule()
  const race = schedule.find(x => !x.winner_driver_id)
  const pickorder = await getPickOrder(race.race_id)
  console.log("pickorder", pickorder)
  const groupid = pickorder.find(each => each.playerid == x).groupid
  const drivers = await getDrivers()
  let OBJ = {
    group: groupid,
    id: race.race_id,
    drivers: []
  }
  drivers.forEach(function(each) {
    OBJ.drivers.push({
      id: each.driver_id,
      name: each.driver_name,
      badge: each.car_no,
      player: {
        id: "",
        name: ""
      },
      raceid: race.race_id,
    })
  })

  let picks = await getPicks(race.race_id)
  picks = picks.filter(function(each) {
    return each.groupid == groupid
  })
  const pickso = {}
  picks.forEach(function(each) {
    pickso[each.driverid] = each.playerid
  })
  console.log("pickso", pickso)

  const players = await getPlayers()

  OBJ.drivers.forEach(function(each) {
    each.player.id = pickso[each.id] || ""
    each.player.name = players[pickso[each.id]] || ""
  })







  return OBJ
}





//--------THESE ARE EXTRA HTML DOM BASED APIS ---------------
function getT1() {
  getSchedule().then(function (res) {
  const find = res.find((each) => !each.winner_driver_id);
  getPickOrder(find.race_id).then(function (res2) {
    console.log(res2);
    res2.sort(function (a, b) {
      return a.groupid - b.groupid;
    });
    getGroups().then(function (res6) {
      res6.forEach(function (each) {
        const tb = t1.createTBody();
        tb.id = each.gid;
        const tr = tb.insertRow();
        const th = document.createElement('TH');
        th.innerText = each.name;
        th.setAttribute('colspan', 2);
        tr.append(th);
      });
      res2.forEach(function (each) {
        const tb = document.getElementById(each.groupid);
        const tr = tb.insertRow();
        tr.id = each.playerid;
        tr.insertCell().innerHTML =
          '<b>' +
          each.playerid +
          '</b> ' +
          '<small>' +
          Math.floor(each.rank) +
          '</small>';
        tr.insertCell();
      });
      getPicks(find.race_id).then(function (res3) {
        res3.forEach(function (item) {
          const tr = document.getElementById(item.playerid);
          if (tr) {
            tr.cells[1].innerHTML +=
              "<div class='" + item.driverid + "'>" + item.driverid + '</div>';
          }
        });
        getDrivers().then(function (res4) {
          res4.forEach(function (forr) {
            let div = t1.getElementsByClassName(forr.driver_id);
            if (div) {
              for (let i = 0; i < div.length; i++) {
                div[i].innerText = forr.driver_name;
              }
            }
          });
          getPlayers().then(function (res5) {
            for (let i in res5) {
              document.getElementById(i).cells[0].querySelector('B').innerText =
                res5[i];
            }
          });
        });
      });
    });
  });
});
}


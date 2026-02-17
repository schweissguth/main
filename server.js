Array.prototype.makeObj = function() {
  let header = this.shift()
  return this.map(function(each) {
    let obj = {}
    for (let i = 0; i < header.length; i++) {
      obj[header[i]] = each[i] || null
    }
    return obj
  })
}


Array.prototype.fid = function(id, oid) {
  oid = oid || "id"
  return this.find(function(find) {
    return find[oid] == id
  }) || {}
}





function currentResults() {
  return fetch("https://cf.nascar.com/data/cacher/production/live/current-results.json").then(
    function (res) {
      return res.json()
    },
  )
}

function getOps() {
  return fetch("https://cf.nascar.com/live-ops/live-ops.json").then(
    function (res) {
      return res.json()
    },
  )
}

function nextRace() {
  return getSchedule().then(function(res) {
    console.log(res)
    res = res.find(function(race) {
    return !race.winner_driver_id
  }).race_id
  return res
  })
}


function prevRace(x) {
  return fetch(
    "https://sheets.googleapis.com/v4/spreadsheets/1jwadkJYYfBmf-SbjUokDV0S_yzC7gD39-jHxVatJfLU/values/SCORING?key=AIzaSyDIEdL4EcBenrWDkh03oFYmFvHT_VNH3AI",
  )
    .then(function (res) {
      return res.json()
    })
    .then(function (res) {
      res = res.values.makeObj().pop()
      return res.RACEID
    })
}


function getPicks(x) {
  return fetch(
    "https://sheets.googleapis.com/v4/spreadsheets/1jwadkJYYfBmf-SbjUokDV0S_yzC7gD39-jHxVatJfLU/values/PICKS?key=AIzaSyDIEdL4EcBenrWDkh03oFYmFvHT_VNH3AI",
  )
    .then(function (res) {
      return res.json()
    })
    .then(function (res) {
      if (x) {
        return res.values.makeObj().filter(function(filter) {
          return filter.RACEID == x
        })
      } else {
        return res.values.makeObj()
      }
    })
}

function getPickOrder(x) {
  return fetch(
    "https://sheets.googleapis.com/v4/spreadsheets/1jwadkJYYfBmf-SbjUokDV0S_yzC7gD39-jHxVatJfLU/values/PICKORDER?key=AIzaSyDIEdL4EcBenrWDkh03oFYmFvHT_VNH3AI",
  )
    .then(function (res) {
      return res.json()
    })
    .then(function (res) {
      if (x) {
        return res.values.makeObj().filter(function(filter) {
          return filter.RACEID == x
        }).sort(function(a, b) {
          return a.RANK - b.RANK
        })
      } else {
        return res.values.makeObj().sort(function(a, b) {
          return a.RANK - b.RANK
        })
      }
    })
}



function getChase() {
  return fetch(
    "https://sheets.googleapis.com/v4/spreadsheets/1jwadkJYYfBmf-SbjUokDV0S_yzC7gD39-jHxVatJfLU/values/CHASE?key=AIzaSyDIEdL4EcBenrWDkh03oFYmFvHT_VNH3AI",
  )
    .then(function (res) {
      return res.json()
    })
    .then(function (res) {
      return res.values.makeObj()
    })
}

function getData(x) {
  return fetch(
    'https://sheets.googleapis.com/v4/spreadsheets/1jwadkJYYfBmf-SbjUokDV0S_yzC7gD39-jHxVatJfLU/values/' +
      x +
      '?key=AIzaSyDIEdL4EcBenrWDkh03oFYmFvHT_VNH3AI',
  )
    .then(function (res) {
      return res.json()
    })
    .then(function (res) {
      return res.values.makeObj()
    })
}

function getScores(raceid) {
  return getData('SCORES').then(function (res) {
    return res.filter(function(filter) {
      return filter.RACEID == raceid
    })
  })
}

function getScores(raceid) {
  return getData('SCORES').then(function (res) {
    return res.filter(function (filter) {
      return filter.RACEID == raceid
    })
  })
}

function getPlayers() {
  return getData('PLAYERS').then(function (res) {
    return res.filter(function (filter) {
      return filter.ACTIVE == "TRUE"
    })
  })
}

function playersObj() {
  return getPlayers().then(function(res) {
    let obj = {}
    res.forEach(function(player) {
      obj[player.ID] = player
    })
    return obj
  })
}



function getSeason() {
  return getData('SEASON')
}

function getSchedule() {
  return fetch("https://cf.nascar.com/cacher/2026/1/race_list_basic.json").then(
    function (res) {
      return res.json()
    },
  )
}

function getLiveFeed() {
  return fetch("https://cf.nascar.com/cacher/live/live-feed.json").then(
    function (res) {
      return res.json()
    },
  )
}

function getStandings() {
  return fetch("https://cf.nascar.com/cacher/2026/1/points-feed.json").then(
    function (res) {
      return res.json()
    },
  )
}

function getResults(x) {
  return fetch(
    "https://cf.nascar.com/data/cacher/production/2026/1/" +
      x +
      "/raceResults.json",
  ).then(function (res) {
    return res.json()
  })
}

function getFlag() {
  return fetch("https://cf.nascar.com/cacher/live/live-feed.json").then(
    function (res) {
      return res.json()
    },
  )
}

function getLapNotes() {
  return getLiveFeed()
    .then(function (liverace) {
      return liverace.race_id
    })
    .then(function (raceid) {
      return fetch(
        "https://cf.nascar.com/cacher/2026/1/" + raceid + "/lap-notes.json",
      )
    })
    .then(function (res) {
      return res.json()
    })
    .then(function (res) {
      return res.laps
    })
}

function getStages(x) {
  return fetch(
    "https://cf.nascar.com/cacher/2026/1/" + x + "/live-stage-points.json",
  ).then(function (res) {
    return res.json()
  })
}

function getPoints(x) {
  return fetch(
    "https://cf.nascar.com/live/feeds/series_1/" + x + "/live_points.json",
  ).then(function (res) {
    return res.json()
  })
}

function getGroups() {
  return fetch(
    "https://sheets.googleapis.com/v4/spreadsheets/1jwadkJYYfBmf-SbjUokDV0S_yzC7gD39-jHxVatJfLU/values/GROUPS?key=AIzaSyDIEdL4EcBenrWDkh03oFYmFvHT_VNH3AI",
  )
    .then(function (res) {
      return res.json()
    })
    .then(function (res) {
      return res.values.makeObj()
    })
}



async function getRunningOrder() {
  const race = await getLiveFeed()
  const groups = await getGroups()
  const picks = await getPicks(race.race_id)
  const players = await getPlayers()

  let ARR = []
  groups.forEach(function (group, g) {
    ARR.push({
      drivers: [],
    })
    race.vehicles.forEach(function(driver) {
      ARR[g].drivers.push({
        id: driver.driver.driver_id,
        name: driver.driver.full_name,
        delta: driver.delta,
        playerid: "",
        playername: "",
        pos: driver.running_position,
        raceid: race.race_id
      })
    })
  })

  picks.forEach(function(pick) {
    pick.PLAYERNAME = players.fid(pick.PLAYERID, "PLAYERID").PLAYERNAME || ""
  })

  console.log("PICKS", picks)

  picks.forEach(function(pick) {
    let obj = ARR[pick.GROUPID].drivers.fid(pick.DRIVERID)
    obj.playerid = pick.PLAYERID
    obj.playername = pick.PLAYERNAME
  })

  ARR.forEach(function(group) {
    group.drivers.reverse()
    let counter = 1
    group.drivers.forEach(function(driver) {
      driver.score = 0
      if (driver.playerid) driver.score = counter++
    })
    group.drivers.reverse()
    group.drivers[0].score++
    group.drivers[0].score++
  })
  return ARR
}

async function getPlayerResults() {
  let runningorder = await getRunningOrder()
  let players = await getPlayers()
  let pickorder = await getPickOrder()
  let groups = await getGroups()

  let playersobj = {}
  players.forEach(function (player) {
    playersobj[player.PLAYERID] = player.PLAYERNAME
  })

  let OBJ = []
  groups.forEach(function () {
    OBJ.push({})
  })

  pickorder.forEach(function (picker, p) {
    OBJ[picker.GROUPID][picker.PLAYERID] = {
      id: picker.PLAYERID,
      name: playersobj[picker.PLAYERID],
      order: p,
      driverids: [],
      drivernames: [],
      scores: [],
      total: 0,
      pos: [],
      winnings: 0,
    }
  })

  runningorder.forEach(function (group, g) {
    group.drivers.forEach(function (driver) {
      if (driver.playerid) {
        let obj = OBJ[g][driver.playerid]
        obj.driverids.push(driver.id)
        obj.drivernames.push(driver.name)
        obj.scores.push(driver.score)
        obj.total += driver.score
        obj.pos.push(driver.pos)
      }
    })
  })

  OBJ.forEach(function (group, g) {
    let max = 0
    let len = 0
    for (let i in group) {
      let total = group[i].total
      if (total > max) max = total
    }
    for (let i in group) {
      if (group[i].total == max) len++
    }
    for (let i in group) {
      if (group[i].total == max) group[i].winnings = 2 / len
    }
  })

  console.log(OBJ)

  let ARR = []

  OBJ.forEach(function (group, g) {
    let arr = []
    for (let i in group) {
      arr.push(group[i])
    }
    ARR.push(arr)
  })

  ARR.forEach(function (group) {
    group.sort(function (a, b) {
      return b.total - a.total
    })
  })

  return ARR
}

async function getPickOrder(raceid) {
  const scores = await getScores(raceid)
  const season = await getSeason()
  const players = await playersObj()

  let map = new Map()
  scores.forEach(function (score) {
    map.set(score.PLAYERID, {
      id: score.PLAYERID,
      name: players[score.PLAYERID].NAME,
      rank: 0,
    })
  })
  scores.forEach(function (score) {
    map.get(score.PLAYERID).rank += parseInt(score.SCORE)
  })

  console.log('season', season)
  season.forEach(function (player) {
    map.get(player.ID).rank += parseInt(player.SUM) / 1000
  })
  map = [...map.values()]
  map.sort(function (a, b) {
    return b.rank - a.rank
  })
  map.forEach(function(item, i) {
    item.groupid = i % 2
  })
  console.log(map)
}



/*
https://cf.nascar.com/cacher/drivers.json
https://cf.nascar.com/cacher/live/live-feed.json
https://cf.nascar.com/cacher/live/series_1/RACEID/live-pit-data.json
https://cf.nascar.com/cacher/tracks.json
https://cf.nascar.com/cacher/YYYY/1/points-feed.json
https://cf.nascar.com/cacher/YYYY/1/RACEID/driver-recap.json
https://cf.nascar.com/cacher/YYYY/1/RACEID/lap-averages.json
https://cf.nascar.com/cacher/YYYY/1/RACEID/lap-notes.json
https://cf.nascar.com/cacher/YYYY/1/RACEID/lap-times.json
https://cf.nascar.com/cacher/YYYY/1/RACEID/live-stage-points.json
https://cf.nascar.com/cacher/YYYY/1/RACEID/snappytv.json
https://cf.nascar.com/cacher/YYYY/1/RACEID/weekend-feed.json
https://cf.nascar.com/cacher/YYYY/1/schedule-feed.json
https://cf.nascar.com/cacher/YYYY/race_list_basic.json
https://cf.nascar.com/data/cacher/production/RACEID/1/RACEID/raceResults.json
https://cf.nascar.com/live-ops/live-ops.json
https://cf.nascar.com/live/feeds/live-flag-data.json
https://cf.nascar.com/live/feeds/series_1/RACEID/live_feed.json
https://cf.nascar.com/live/feeds/series_1/RACEID/live_points.json
https://cf.nascar.com/loopstats/prod/YYYY/1/RACEID.json
https://www.nascar.com/wp-json/
https://www.nascar.com/wp-json/wp/v2/categories/14278
https://www.nascar.com/wp-json/wp/v2/race_schedule/389629
https://www.nascar.com/wp-json/wp/v2/weekend_schedule
https://cf.nascar.com/data/images/carbadges/1/01.png
https://cf.nascar.com/cacher/2025/1/final/1-owners-points.json
https://cf.nascar.com/cacher/staging/live/live-feed.json
//https://cf.nascar.com/cacher/2025/1/final/1-owners-points.json
//https://cf.nascar.com/data/cacher/production/2025/1/racinginsights-points-feed.json
//https://www.nascar.com/json/tracks/
//https://cf.nascar.com/cacher/2026/1/schedule-combined-feed.json
//https://www.nascar.com/json/drivers/
//https://fantasygames.nascar.com/api/v1/live/odds/race/5585.json
*/

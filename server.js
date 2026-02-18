
    async function picksObj(x) {
  const picks = await getPicks(x)
  let picksobj = []
  picks.forEach(function(pick) {
    picksobj[pick.GROUPID] = {}
  })
  picks.forEach(function(pick) {
    picksobj[pick.GROUPID][pick.DRIVERID] = pick.PLAYERID
  })
  return picksobj
}

async function getPickSummary(x) {
  const pickorder = await pickorderObj(5596)
  const playersobj = await playersObj()
  const playerpicksobj = await playerpicksObj(5596)
  const driversobj = await driversObj()
  console.log("driversobj", driversobj)

  let picksummary = []
  pickorder.forEach(function(group, g) {
    picksummary[g] = []
  })
  pickorder.forEach(function(group, g) {
    group.forEach(function(playerid) {
      let arr = []
      playerpicksobj[playerid].forEach(function(driverid) {
        arr.push(driversobj[driverid].driver_name)
      })
      picksummary[g].push({
        id: playerid,
        name: playersobj[playerid].NAME,
        driverids: playerpicksobj[playerid],
        drivernames: arr
      })
    })
  })
  return picksummary
}

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
    res = res.filter(function(race) {
      return race.race_type_id == 1
    })
    res = res.find(function(race) {
    return !race.winner_driver_id
  }).race_id
  return res
  })
}


function prevRace() {
  return getSchedule().then(function(res) {
    res = res.filter(function(race) {
      return race.race_type_id == 1
    })
    res.reverse()
    res = res.find(function(race) {
    return race.winner_driver_id
  }).race_id
  return res
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

async function groupObj() {
  const schedule = await getSchedule()
  const pickorder = await getPickOrder()
  
  let groupobj = {}
  schedule.forEach(function (race) {
    groupobj[race.race_id] = {}
  })
  pickorder.forEach(function (picker) {
    groupobj[picker.RACEID][picker.PLAYERID] = {
      group: picker.GROUPID,
      rank: picker.RANK,
    }
  })
  return groupobj
}

async function picksObj(x) {
  const picks = await getPicks(x)
  let picksobj = []
  picks.forEach(function(pick) {
    picksobj[pick.GROUPID] = {}
  })
  picks.forEach(function(pick) {
    picksobj[pick.GROUPID][pick.DRIVERID] = pick.PLAYERID
  })
  return picksobj
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



function getPickOrder(x) {
  return fetch(
    'https://sheets.googleapis.com/v4/spreadsheets/1jwadkJYYfBmf-SbjUokDV0S_yzC7gD39-jHxVatJfLU/values/PICKORDER?key=AIzaSyDIEdL4EcBenrWDkh03oFYmFvHT_VNH3AI',
  )
    .then(function (res) {
      return res.json()
    })
    .then(function (res) {
      if (x) {
          res = res.values.makeObj()
          res = res.filter(function (filter) {
            return filter.RACEID == x
          })
          return res.sort(function(a, b) {
            return parseFloat(a.RANK) - parseFloat(b.RANK)
          })
      } else {
        return res.values.makeObj()
      }
    })
}



async function getRunningOrder() {
  const race = await getLiveFeed()
  const picks = await driverpicksobj(race.race_id)
  const players = await playersobj()

  let MAP = new Map()
  race.vehicles.forEach(function(driver) {
    MAP.set(driver.driver.driver_id, {
      id: driver.driver.driver_id,
      name: driver.driver.full_name,
      pos: driver.running_position,
      delta: driver.delta
    })
  })

  MAP.forEach(function(driver) {
    driver.groups = new Array(picks.length)
  })

  picks.forEach(function(pick, p) {
    MAP.forEach(function(driver) {
      driver.groups[p] = {
        id: picks[p][driver.id] || null,
        name: players[picks[p][driver.id]]?.NAME,
        pts: 0
      }
    })
  })

  MAP = new Map([...MAP].reverse())
  picks.forEach(function(pick, p) {
    let counter = 0
    MAP.forEach(function(driver) {
      let loc = driver.groups[p]
      if (loc.id) loc.pts = ++counter
    })
  })
  MAP = new Map([...MAP].reverse())
  return [...MAP]
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

async function makePickOrder(raceid) {
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

  season.forEach(function (player) {
    map.get(player.ID).rank += parseInt(player.SUM) / 1000
  })
  map = [...map.values()]
  map.sort(function (a, b) {
    return a.rank - b.rank
  })
  map.forEach(function(item, i) {
    item.groupid = i % 2
  })
  return map
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















async function playersobj() {
  const players = await getPlayers()
  let obj = {}
  players.forEach(function(player) {
    obj[player.ID] = player
  })
  return obj
}

async function driversobj() {
  const drivers = await getStandings()
  let obj = {}
  drivers.forEach(function(driver) {
    obj[driver.driver_id] = {
      name: driver.driver_name,
      id: driver.driver_id,
      badge: driver.car_no
    }
  })
  return obj
}

async function playerpicksobj(raceid) {
  const players = await getPlayers()
  const array = await driverpicksobj(raceid)
  let obj = {}
  players.forEach(function(player) {
    obj[player.ID] = []
  })
  array.forEach(function(group) {
    for (let i in group) {
      if (group[i]) obj[group[i]].push(i)
    }
  })
  return obj
}

async function driverpicksobj(raceid) {
  const array = await getPicks(raceid)
  let arr = []
  array.forEach(function(item) {
    arr[item.GROUPID] = {}
  })
  array.forEach(function(item) {
    arr[item.GROUPID][item.DRIVERID] = item.PLAYERID || ""
  })
  return arr
}

async function pickorderobj(raceid) {
  const array = await getPickOrder(raceid)
  let arr = []
  array.forEach(function(group) {
    arr[group.GROUPID] = []
  })
  array.forEach(function(group) {
    arr[group.GROUPID].push({
      id: group.PLAYERID,
      rank: group.RANK
    })
  })
  return arr
}

async function driverscoresobj(raceid) {
  const array = await getScores(raceid)
  let arr = []
  array.forEach(function(driver) {
    arr[driver.GROUPID] = {}
  })
  array.forEach(function(driver) {
    arr[driver.GROUPID][driver.DRIVERID] = driver
  })
  return arr
}

async function playerscoresobj(raceid) {
  const array = await getScores(raceid)
  let arr = []
  array.forEach(function(driver) {
    arr[driver.PLAYERID] = []
  })
  array.forEach(function(driver) {
    arr[driver.PLAYERID].push(driver)
  })
  array.forEach(function(item) {
    arr[item.PLAYERID].total = 0
    arr[item.PLAYERID].forEach(function(d) {
      arr[item.PLAYERID].total += parseInt(d.SCORE)
    })
  })
  return arr
}




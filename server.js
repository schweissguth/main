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


//https://cf.nascar.com/cacher/2025/1/final/1-owners-points.json
//https://cf.nascar.com/data/cacher/production/2025/1/racinginsights-points-feed.json
//https://www.nascar.com/json/tracks/
//https://cf.nascar.com/cacher/2026/1/schedule-combined-feed.json
//https://www.nascar.com/json/drivers/
//https://fantasygames.nascar.com/api/v1/live/odds/race/5585.json


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

function getPlayers(x) {
  return fetch(
    "https://sheets.googleapis.com/v4/spreadsheets/1jwadkJYYfBmf-SbjUokDV0S_yzC7gD39-jHxVatJfLU/values/PLAYERS?key=AIzaSyDIEdL4EcBenrWDkh03oFYmFvHT_VNH3AI",
  )
    .then(function (res) {
      return res.json()
    })
    .then(function (res) {
      if (true) {
        return res.values.makeObj().filter(function(filter) {
          return filter.ACTIVE == "TRUE"
        })
      } else {
        return res.values.makeObj()
      }
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

function getSeason() {
  return fetch(
    "https://sheets.googleapis.com/v4/spreadsheets/1jwadkJYYfBmf-SbjUokDV0S_yzC7gD39-jHxVatJfLU/values/SEASON?key=AIzaSyDIEdL4EcBenrWDkh03oFYmFvHT_VNH3AI",
  )
    .then(function (res) {
      return res.json()
    })
    .then(function (res) {
      return res.values.makeObj()
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

function getScores() {
  return fetch(
    "https://sheets.googleapis.com/v4/spreadsheets/1jwadkJYYfBmf-SbjUokDV0S_yzC7gD39-jHxVatJfLU/values/SCORING?key=AIzaSyDIEdL4EcBenrWDkh03oFYmFvHT_VNH3AI",
  )
    .then(function (res) {
      return res.json()
    })
    .then(function (res) {
      return res.values.makeObj()
    })
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
*/

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

function getOps() {
  return fetch("https://cf.nascar.com/live-ops/live-ops.json").then(
    function (res) {
      return res.json()
    },
  )
}

function getCurrentRace() {
  return fetch("https://cf.nascar.com/live-ops/live-ops.json")
    .then(function (res) {
      return res.json()
    })
    .then(function (res) {
      return res.live_current_series1_race
    })
}

function getPrevRace() {
  return fetch("https://cf.nascar.com/live-ops/live-ops.json")
    .then(function (res) {
      return res.json()
    })
    .then(function (res) {
      return res.live_drive__ng_race_id
    })
}

function getPlayers() {
  return fetch(
    "https://sheets.googleapis.com/v4/spreadsheets/1jwadkJYYfBmf-SbjUokDV0S_yzC7gD39-jHxVatJfLU/values/PLAYERS?key=AIzaSyDIEdL4EcBenrWDkh03oFYmFvHT_VNH3AI",
  )
    .then(function (res) {
      return res.json()
    })
    .then(function (res) {
      return res.values.makeObj()
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

function getPickOrder() {
  return fetch(
    "https://sheets.googleapis.com/v4/spreadsheets/1jwadkJYYfBmf-SbjUokDV0S_yzC7gD39-jHxVatJfLU/values/PICKORDER?key=AIzaSyDIEdL4EcBenrWDkh03oFYmFvHT_VNH3AI",
  )
    .then(function (res) {
      return res.json()
    })
    .then(function (res) {
      return res.values.makeObj()
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

function getInfo() {
  return fetch(
    "https://sheets.googleapis.com/v4/spreadsheets/1jwadkJYYfBmf-SbjUokDV0S_yzC7gD39-jHxVatJfLU/values/INFO?key=AIzaSyDIEdL4EcBenrWDkh03oFYmFvHT_VNH3AI",
  )
    .then(function (res) {
      return res.json()
    })
    .then(function (res) {
      let obj = {}
      res.values.forEach(function(item) {
        obj[item[0]] = item[1]
      })
      return obj
    })
}

function getSchedule() {
  return fetch("https://cf.nascar.com/cacher/2025/1/race_list_basic.json").then(
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
  return fetch("https://cf.nascar.com/cacher/2025/1/points-feed.json").then(
    function (res) {
      return res.json()
    },
  )
}

function getResults(x) {
  return fetch(
    "https://cf.nascar.com/data/cacher/production/2025/1/" +
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
        "https://cf.nascar.com/cacher/2025/1/" + raceid + "/lap-notes.json",
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
    "https://cf.nascar.com/cacher/2025/1/" + x + "/live-stage-points.json",
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

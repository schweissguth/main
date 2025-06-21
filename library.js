Array.prototype.makeObj = function () {
  var header = this.shift()
  var json = this.map(function (row) {
    return row.reduce(function (acc, cur, i) {
      acc[header[i]] = cur
      return acc
    }, {})
  })
  return json
}

function getStandings() {
  const urls = [
    "https://cf.nascar.com/live-ops/live-ops.json",
    "https://cf.nascar.com/cacher/2025/1/points-feed.json",
    "https://sheets.googleapis.com/v4/spreadsheets/1jwadkJYYfBmf-SbjUokDV0S_yzC7gD39-jHxVatJfLU/values/PICKS?key=AIzaSyDIEdL4EcBenrWDkh03oFYmFvHT_VNH3AI",
    "https://cf.nascar.com/cacher/drivers.json"
  ]

  return Promise.all(urls.map(function (url) {
      return fetch(url).then(function (res) {
        if (res.ok) {
          return res.json()
        }
      })
    }),
  ).then(function (res) {
    let live = res[0]
    let standings = res[1]
    let picks = res[2].values.makeObj()
    let drivers = res[3].response
    return standings.map(function(standing) {
      standing.badge = drivers.find(function(driver) {
        return driver.Nascar_Driver_ID == standing.driver_id
      })?.Badge_Image
      standing.pick = picks.findLast(function(pick) {
        return pick.DRIVERID == standing.driver_id && pick.RACEID == live.live_current_series1_race
      })?.PLAYERID
      standing.raceid = live.live_current_series1_race
      return standing
    })
  })
}


function getPickorder() {
  const urls = [
    "https://sheets.googleapis.com/v4/spreadsheets/1jwadkJYYfBmf-SbjUokDV0S_yzC7gD39-jHxVatJfLU/values/PICKORDER?key=AIzaSyDIEdL4EcBenrWDkh03oFYmFvHT_VNH3AI",
    "https://sheets.googleapis.com/v4/spreadsheets/1jwadkJYYfBmf-SbjUokDV0S_yzC7gD39-jHxVatJfLU/values/PLAYERS?key=AIzaSyDIEdL4EcBenrWDkh03oFYmFvHT_VNH3AI",
    "https://sheets.googleapis.com/v4/spreadsheets/1jwadkJYYfBmf-SbjUokDV0S_yzC7gD39-jHxVatJfLU/values/PICKS?key=AIzaSyDIEdL4EcBenrWDkh03oFYmFvHT_VNH3AI",
    "https://cf.nascar.com/cacher/2025/1/points-feed.json",
    "https://cf.nascar.com/live-ops/live-ops.json",
  ]

  return Promise.all(urls.map(function(url) {
    return fetch(url).then(function(res) {
      if (res.ok) {
        return res.json()
      }
    })
  })).then(function(res) {
    let pickers = res[0].values.makeObj()
    let players = res[1].values.makeObj()
    let picks = res[2].values.makeObj()
    let standings = res[3]
    let live = res[4]

    standings = standings.map(function(standing) {
      standing.pick = picks.findLast(function(pick) {
        return pick.DRIVERID == standing.driver_id && live.live_current_series1_race == pick.RACEID
      })?.PLAYERID
      return standing
    })

    pickers = pickers.map(function(picker) {
      picker.playername = players.findLast(function(player) {
        return player.PLAYERID == picker.PLAYERID
      })?.PLAYERNAME
      picker.cell = players.findLast(function(player) {
        return player.PLAYERID == picker.PLAYERID
      })?.PHONE
      picker.picks = standings.filter(function(standing) {
        return standing.pick == picker.PLAYERID
      })
      return picker
    })
    return pickers.sort(function(a, b) {
      return a.PICKORDER - b.PICKORDER
    })
  })
}

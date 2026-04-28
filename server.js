Array.prototype.makeObj = function () {
  let header = this.shift();
  return this.map(function (each) {
    let obj = {};
    for (let i = 0; i < header.length; i++) {
      obj[header[i].toLowerCase()] = each[i] || null;
    }
    return obj;
  });
};

function getData(x) {
  return fetch(
    'https://sheets.googleapis.com/v4/spreadsheets/1jwadkJYYfBmf-SbjUokDV0S_yzC7gD39-jHxVatJfLU/values/' +
    x +
    '?key=AIzaSyDIEdL4EcBenrWDkh03oFYmFvHT_VNH3AI',
  )
    .then(function (res) {
      return res.json();
    })
    .then(function (res) {
      return res.values.makeObj();
    });
}

function getLeaderboard() {
  return fetch('https://cf.nascar.com/cacher/live/live-feed.json').then(
    function (res) {
      return res.json();
    },
  );
}

function getPicks(x) {
  return getData('PICKS').then(function (res) {
    res = res.filter(function (pick) {
      return pick.raceid == x;
    });
    return res.filter(function (filter, f) {
      return (
        res.findLastIndex(function (find) {
          return (
            find.driverid == filter.driverid && find.groupid == filter.groupid
          );
        }) == f
      );
    });
  });
}

function getPickOrder(x) {
  return getData('PICKORDER').then(function (res) {
    return res.filter(function (pick) {
      return pick.raceid == x;
    });
  });
}

function getPlayers() {
  return getData('PLAYERS').then(function (res) {
    res = res.filter(function (pick) {
      return pick.active == 'TRUE';
    });
    let obj = {};
    res.forEach(function (each) {
      obj[each.playerid] = each.playername;
    });
    return obj;
  });
}

function getScores(x) {
  return getData('SCORES').then(function (res) {
    res = res.filter(function (each) {
      return each.raceid == x;
    });
    res.forEach(function (each) {
      each.groupid = Number(each.groupid);
      each.pos = Number(each.pos);
      each.score = Number(each.score);
      each.winnings = Number(each.winnings);
    });
    return res;
  });
}

function getSeason() {
  return getData('SEASON').then(function (res) {
    res.forEach(function (each) {
      each.sum = Number(each.sum);
    });
    return res;
  });
}

function getSchedule() {
  return fetch('https://cf.nascar.com/cacher/2026/1/race_list_basic.json').then(
    function (res) {
      return res.json();
    },
  );
}

function getGroups() {
  return getData('GROUPS').then(function (res) {
    res.forEach(function (each) {
      each.gid = Number(each.gid);
    });
    return res;
  });
}

function getDrivers() {
  return fetch("https://cf.nascar.com/cacher/2026/1/points-feed.json").then(
    function (res) {
      return res.json()
    },
  ).then(function(res) {
    return res.sort(function(a, b) {
      return a.position - b.position
    })
  })
}


function getLapNotes() {
  return getLiveFeed()
    .then(function (liverace) {
      return liverace.race_id
    })
    .then(function (raceid) {
      return fetch(
        "",
      )
    })
    .then(function (res) {
      return res.json()
    })
    .then(function (res) {
      return res.laps
    })
}


function getLapNotes(x, y) {
  return fetch("https://cf.nascar.com/cacher/2026/" + x + "/" + y + "/lap-notes.json").then(
    function (res) {
      return res.json()
    }).then(function(res) {
      res = res.laps
      res = Object.entries(res).reverse()
      res = res.map(function(each) {
        let str = ""
        each[1].forEach(function(item) {
          str += item.Note + ". "
        })
        return [each[0], str]
      })
      return res
    })
}




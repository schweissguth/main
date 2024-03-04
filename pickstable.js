function makeObj(contents) {
  contents = contents.split('"table":')[1]
  contents = contents.split("});")[0]
  contents = JSON.parse(contents)

  const arr = []
  contents.rows.forEach(function(item, i) {
    var obj = {}
    item.c.forEach(function(jtem, j) {
      var val = ""
      try {
        val = jtem.f
        val = jtem.v
      } catch(err) {
        val = ""
      }
      obj[contents.cols[j].label] = val
    })
    arr.push(obj)
  })
  return arr
}


function picksTable() {
  fetch("https://docs.google.com/spreadsheets/u/0/d/1jwadkJYYfBmf-SbjUokDV0S_yzC7gD39-jHxVatJfLU/gviz/tq?sheet=INFO&tqx=out:json&tq=SELECT A, B").then(result => result.text()).then(function(result) {
  	result = makeObj(result)
    var RACENO = 0
    var RESULTS = []
    var STAGES = []
    var PLAYERS = []
    var PICKS = []
    RACENO = result[0].VALUE
    //console.log(RACENO)
    getResults()

    function getResults() {
      fetch("https://cf.nascar.com/cacher/2024/1/" + RACENO + "/weekend-feed.json").then(function(res) {
        return res.json()
      }).then(function(res) {
        RESULTS = res.weekend_race[0].results.filter(item => item.finishing_position > 0)
        //console.log("raw results", RESULTS)
        STAGES = res.weekend_race[0].stage_results
        //console.log("raw stages", STAGES)
        getPlayers()
      });

    }


    function getPlayers() {
      fetch("https://docs.google.com/spreadsheets/u/0/d/1jwadkJYYfBmf-SbjUokDV0S_yzC7gD39-jHxVatJfLU/gviz/tq?sheet=PICKORDER&tqx=out:json&tq=SELECT A, B, C").then(res => res.text()).then(function(res) {
      	res = makeObj(res)
        PLAYERS = res
        //console.log("raw players", PLAYERS)
        getPicks()
      })

    }


    function getPicks() {
      fetch("https://docs.google.com/spreadsheets/u/0/d/1jwadkJYYfBmf-SbjUokDV0S_yzC7gD39-jHxVatJfLU/gviz/tq?sheet=PICKS&tqx=out:json&tq=SELECT * where B = " + RACENO + " order by A DESC").then(res => res.text()).then(function(res) {
        res = makeObj(res)
        PICKS = res
        //console.log("raw picks", PICKS)
        mapPicks()
      })

    }


    function mapPicks() {
      RESULTS.map(function(atem) {
        atem.BONUS = 0
        var find = PICKS.find(function(btem) {
          return atem.driver_id == btem.DRIVERID
        }) || {
          PLAYERID: "",
          PLAYER: ""
        }
        Object.assign(atem, find)

        if (atem.driver_id == STAGES[0].results[0].driver_id) {
          atem.BONUS++
        }

        if (atem.driver_id == STAGES[1].results[0].driver_id) {
          atem.BONUS++
        }

      })

      RESULTS[0].BONUS++
      RESULTS[0].BONUS++

      //console.log("RESUTS + BONUNS", RESULTS)

      RESULTS.reverse()
      var count = 0
      RESULTS.map(function(item) {
        if (item.PLAYERID) {
          item.PTS = ++count
        }
      })
      RESULTS.reverse()

      mapResults()
    }


    function mapResults() {
      PLAYERS.map(function(atem) {
        var filter = RESULTS.filter(function(btem) {
          return btem.PLAYERID == atem.ID
        }) || [
          [""],
          [""]
        ]
        var total = filter.reduce(function(sum, item) {
          return sum + item.PTS + item.BONUS
        }, 0)
        atem.picks = filter
        atem.TOTAL = total

      })
      //console.log("map results", PLAYERS)
      makeTable()

    }




    function makeTable() {
    	pt.innerHTML = null;
      PLAYERS.forEach(function(item) {
        var tr = pt.insertRow()
        tr.insertCell().innerHTML = "<b>" + item.PLAYER + "</b> <small>(" + parseFloat(item.TOTAL).toFixed(0) + ")</small>"
        var td = tr.insertCell()
        td.style.width = "200px"
        var t = document.createElement("table")
        t.style.width = "100%"
        t.style.boxSizing = "border-box"
        td.append(t)
        item.picks.forEach(function(jtem) {
          var itr = t.insertRow()
          var itd1 = itr.insertCell()
            itd1.innerHTML = jtem.driver_fullname
          var itd2 = itr.insertCell()
            itd2.style.width = "20px"
            itd2.innerHTML = jtem.finishing_position
          var itd3 = itr.insertCell()
            itd3.style.width = "20px"
            itd3.innerHTML = jtem.PTS
        })
        tr.insertCell().innerHTML = "<b>" + item.TOTAL + "</b>"
      })
    }






  })

}

picksTable()

setInterval(function(){
  picksTable()
}, 30000)

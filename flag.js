fetch("https://cf.nascar.com/cacher/live/live-feed.json").then(res => res.json()).then(function(res) {
	console.log(res)
var flag = document.getElementById("pflag")
      switch (res.flag_state) {
        case 8:
          flag.innerHTML = "<big>🏴 black</big>"
          break;
        case 1:
          flag.innerHTML = "<big>🟢 green</big>"
          break;
        case 2:
          flag.innerHTML = "<big>🟡 caution</big>"
          break;
        case 4:
          flag.innerHTML = "<big>🏁 checkered</big>"
          break;
        case 9:
          flag.innerHTML = "<big>🏁</big>"
          break;
      }
      
      pstage.innerHTML = "Stage " + res.stage.stage_num
      plaps.innerHTML = res.laps_to_go + " laps to go"
      ptrack.innerHTML = res.track_name
    
})

fetch("https://cf.nascar.com/cacher/live/live-feed.json").then(res => res.json()).then(function(res) {
	console.log(res)
  raceno = res.flag_state
var FLAG = 0
      switch (res.flag_state) {
        case 8:
          FLAG = "🏴 black"
          break;

        case 1:
          FLAG = "🟢 green"
          break;

        case 2:
          FLAG = "🟡 caution"
          break;

        case 4:
          FLAG = "🏁 checkered"
          break;

        case 9:
          FLAG = "🏁"
          break;
      }
      document.getElementById("pflag").innerHTML = FLAG
    

})

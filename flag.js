
var FLAG = 0
      switch (flagstatus) {
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
          FLAG = "🏁 checkered"
          break;
      }
      document.getElementById("pflag").innerHTML = FLAG
    

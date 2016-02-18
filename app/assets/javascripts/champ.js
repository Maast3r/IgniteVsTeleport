var winChart, lossChart;

var chartOptions = {
  //Boolean - Whether we should show a stroke on each segment
  segmentShowStroke : true,

  //String - The colour of each segment stroke
  segmentStrokeColor : "#fff",

  //Number - The width of each segment stroke
  segmentStrokeWidth : 2,

  //Number - The percentage of the chart that we cut out of the middle
  percentageInnerCutout : 50, // This is 0 for Pie charts

  //Number - Amount of animation steps
  animationSteps : 100,

  //String - Animation easing effect
  animationEasing : "easeOutBounce",

  //Boolean - Whether we animate the rotation of the Doughnut
  animateRotate : true,

  //Boolean - Whether we animate scaling the Doughnut from the centre
  animateScale : false,

  //String - A legend template
  legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<segments.length; i++){%><li><span style=\"background-color:<%=segments[i].fillColor%>\"></span><%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%></ul>"

};

$( document ).ready(function() {
  var helpers = Chart.helpers;
  console.log("started");

  var startingData1 = [
      {
          value: 50,
          color:"#F7464A",
          highlight: "pink",
          label: "Top"
      },
      {
          value: 50,
          color: "#46BFBD",
          highlight: "pink",
          label: "Jungle"
      },
      {
          value: 50,
          color: "#FDB45C",
          highlight: "pink",
          label: "Mid"
      },
      {
          value: 50,
          color: "purple",
          highlight: "pink",
          label: "Bot"
      }
  ];

  var startingData2 = [
      {
          value: 50,
          color:"#F7464A",
          highlight: "pink",
          label: "Top"
      },
      {
          value: 50,
          color: "#46BFBD",
          highlight: "pink",
          label: "Jungle"
      },
      {
          value: 50,
          color: "#FDB45C",
          highlight: "pink",
          label: "Mid"
      },
      {
          value: 50,
          color: "purple",
          highlight: "pink",
          label: "Bot"
      }
  ];


  var ctx = document.getElementById("chart").getContext("2d");
  winChart = new Chart(ctx).Doughnut(startingData1, chartOptions);
  var legendHolder = document.createElement("div");
  legendHolder.innerHTML = winChart.generateLegend();
  helpers.each(legendHolder.firstChild.childNodes, function (legendNode, index) {
    legendNode.style.backgroundColor = winChart.segments[index].fillColor;
      helpers.addEvent(legendNode, 'mouseover', function () {
          var activeSegment = winChart.segments[index];
          activeSegment.save();
          winChart.showTooltip([activeSegment]);
          activeSegment.restore();
      });
  });
  helpers.addEvent(legendHolder.firstChild, 'mouseout', function () {
      winChart.draw();
  });
  winChart.chart.canvas.parentNode.parentNode.appendChild(legendHolder.firstChild);

  var ctx2 = document.getElementById("chart2").getContext("2d");
  lossChart = new Chart(ctx2).Doughnut(startingData2, chartOptions);
  var legendHolder2 = document.createElement("div");
  legendHolder2.innerHTML = lossChart.generateLegend();
  helpers.each(legendHolder2.firstChild.childNodes, function (legendNode, index) {
    legendNode.style.backgroundColor = lossChart.segments[index].fillColor;
      helpers.addEvent(legendNode, 'mouseover', function () {
          var activeSegment = lossChart.segments[index];
          // console.log('activeSegment');
          activeSegment.save();
          lossChart.showTooltip([activeSegment]);
          activeSegment.restore();
      });
  });
  helpers.addEvent(legendHolder2.firstChild, 'mouseout', function () {
      lossChart.draw();
  });
  lossChart.chart.canvas.parentNode.parentNode.appendChild(legendHolder2.firstChild);

  //automatically select all ranks
  $('#allRanksCheckbox').click();
});

function getCheckedCheckboxesFor(callback) {
  var checkboxName = 'rank';
    var allName = "all";
    var checkboxes = document.querySelectorAll('input[name="' + checkboxName + '"]:checked'), values = [];
    Array.prototype.forEach.call(checkboxes, function(element) {
        values.push(element.value);
    });

    var all = document.querySelectorAll('input[name="' + allName + '"]:checked');
    Array.prototype.forEach.call(all, function(element) {
        element.checked = false;
    });

    populateTables(values, callback);

    return values;
}

function checkedAll(callback){
    var checkboxName = "rank";
    var allName = "all";
    var checkboxes = document.querySelectorAll('input[name="' + checkboxName + '"]:checked');
    Array.prototype.forEach.call(checkboxes, function(element) {
        element.checked = false;
    });

    values = ["unranked", "bronze", "silver", "gold", "platinum", "diamond", "master", "challenger"];
    populateTables(values, callback);
    return values;
}

function populateTables(ranks, callback){
  resetColors();
  console.log("populate");
  if(document.getElementById("totalGames")){
    console.log("here");
    var totalGames = document.getElementById("totalGames");
    var total = releventOverallData.games;
    totalGames.innerHTML = "Total Games: " + total/10
      + "<br/>Total Players: " + total;
  }

  var zero = 0;
  //overall
  var releventOverallData = getRank(overallData.flash_on_d, ranks);
  $('#overall .dGamesOverall').html(releventOverallData.games);
  $('#overall .dWinsOverall').html(releventOverallData.wins);
  $('#overall .dLossesOverall').html(releventOverallData.losses);
  var percent = parseFloat(isNaN((releventOverallData.wins * 100 / releventOverallData.games).toFixed(2)) ? zero.toFixed(2) : (releventOverallData.wins * 100 / releventOverallData.games).toFixed(2));
  $('#overall .dPercentOverall').html(percent);

  releventOverallData = getRank(overallData.flash_on_f, ranks);
  $('#overall .fGamesOverall').html(releventOverallData.games);
  $('#overall .fWinsOverall').html(releventOverallData.wins);
  $('#overall .fLossesOverall').html(releventOverallData.losses);
  var percent2 = parseFloat(isNaN((releventOverallData.wins * 100 / releventOverallData.games).toFixed(2)) ? zero.toFixed(2) : (releventOverallData.wins * 100 / releventOverallData.games).toFixed(2));
  $('#overall .fPercentOverall').html(percent2);

  releventOverallData = getRank(overallData.no_flash, ranks);
  $('#overall .nGamesOverall').html(releventOverallData.games);
  $('#overall .nWinsOverall').html(releventOverallData.wins);
  $('#overall .nLossesOverall').html(releventOverallData.losses);
  var percent3 = parseFloat(isNaN((releventOverallData.wins * 100 / releventOverallData.games).toFixed(2)) ? zero.toFixed(2) : (releventOverallData.wins * 100 / releventOverallData.games).toFixed(2));
  $('#overall .nPercentOverall').html(percent3);

  if(percent == percent2 && percent2 == percent3){
    //all equal
    $('#overall .dPercentOverall').css("background-color", "#00B2EE");
    $('#overall .fPercentOverall').css("background-color", "#00B2EE");
    $('#overall .nPercentOverall').css("background-color", "#00B2EE");
  }
  else if(percent > percent2){
    //percent1 > percent2
    if(percent > percent3){
      //percent1 is the biggest
      $('#overall .dPercentOverall').css("background-color", "#00B2EE");
    }
    else{
      //percent3 is the biggest
      $('#overall .nPercentOverall').css("background-color", "#00B2EE");
    }
  }
  else{
    //percent2 > percent3
    if(percent2 > percent3){
      //percent2 is the biggest
      $('#overall .fPercentOverall').css("background-color", "#00B2EE");
    }
    else{
      //percent3 is the bigggest
      $('#overall .nPercentOverall').css("background-color", "#00B2EE");
    }
  }

  //top
  var releventTopData = getRank(topData.flash_on_d, ranks);
  var topWins = 0;
  var topLosses = 0;
  $('#top .dGamesOverall').html(releventTopData.games);
  $('#top .dWinsOverall').html(releventTopData.wins);
  $('#top .dLossesOverall').html(releventTopData.losses);
  percent = parseFloat(isNaN((releventTopData.wins * 100 / releventTopData.games).toFixed(2)) ? zero.toFixed(2) : (releventTopData.wins * 100 / releventTopData.games).toFixed(2));
  $('#top .dPercentOverall').html(percent);
  topWins += releventTopData.wins;
  topLosses += releventTopData.losses;

  releventTopData = getRank(topData.flash_on_f, ranks);
  $('#top .fGamesOverall').html(releventTopData.games);
  $('#top .fWinsOverall').html(releventTopData.wins);
  $('#top .fLossesOverall').html(releventTopData.losses);
  percent2 = parseFloat(isNaN((releventTopData.wins * 100 / releventTopData.games).toFixed(2)) ? zero.toFixed(2) : (releventTopData.wins * 100 / releventTopData.games).toFixed(2));
  $('#top .fPercentOverall').html(percent2);
  topWins += releventTopData.wins;
  topLosses += releventTopData.losses;

  releventTopData = getRank(topData.no_flash, ranks);
  $('#top .nGamesOverall').html(releventTopData.games);
  $('#top .nWinsOverall').html(releventTopData.wins);
  $('#top .nLossesOverall').html(releventTopData.losses);
  percent3 = parseFloat(isNaN((releventTopData.wins * 100 / releventTopData.games).toFixed(2)) ? zero.toFixed(2) : (releventTopData.wins * 100 / releventTopData.games).toFixed(2));
  $('#top .nPercentOverall').html(percent3);
  topWins += releventTopData.wins;
  topLosses += releventTopData.losses;

  if(percent == percent2 && percent2 == percent3){
    //all equal
    $('#top .dPercentOverall').css("background-color", "#00B2EE");
    $('#top .fPercentOverall').css("background-color", "#00B2EE");
    $('#top .nPercentOverall').css("background-color", "#00B2EE");
  }
  else if(percent > percent2){
    //percent1 > percent2
    if(percent > percent3){
      //percent1 is the biggest
      $('#top .dPercentOverall').css("background-color", "#00B2EE");
    }
    else{
      //percent3 is the biggest
      $('#top .nPercentOverall').css("background-color", "#00B2EE");
    }
  }
  else{
    //percent2 > percent3
    if(percent2 > percent3){
      //percent2 is the biggest
      $('#top .fPercentOverall').css("background-color", "#00B2EE");
    }
    else{
      //percent3 is the bigggest
      $('#top .nPercentOverall').css("background-color", "#00B2EE");
    }
  }

  //jungle
  var releventJungleData = getRank(jungleData.flash_on_d, ranks);
  var jungleWins = 0;
  var jungleLosses = 0;
  $('#jungle .dGamesOverall').html(releventJungleData.games);
  $('#jungle .dWinsOverall').html(releventJungleData.wins);
  $('#jungle .dLossesOverall').html(releventJungleData.losses);
  percent = parseFloat(isNaN((releventJungleData.wins * 100 / releventJungleData.games).toFixed(2)) ? zero.toFixed(2) : (releventJungleData.wins * 100 / releventJungleData.games).toFixed(2));
  $('#jungle .dPercentOverall').html(percent);
  jungleWins += releventJungleData.wins;
  jungleLosses += releventJungleData.losses;

  releventJungleData = getRank(jungleData.flash_on_f, ranks);
  $('#jungle .fGamesOverall').html(releventJungleData.games);
  $('#jungle .fWinsOverall').html(releventJungleData.wins);
  $('#jungle .fLossesOverall').html(releventJungleData.losses);
  percent2 = parseFloat(isNaN((releventJungleData.wins * 100 / releventJungleData.games).toFixed(2)) ? zero.toFixed(2) : (releventJungleData.wins * 100 / releventJungleData.games).toFixed(2));
  $('#jungle .fPercentOverall').html(percent2);
  jungleWins += releventJungleData.wins;
  jungleLosses += releventJungleData.losses;

  releventJungleData = getRank(jungleData.no_flash, ranks);
  $('#jungle .nGamesOverall').html(releventJungleData.games);
  $('#jungle .nWinsOverall').html(releventJungleData.wins);
  $('#jungle .nLossesOverall').html(releventJungleData.losses);
  percent3 = parseFloat(isNaN((releventJungleData.wins * 100 / releventJungleData.games).toFixed(2)) ? zero.toFixed(2) : (releventJungleData.wins * 100 / releventJungleData.games).toFixed(2));
  $('#jungle .nPercentOverall').html(percent3);
  jungleWins += releventJungleData.wins;
  jungleLosses += releventJungleData.losses;

  if(percent == percent2 && percent2 == percent3){
    //all equal
    $('#jungle .dPercentOverall').css("background-color", "#00B2EE");
    $('#jungle .fPercentOverall').css("background-color", "#00B2EE");
    $('#jungle .nPercentOverall').css("background-color", "#00B2EE");
  }
  else if(percent > percent2){
    //percent1 > percent2
    if(percent > percent3){
      //percent1 is the biggest
      $('#jungle .dPercentOverall').css("background-color", "#00B2EE");
    }
    else{
      //percent3 is the biggest
      $('#jungle .nPercentOverall').css("background-color", "#00B2EE");
    }
  }
  else{
    //percent2 > percent3
    if(percent2 > percent3){
      //percent2 is the biggest
      $('#jungle .fPercentOverall').css("background-color", "#00B2EE");
    }
    else{
      //percent3 is the bigggest
      $('#jungle .nPercentOverall').css("background-color", "#00B2EE");
    }
  }

  //middle
  var releventMidData = getRank(midData.flash_on_d, ranks);
  var midWins = 0;
  var midLosses = 0;

  // TOOD put this in methods
  $('#mid .dGamesOverall').html(releventMidData.games);
  $('#mid .dWinsOverall').html(releventMidData.wins);
  $('#mid .dLossesOverall').html(releventMidData.losses);
  percent = parseFloat(isNaN((releventMidData.wins * 100 / releventMidData.games).toFixed(2)) ? zero.toFixed(2) : (releventMidData.wins * 100 / releventMidData.games).toFixed(2));
  $('#mid .dPercentOverall').html(percent);
  midWins += releventMidData.wins;
  midLosses += releventMidData.losses;

  releventMidData = getRank(midData.flash_on_f, ranks);
  $('#mid .fGamesOverall').html(releventMidData.games);
  $('#mid .fWinsOverall').html(releventMidData.wins);
  $('#mid .fLossesOverall').html(releventMidData.losses);
  percent2 = parseFloat(isNaN((releventMidData.wins * 100 / releventMidData.games).toFixed(2)) ? zero.toFixed(2) : (releventMidData.wins * 100 / releventMidData.games).toFixed(2));
  $('#mid .fPercentOverall').html(percent2);
  midWins += releventMidData.wins;
  midLosses += releventMidData.losses;

  releventMidData = getRank(midData.no_flash, ranks);
  $('#mid .nGamesOverall').html(releventMidData.games);
  $('#mid .nWinsOverall').html(releventMidData.wins);
  $('#mid .nLossesOverall').html(releventMidData.losses);
  percent3 = parseFloat(isNaN((releventMidData.wins * 100 / releventMidData.games).toFixed(2)) ? zero.toFixed(2) : (releventMidData.wins * 100 / releventMidData.games).toFixed(2));
  $('#mid .nPercentOverall').html(percent3);
  midWins += releventMidData.wins;
  midLosses += releventMidData.losses;

  if(percent == percent2 && percent2 == percent3){
    //all equal
    $('#mid .dPercentOverall').css("background-color", "#00B2EE");
    $('#mid .fPercentOverall').css("background-color", "#00B2EE");
    $('#mid .nPercentOverall').css("background-color", "#00B2EE");
  }
  else if(percent > percent2){
    //percent1 > percent2
    if(percent > percent3){
      //percent1 is the biggest
      $('#mid .dPercentOverall').css("background-color", "#00B2EE");
    }
    else{
      //percent3 is the biggest
      $('#mid .nPercentOverall').css("background-color", "#00B2EE");
    }
  }
  else{
    //percent2 > percent3
    if(percent2 > percent3){
      //percent2 is the biggest
      $('#mid .fPercentOverall').css("background-color", "#00B2EE");
    }
    else{
      //percent3 is the bigggest
      $('#mid .nPercentOverall').css("background-color", "#00B2EE");
    }
  }

  //bot
  var releventBotData = getRank(botData.flash_on_d, ranks);
  var botWins = 0;
  var botLosses = 0;
  $('#bot .dGamesOverall').html(releventBotData.games);
  $('#bot .dWinsOverall').html(releventBotData.wins);
  $('#bot .dLossesOverall').html(releventBotData.losses);
  percent = parseFloat(isNaN((releventBotData.wins * 100 / releventBotData.games).toFixed(2)) ? zero.toFixed(2) : (releventBotData.wins * 100 / releventBotData.games).toFixed(2));
  $('#bot .dPercentOverall').html(percent);
  botWins += releventBotData.wins;
  botLosses += releventBotData.losses;

  releventBotData = getRank(botData.flash_on_f, ranks);
  $('#bot .fGamesOverall').html(releventBotData.games);
  $('#bot .fWinsOverall').html(releventBotData.wins);
  $('#bot .fLossesOverall').html(releventBotData.losses);
  percent2 = parseFloat(isNaN((releventBotData.wins * 100 / releventBotData.games).toFixed(2)) ? zero.toFixed(2) : (releventBotData.wins * 100 / releventBotData.games).toFixed(2));
  $('#bot .fPercentOverall').html(percent2);
  botWins += releventBotData.wins;
  botLosses += releventBotData.losses;

  releventBotData = getRank(botData.no_flash, ranks);
  $('#bot .nGamesOverall').html(releventBotData.games);
  $('#bot .nWinsOverall').html(releventBotData.wins);
  $('#bot .nLossesOverall').html(releventBotData.losses);
  percent3 = parseFloat(isNaN((releventBotData.wins * 100 / releventBotData.games).toFixed(2)) ? zero.toFixed(2) : (releventBotData.wins * 100 / releventBotData.games).toFixed(2));
  $('#bot .nPercentOverall').html(percent3);
  botWins += releventBotData.wins;
  botLosses += releventBotData.losses;

  if(percent == percent2 && percent2 == percent3){
    //all equal
    $('#bot .dPercentOverall').css("background-color", "#00B2EE");
    $('#bot .fPercentOverall').css("background-color", "#00B2EE");
    $('#bot .nPercentOverall').css("background-color", "#00B2EE");
  }
  else if(percent > percent2){
    //percent1 > percent2
    if(percent > percent3){
      //percent1 is the biggest
      $('#bot .dPercentOverall').css("background-color", "#00B2EE");
    }
    else{
      //percent3 is the biggest
      $('#bot .nPercentOverall').css("background-color", "#00B2EE");
    }
  }
  else{
    //percent2 > percent3
    if(percent2 > percent3){
      //percent2 is the biggest
      $('#bot .fPercentOverall').css("background-color", "#00B2EE");
    }
    else{
      //percent3 is the bigggest
      $('#bot .nPercentOverall').css("background-color", "#00B2EE");
    }
  }

  deleteDisposables();
  updateChart(topWins, jungleWins, midWins, botWins, true);
  updateChart(topLosses, jungleLosses, midLosses, botLosses, false);
}

function resetColors(){
  // console.log("reset colors");
  var dRow = document.getElementsByClassName("d");
  var fRow = document.getElementsByClassName("f");
  var nRow = document.getElementsByClassName("n");

  for(var i=0; i< dRow.length; i++){
    dRow[i].style.backgroundColor = "#fff";
    fRow[i].style.backgroundColor = "#f9f9f9";
    nRow[i].style.backgroundColor = "#fff";
  }
}

function deleteDisposables(){
  var elements = document.getElementsByClassName("disposable");
    while(elements.length > 0){
        elements[0].parentNode.removeChild(elements[0]);
    }
}

function updateChart(top, jungle, mid, bot, isWinChart) {

  if(isWinChart){
    if(top == 0 && jungle == 0 && mid == 0 && bot == 0){
      var noData = document.createElement("h4");
      noData.className = "disposable";
      noData.innerHTML = "No Data";
      document.getElementById("chart1Holder").appendChild(noData);
    }
    else{
      winChart.segments[0].value = top;
      winChart.segments[1].value = jungle;
      winChart.segments[2].value = mid;
      winChart.segments[3].value = bot;
      winChart.update();
      deleteDisposables();
    }
  }
  else{
    if(top == 0 && jungle == 0 && mid == 0 && bot == 0){
      var noData = document.createElement("h4");
      noData.className = "disposable";
      noData.innerHTML = "No Data";
      document.getElementById("chart2Holder").appendChild(noData);
    }
    else{
      lossChart.segments[0].value = top;
      lossChart.segments[1].value = jungle;
      lossChart.segments[2].value = mid;
      lossChart.segments[3].value = bot;
      lossChart.update();
      deleteDisposables();
    }
  }
}

function getRank(buckets, ranks){
  var obj = {games:0, wins:0, losses:0};
  for (var bucket in buckets) {
    bucket = buckets[bucket];
    if (ranks.indexOf(bucket.rank) != -1) {
      var test = true;
      obj.games += isNaN(bucket.wins) ? 0 : bucket.wins;
      obj.games += isNaN(bucket.losses) ? 0 : bucket.losses;
      obj.wins += isNaN(bucket.wins) ? 0 : bucket.wins;
      obj.losses += isNaN(bucket.losses) ? 0 : bucket.losses;
    }
  }
  return obj;
}

//get weather information from the openweathermap api and display it with a widget
function getWeather(latitude, longitude){
    // console.log('getting weather');
  var weather = {};
  $.ajax({
    url: 'http://api.openweathermap.org/data/2.5/weather?lat=' + latitude + '&lon=' + longitude,
    type : 'GET',
    dataType : 'json',
    data : {

    },
    success : function(resp) {
      weather = {
        //all weather is given in kelvin, conver to fahrenheit
        current: ((resp.main.temp - 273.15) * 1.8 + 32).toFixed(2),
        max: ((resp.main.temp_max - 273.15) * 1.8 + 32).toFixed(2),
        min: ((resp.main.temp_min - 273.15) * 1.8 + 32).toFixed(2),
        humidity: resp.main.humidity,
        //clouds in %
        clouds: resp.clouds.all,
        //wind in meters/second
        //multiply by 2.23 to make it miles/hr
        wind: resp.wind.speed * 2.23694,
        description: resp.weather[0].description,
        icon: "http://openweathermap.org/img/w/" + resp.weather[0].icon + ".png"
      };
      makeWeatherWidget(weather);
    },
      error : function(XMLHttpRequest, textStatus, errorThrown) {
        alert(XMLHttpRequest);
    }
  });
}

function toTitleCase(str){
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

function makeWeatherWidget(weather){
  var weatherArea = document.createElement('div');
  weatherArea.id = 'weatherArea';
  weatherArea.style.height = "240px";

  var header = document.createElement("h3");
  header.innerHTML = "Should You Play League With This Weather?";
  weatherArea.appendChild(header);


  var currentTemperature = document.createElement("span");
  currentTemperature.id = "currentTemp";
  currentTemperature.innerHTML = "Current Temperature: " + weather.current + "&degF";
  currentTemperature.style.height = "30px";
  currentTemperature.style.width = "290px";
  currentTemperature.style.fontSize = "18px";
  currentTemperature.style.paddingTop = "19px";
  currentTemperature.style.textAlign = "center";
  currentTemperature.style.display = "inline-block";
  currentTemperature.style.marginLeft = "35%";
  weatherArea.appendChild(currentTemperature);

  var weatherPic = document.createElement("img");
  weatherPic.src = weather.icon;
  weatherPic.style.width = "5%";
  weatherArea.appendChild(weatherPic);

  var highLow = document.createElement("div");
  highLow.innerHTML = "High: " + weather.max + "&degF  Low: " + weather.min + "&degF";
  highLow.style.height = "20px";
  highLow.style.width = "100%";
  highLow.style.float = "right";
  highLow.style.fontSize = "16px";
  highLow.style.paddingTop = "3px";
  highLow.style.paddingBottom = "3px";
  highLow.style.textAlign = "center";
  weatherArea.appendChild(highLow);

  var cloud = document.createElement("div");
  cloud.innerHTML = "Clouds: " + weather.clouds + "%";
  cloud.style.height = "20px";
  cloud.style.width = "100%";
  cloud.style.float = "right";
  cloud.style.fontSize = "16px";
  cloud.style.paddingTop = "3px";
  cloud.style.paddingBottom = "3px";
  cloud.style.textAlign = "center";
  weatherArea.appendChild(cloud);

  var humidity = document.createElement("div");
  humidity.innerHTML = "Humidity: " + weather.humidity + "%";
  humidity.style.height = "20px";
  humidity.style.width = "100%";
  humidity.style.float = "right";
  humidity.style.fontSize = "16px";
  humidity.style.paddingTop = "3px";
  humidity.style.paddingBottom = "3px";
  humidity.style.textAlign = "center";
  weatherArea.appendChild(humidity);

  var wind = document.createElement("div");
  wind.innerHTML = "Wind: " + weather.wind.toFixed(2) + "MPH";
  wind.style.height = "20px";
  wind.style.width = "100%";
  wind.style.float = "right";
  wind.style.fontSize = "16px";
  wind.style.paddingTop = "3px";
  wind.style.paddingBottom = "3px";
  wind.style.textAlign = "center";
  weatherArea.appendChild(wind);

  var description = document.createElement("div");
  description.innerHTML = toTitleCase(weather.description) + ".  <span id='greatDay'>Great Weather to Play League In</span>";
  description.style.height = "20px";
  description.style.width = "100%";
  description.style.float = "right";
  description.style.fontSize = "16px";
  description.style.paddingTop = "3px";
  description.style.paddingBottom = "3px";
  description.style.textAlign = "center";
  weatherArea.appendChild(description);

  var hint = document.createElement("div");
  hint.innerHTML = "Hint: It's always great weather to play league in.";
  hint.style.fontSize = "12px";
  hint.style.textAlign = "center";
  hint.style.height = "15px";
  hint.style.marginTop = "105px";
  weatherArea.appendChild(hint);

  document.getElementById("weatherWrapper").appendChild(weatherArea);
}

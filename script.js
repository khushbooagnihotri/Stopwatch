function showDateTime() {
  var myDiv = document.getElementById("myDiv");

  var date = new Date();
  var dayList = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  var fixed = date.getDate();
  fixed = 13;
  var dayName = dayList[date.getDay()];
  var monthName = monthNames[date.getMonth()];
  var today = ` ${dayName}, ${fixed} ${monthName}, ${date.getFullYear()}`;

  var hour = date.getHours();
  var min = date.getMinutes();
  var seconds = date.getSeconds();

  hour = 12; //as asked hours= 12; if you remove this you will get current hours;
  min = 0;

var time = hour + ":" + min + ":" + seconds + " IST";
myDiv.innerText = `  ${today} ${time}`;
}
setInterval(showDateTime, 1000);


$(function() {
  // Variables:
  var mode = 0; // App mode: 0 when watch has not been started
  var timeCounter = 0; // Time counter
  var lapCounter = 0; // Lap time counter
  var lapNumber = 0; // Number of Laps
  var loop; // Variable for setInterval
  var date; // Variable for current date and time

  // Hours, Minutes, Seconds, Milliseconds for time and lap time:
  var timeHours, timeMinutes, timeSeconds, timeCsec;
  var lapHours, lapMinutes, lapSeconds, lapCsec;
  // Disable split-Button:
  $("#split").prop("disabled", true);
  // When start-Button is clicked:
  $("#startStop").click(function() {
    if (mode === 0) {
      // Set app mode to 1 (on)
      mode = 1;
      // Change start-Button to stop-Button
      $("#startStop").html(
        '<span class="glyphicon glyphicon-stop" aria-hidden="true"></span><span class="sr-only">Stop</span>'
      );
      $("#startStop").css("background-color", "rgb(0, 153, 204)");
      $("#startStop").hover(
        function() {
          $(this).css("background-color", "rgba(0, 115, 153, 1)");
        },
        function() {
          $(this).css("background-color", "rgb(0, 153, 204)");
        }
      );
      // Change split-Button to enabled
      $("#split").css("background-color", "rgba(186, 74, 94, 1)");
      $("#split").hover(
        function() {
          $(this).css("background-color", "rgba(152, 58, 75, 1)");
        },
        function() {
          $(this).css("background-color", "rgba(186, 74, 94, 1)");
        }
      );
      $("#split").prop("disabled", false);
      // Change reset-Button to disabled
      $("#reset").css({
        "background-color": "rgba(51, 51, 51, 0.3)",
        color: "#fff"
      });
      $("#reset").prop("disabled", true);
      // start time and lap counters
      startCounters();
    } else {
      // Set app mode to 0 (off)
      mode = 0;
      // Change stop-Button to start-Button
      $("#startStop").html(
        '<span class="glyphicon glyphicon-play" aria-hidden="true"></span><span class="sr-only">Start</span>'
      );
      $("#startStop").css("background-color", "rgb(0, 204, 153)");
      $("#startStop").hover(
        function() {
          $(this).css("background-color", "rgba(0, 153, 115, 1)");
        },
        function() {
          $(this).css("background-color", "rgb(0, 204, 153)");
        }
      );
      // Change split-Button to disabled
      $("#split").css("background-color", "rgba(186, 74, 94, 0.3)");
      $("#split").prop("disabled", true);
      // Change reset-Button to enabled
      $("#reset").css({
        "background-color": "rgba(189, 188, 186, 1)",
        color: "rgba(51, 51, 51, 1)"
      });
      $("#reset").hover(
        function() {
          $(this).css({
            "background-color": "rgba(51, 51, 51, 1)",
            color: "#fff"
          });
        },
        function() {
          $(this).css({
            "background-color": "rgba(189, 188, 186, 1)",
            color: "rgba(51, 51, 51, 1)"
          });
        }
      );
      $("#reset").prop("disabled", false);
      // Stop counters
      clearInterval(loop);
    }
  });

  // When reset-Button is clicked:
  $("#reset").click(function() {
    // empty table and hide it:
    $("#laptimes").empty();
    $(".table").css("display", "none");
    // reset timers:
    timeCounter = 0;
    lapCounter = 0;
    lapNumber = 0;
    updateTime();
  });

  // When split-Button is clicked:
  $("#split").click(function() {
    // if mode = 1 (on)
    if ((mode = 1)) {
      // stop loop
      clearInterval(loop);
      // reset lapCounter
      lapCounter = 0;
      // Get current time and date:
      // Create a date object with new Date() constructor and assign it as value to 'date'
      date = new Date();
      // Display table for lap details:
      $(".table").css("display", "table");
      // print lap details:
      addLapDetails(date);
      // restart counters:
      startCounters();
    }
  });

  // Functions:
  // starts time and lap counters and updates time on webpage
  function startCounters() {
    loop = setInterval(function() {
      timeCounter++;
      lapCounter++;
      updateTime();
    }, 10);
  }
  // converts counters to hours, minutes, seconds and milliseconds
  // and updates the times on the webpage
  function updateTime() {
    // Conversion ms -> h:min:s:ms
    // -> /Playground/time-format-converter.js
    // Here: conversion to Centiseconds
    // as 1 ms resolution might result in accuracy issues
    timeCsec = timeCounter % 100;
    timeHours = Math.floor(timeCounter / 100 / 3600);
    timeMinutes = Math.floor(((timeCounter / 100) % 3600) / 60);
    timeSeconds = Math.floor(((timeCounter / 100) % 3600) % 60);

    // Update times on webpage:
    $("#timeHour").text(format(timeHours));
    $("#timeMinute").text(format(timeMinutes));
    $("#timeSec").text(format(timeSeconds));
    $("#timeCsec").text(format(timeCsec));

    // Same applies to laptimes:
    lapCsec = lapCounter % 100;
    lapHours = Math.floor(lapCounter / 100 / 3600);
    lapMinutes = Math.floor(((lapCounter / 100) % 3600) / 60);
    lapSeconds = Math.floor(((lapCounter / 100) % 3600) % 60);

    // Update lap times on webpage:
    $("#lapHour").text(format(lapHours));
    $("#lapMinute").text(format(lapMinutes));
    $("#lapSec").text(format(lapSeconds));
    $("#lapCsec").text(format(lapCsec));
  }

  // Format numbers to 2 digits:
  function format(number) {
    if (number < 10) {
      return "0" + number;
    } else {
      return number;
    }
  }

  // Prints lap details into laptime div:
  function addLapDetails(clock) {
    lapNumber++;
    // Lap#, Interval, Total
    var interval =
      "<span>" +
      format(lapHours) +
      "</span>" +
      ":<span>" +
      format(lapMinutes) +
      "</span>" +
      ":<span>" +
      format(lapSeconds) +
      "</span>" +
      ":<span>" +
      format(lapCsec) +
      "</span>";
    var total =
      "<span>" +
      format(timeHours) +
      "</span>" +
      ":<span>" +
      format(timeMinutes) +
      "</span>" +
      ":<span>" +
      format(timeSeconds) +
      "</span>" +
      ":<span>" +
      format(timeCsec) +
      "</span>";


    // Create table rows from variables:
    var lapTimeDetails =
      "<tr> <td># " +
      lapNumber +
      "</td>" +
      "<td>" +
      interval +
      "</td>" +
      "<td>" +
      total +
      "</td>" +
      "<td>"
    // Print lap details to the beginning of the list:
    $(lapTimeDetails).appendTo("#laptimes");
  }
});

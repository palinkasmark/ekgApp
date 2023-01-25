import { Component, OnInit } from '@angular/core';

@Component({
  selector: "app-ekg-teszt",
  templateUrl: "./ekg-teszt.page.html",
  styleUrls: ["./ekg-teszt.page.scss"],
})
export class EkgTesztPage implements OnInit {
  options: any;
  updateOptions: any;

  mergedTime: any;
  mergedBpm: any;
  mergedValue: any;
  mTime: any;
  mValue: any;
  testTime: any;
  count = 0;

  private oneDay = 24 * 3600 * 1000;
  private now: Date;
  private value: number;
  private data: any[];
  private timer: any;

  prevTime = 0;
  stopwatchInterval = 0;
  elapsedTime = 0;
  time: any;

  constructor() {}

  ngOnInit(): void {
    this.processData();
    this.startTimer();
  

    // generate some random testing data:
    this.data = [];
    // this.now = new Date(1997, 9, 3);
    // this.now = new Date(1997, 9, 3);
    // this.value = Math.random() * 1000;

    this.now = new Date(2021, 3, 10, 16, 20, 30, 45);
    this.testTime = this.now.getMilliseconds();
    for (let i = 0; i < 1000; i++) {
      this.data.push(this.randomData());
    }

    // initialize chart options:
    this.options = {
      title: {
        text: "Dynamic Data + Time Axis",
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          animation: false,
        },
      },
      xAxis: {
        type: "time",
        minorTick: {
          show: true,
          splitNumber: 5,
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: "red", //"#999"
            width: 1.2,
          },
        },
        minorSplitLine: {
          show: true,
          lineStyle: {
            color: "red", //"rgba(0, 255, 38, 1)"
            width: 0.5,
          },
        },
      },
      yAxis: {
        type: "value",
        boundaryGap: [0, "100%"],
        minorTick: {
          show: true,
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: "red", //"#999"
            width: 1.2,
          },
        },
        minorSplitLine: {
          show: true,
          lineStyle: {
            color: "red", //"#ddd"
            width: 0.5,
          },
        },
      },
      series: [
        {
          name: "Mocking Data",
          type: "line",
          showSymbol: false,
          hoverAnimation: false,
          data: this.data,
        },
      ],
    };

    
  }

  ngOnDestroy() {
    clearInterval(this.timer);
  }

  

  randomData() {
    // this.now = new Date(this.now.getTime() + this.oneDay);
    // this.value = this.value + Math.random() * 21 - 10;

    this.mTime = this.time;
    this.mValue = this.mergedValue[this.count];
    this.count++;

    console.log(new Date(this.time));

    return {
      name: this.mTime,
      value: [this.mTime, this.mValue],
    };
    // return {
    //   name: this.now.toString(),
    //   value: [
    //     [this.now.getFullYear(), this.now.getMonth() + 1, this.now.getDate()].join('/'),
    //     Math.round(this.value)
    //   ]
    // };
  }

  processData() {
    var url =
      "https://docs.google.com/spreadsheets/d/e/2PACX-1vR73gKau6D4RBTZyiZieAQJUyyX56EeBxxe-giCnqpO1-zLsXjAtPZMJC2CAHwcjdEb4P3tde5UVW0r/pub?gid=1751011686&single=true&output=csv";
    /*   var url = "https://docs.google.com/spreadsheets/d/e/2PACX-1vR9Q8nJ-C0AA1vFqpk8NChzwS7eLXRaEOoafOY6kHmq1bFyQoQnKSryDs_YpOeiSKPZiY3KFndAOnV1/pub?gid=0&single=true&output=csv"; */

    var request = new XMLHttpRequest();
    request.open("GET", url, false);
    request.send(null);

    var csvData = new Array();
    var jsonObject = request.responseText.split(/\r?\n|\r/);
    for (var i = 0; i < jsonObject.length; i++) {
      csvData.push(jsonObject[i].split(","));
    }

    var time = [];
    var value = [];
    var bpm = [];
    var dataValue = [];
    var dataTime = [];
    var dataBpm = [];
    for (var i = 0; i < csvData.length; i++) {
      time[i] = csvData[i].slice(0, 1);
      value[i] = csvData[i].slice(1, 2);
      bpm[i] = csvData[i].slice(2);
    }

    for (var i = 2; i <= value.length - 1; i++) {
      dataValue.push(value[i]);
    }
    for (var i = 2; i <= time.length - 1; i++) {
      dataTime.push(time[i]);
    }
    for (var i = 2; i <= bpm.length - 1; i++) {
      dataBpm.push(bpm[i]);
    }

    this.mergedValue = [].concat.apply([], dataValue);
    this.mergedTime = [].concat.apply([], dataTime);
    this.mergedBpm = [].concat.apply([], dataBpm);

    let tempArray = [];
    for (var i = 0; i < this.mergedTime.length; i++) {
      tempArray[i] = this.mergedTime[i].substr(
        2,
        this.mergedTime[i].length - 3
      );
      this.mergedTime[i] = tempArray[i];
    }
  }

  updateTime() {
    var tempTime = this.elapsedTime;
    var milliseconds = tempTime % 1000;
    tempTime = Math.floor(tempTime / 1000);
    var seconds = tempTime % 60;
    tempTime = Math.floor(tempTime / 60);
    var minutes = tempTime % 60;
    tempTime = Math.floor(tempTime / 60);
    var hours = tempTime % 60;

    this.time = hours + " : " + minutes + " : " + seconds + "." + milliseconds;
    console.log(this.time);
    return this.time;
  }

  startTimer() {
    let stopwatchInterval = setInterval(() => {
      if (!this.prevTime) {
        this.prevTime = Date.now();
      }

      this.elapsedTime += Date.now() - this.prevTime;
      this.prevTime = Date.now();

      this.updateTime();
    }, 500);
  }
}
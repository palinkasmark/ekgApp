import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as Highcharts from 'highcharts';
import HStockTools from 'highcharts/modules/stock-tools';
// import HFullScreen from 'highcharts/modules/full-screen';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from './auth.service';
import { interval } from 'rxjs';
HStockTools(Highcharts);
// HFullScreen(Highcharts);

@Injectable({
  providedIn: "root",
})
export class EkgService {
  mergedTime: any;
  mergedBpm: any;
  mergedValue: any;
  length = 1000;
  count = 0;
  time = 0;
  value = 0;
  bpm: any;
  timeArray: any[] = [];
  chart: any;
  ecgArray: any[] = [];
  url: any;
  opcio: any;
  maxMinArray: number[] = [];
  max: number;
  min: number;
  selectPoints: any[] = [];
  isChart: boolean;
  ecg: any;
  kesz: boolean;
  isPaused: boolean = false;
  currentPatient: any;
  allRecord: any[] = [];
  recordDatas: any[] = [];
  pointReady: any[] = [];
  loadChartReady: boolean;
  selectPointReady: boolean;

  

  constructor(
    private authService: AuthService,
    private db: AngularFirestore,
    private route: ActivatedRoute
  ) {}

  setChartOptions() {
    let options: Highcharts.Options = {
      stockTools: {
        gui: {
          buttons: ["zoomChange", "measure"],
        },
      },
      plotOptions: {
        series: {
          dataGrouping: {
            enabled: false,
          },
        },
      },
      title: {
        text: "",
      },
      legend: {
        enabled: false,
      },
      yAxis: {
        title: null,
        min: -0.8,
        max: 0.8,
        tickInterval: 0.5,
        minorGridLineColor: "red",
        minorTicks: true,
        gridLineColor: "red",
      },
      xAxis: {
        minorGridLineColor: "red",
        minorTicks: true,
        tickInterval: 100,
      },
      rangeSelector: {
        buttons: [
          {
            count: 500,
            type: "millisecond",
            text: "500",
          },
          {
            type: "all",
            text: "All",
          },
        ],
        inputEnabled: false,
        selected: 0,
      },
      series: [
        {
          point: {
            events: {
              click: (function (component) {
                return function () {
                  let point = this;
                  let index = point.index;
                  let x = point.x;
                  let y = point.y;
                  if (point.marker && point.marker.enabled) {
                  } else {
                    if (component.opcio == "p") {
                      component.selectPoints.push([
                        index,
                        x,
                        y,
                        component.opcio,
                      ]);
                      point.update({
                        marker: {
                          enabled: true,
                          radius: 5,
                        },
                        color: "red",
                      });
                    } else if (component.opcio == "t") {
                      component.selectPoints.push([
                        index,
                        x,
                        y,
                        component.opcio,
                      ]);
                      point.update({
                        marker: {
                          enabled: true,
                          radius: 5,
                        },
                        color: "green",
                      });
                    } else if (component.opcio == "qrs") {
                      component.selectPoints.push([
                        index,
                        x,
                        y,
                        component.opcio,
                      ]);
                      point.update({
                        marker: {
                          enabled: true,
                          radius: 5,
                        },
                        color: "darkblue",
                      });
                    } else if (component.opcio == "st") {
                      component.selectPoints.push([
                        index,
                        x,
                        y,
                        component.opcio,
                      ]);
                      point.update({
                        marker: {
                          enabled: true,
                          radius: 5,
                        },
                        color: "orange",
                      });
                    } else if (component.opcio == "u") {
                      component.selectPoints.push([
                        index,
                        x,
                        y,
                        component.opcio,
                      ]);
                      point.update({
                        marker: {
                          enabled: true,
                          radius: 5,
                        },
                        color: "cyan",
                      });
                    } else {
                      component.selectPoints.push([index, x, y]);
                      point.update({
                        marker: {
                          enabled: true,
                          radius: 5,
                        },
                        color: "yellow",
                      });
                    }
                  }
                };
              })(this),
            },
          },
          pointInterval: 1,
          turboThreshold: 100000,
          type: "line",
          id: "dataseries",
          lineWidth: 3,
          data: (function (component) {
            var data = [],
              i;
            var bpmDom = document.getElementById("bpm");
            for (i = 0; i < component.length; i += 1) {
              let getData = component.addMoreData();
              let bpmValue = getData[2].toString();
              bpmDom.innerHTML = bpmValue.slice(0, 2);
              // console.log(i, ': ', bpmValue.slice(0,2));
              data.push([getData[0], getData[1]]);
            }
            return data;
          })(this),
        },
        { type: "flags" },
      ],
      chart: {
        zoomBySingleTouch: true,
        // zoomType: "x",
        events: {
          load: (function (component) {
            return function () {
              var series = this.series[0];
              var interval = setInterval(() => {
                if (component.kesz == true) {
                  clearInterval(interval);
                } else if (component.isPaused == false) {
                  var bpmDom = document.getElementById("bpm");
                  const newData = component.addMoreData();
                  if (newData[0] != undefined) {
                    const time = newData[0]; // get new time
                    const value = newData[1]; // get new value
                    const bpm = newData[2].toString(); //get new bpm
                    bpmDom.innerHTML = bpm.slice(0, 2);
                    var x = time,
                      y = value;
                    series.addPoint([x, y], true, true, false); //false
                  } else {
                    clearInterval(interval);
                  }
                }
              }, 0.1);
            };
          })(this),
        },
      },
    };

    return options;
  }

  setFullChart() {
    this.kesz = true;
    // console.log('FullChart')
    this.count = 0;
    let options: Highcharts.Options = {
      plotOptions: {
        series: {
          dataGrouping: {
            enabled: false,
          },
        },
      },
      title: {
        text: "",
      },
      legend: {
        enabled: false,
      },
      yAxis: {
        title: null,
        min: -0.8,
        max: 0.8,
        tickInterval: 0.5,
        minorGridLineColor: "red",
        minorTicks: true,
        gridLineColor: "red",
      },
      xAxis: {
        minorGridLineColor: "red",
        minorTicks: true,
        tickInterval: 100,
      },
      rangeSelector: {
        buttons: [
          {
            count: 500,
            type: "millisecond",
            text: "500",
          },
          {
            count: 1000,
            type: "millisecond",
            text: "1000",
          },
          {
            count: 1500,
            type: "millisecond",
            text: "1500",
          },
          {
            count: 2000,
            type: "millisecond",
            text: "2000",
          },
          {
            type: "all",
            text: "All",
          },
        ],
        inputEnabled: false,
        selected: 1,
      },
      series: [
        {
          point: {
            events: {
              click: (function (component) {
                return function () {
                  let point = this;
                  let index = point.index;
                  let x = point.x;
                  let y = point.y;
                  if (point.marker && point.marker.enabled) {
                  } else {
                    if (component.opcio == "p") {
                      component.selectPoints.push([
                        index,
                        x,
                        y,
                        component.opcio,
                      ]);
                      point.update({
                        marker: {
                          enabled: true,
                          radius: 5,
                        },
                        color: "red",
                      });
                    } else if (component.opcio == "t") {
                      component.selectPoints.push([
                        index,
                        x,
                        y,
                        component.opcio,
                      ]);
                      point.update({
                        marker: {
                          enabled: true,
                          radius: 5,
                        },
                        color: "green",
                      });
                    } else if (component.opcio == "qrs") {
                      component.selectPoints.push([
                        index,
                        x,
                        y,
                        component.opcio,
                      ]);
                      point.update({
                        marker: {
                          enabled: true,
                          radius: 5,
                        },
                        color: "darkblue",
                      });
                    } else if (component.opcio == "st") {
                      component.selectPoints.push([
                        index,
                        x,
                        y,
                        component.opcio,
                      ]);
                      point.update({
                        marker: {
                          enabled: true,
                          radius: 5,
                        },
                        color: "orange",
                      });
                    } else if (component.opcio == "u") {
                      component.selectPoints.push([
                        index,
                        x,
                        y,
                        component.opcio,
                      ]);
                      point.update({
                        marker: {
                          enabled: true,
                          radius: 5,
                        },
                        color: "cyan",
                      });
                    } else {
                      component.selectPoints.push([index, x, y]);
                      point.update({
                        marker: {
                          enabled: true,
                          radius: 5,
                        },
                        color: "yellow",
                      });
                    }
                  }
                };
              })(this),
            },
          },
          pointInterval: 1,
          turboThreshold: 100000,
          type: "line",
          id: "dataseries",
          lineWidth: 3,
          data: (function (component) {
            var data = [],
              i;
            for (i = 0; i < component.mergedValue.length; i += 1) {
              let getData = component.addMoreData();
              data.push([getData[0], getData[1]]);
            }
            return data;
          })(this),
        },
        {
          type: "flags",
          data: (function (component) {
            var data = [],
              i;
            console.log("Select point: ", component.selectPoints);
            for (i = 0; i < component.selectPoints.length; i += 1) {
              let getX = component.selectPoints[i][1];
              let getOpcio = component.selectPoints[i][3];
              data.push({
                x: getX,
                title: getOpcio,
              });
            }
            return data;
          })(this),
          onSeries: "dataseries",
          shape: "circlepin",
          width: 40,
        },
      ],
      chart: {
        zoomBySingleTouch: true,
        // zoomType: "x",
      },
    };
    return options;
  }

  loadChart(setPoint: any) {
    // console.log('LoadChart')
    this.count = 0;
    let options: Highcharts.Options = {
      stockTools: {
        gui: {
          buttons: ["zoomChange", "measure"],
        },
      },
      plotOptions: {
        series: {
          dataGrouping: {
            enabled: false,
          },
        },
      },
      title: {
        text: "",
      },
      legend: {
        enabled: false,
      },
      yAxis: {
        title: null,
        min: -0.8,
        max: 0.8,
        tickInterval: 0.5,
        minorGridLineColor: "red",
        minorTicks: true,
      },
      xAxis: {
        minorGridLineColor: "red",
        minorTicks: true,
        tickInterval: 100,
      },
      rangeSelector: {
        buttons: [
          {
            count: 500,
            type: "millisecond",
            text: "500",
          },
          {
            count: 1000,
            type: "millisecond",
            text: "1000",
          },
          {
            count: 1500,
            type: "millisecond",
            text: "1500",
          },
          {
            count: 2000,
            type: "millisecond",
            text: "2000",
          },
          {
            type: "all",
            text: "All",
          },
        ],
        inputEnabled: false,
        selected: 1,
      },
      tooltip: {
        followTouchMove: true,
      },
      series: [
        {
          pointInterval: 1,
          turboThreshold: 100000,
          type: "line",
          id: "dataseries",
          lineWidth: 3,
          data: (function (component) {
            var data = [],
              i;
            for (i = 0; i < component.mergedValue.length; i += 1) {
              let getData = component.addMoreData();
              data.push([getData[0], getData[1]]);
            }
            return data;
          })(this),
        },
        {
          type: "flags",
          data: (function (component) {
            var data = [],
              i;
            console.log("Select point: ", setPoint);
            for (i = 0; i < setPoint.length; i += 1) {
              let getX = setPoint[i][1];
              let getOpcio = setPoint[i][3];
              data.push({
                x: getX,
                title: getOpcio,
              });
            }
            return data;
          })(this),
          onSeries: "dataseries",
          shape: "circlepin",
          width: 40,
        },
      ],
      chart: {
        // zoomBySingleTouch: true,
        // zoomType: "x",
      },
    };
    
    this.loadChartReady = true;
    return options;
  }

  getAllRecord() {
    this.allRecord = [];
    this.db
      .collection("users")
      .doc(`${this.authService.currentPatient.doctorId}`)
      .collection("patients")
      .doc(`${this.authService.currentPatient.uid}`)
      .get()
      .subscribe((element) => {
        this.allRecord.push(element.get("records"));
      });
    return this.allRecord;
  }

  records() {
    if (this.toroldmajki == 0) {
      let recArray: any;
      this.recordDatas = [];
      recArray = this.getAllRecord();
      const sub = interval(1000).subscribe(() => {
        if (recArray.length != 0) {
          for (let record of recArray[0]) {
            this.recordDatas.push({
              date: record.date,
              url: record.url,
              index: record.index,
              o: record.o,
              x: record.x,
              y: record.y,
            });
          }
          this.toroldmajki += 1;
          sub.unsubscribe();
        }
      });
    }
    return this.recordDatas;
  }

  loadRecord(url: string) {
    setTimeout(() => {
      for (let i = 0; i < this.recordDatas.length; i++) {
        if (this.recordDatas[i].url == url) {
      console.log('RecordDatas: ', this.recordDatas);
          this.selectPoints.push([
            this.recordDatas[i].index,
            this.recordDatas[i].x,
            this.recordDatas[i].y,
            this.recordDatas[i].o,
            this.recordDatas[i].url,
          ]);
        }
      }
      console.log('Select points: ', this.selectPoints);
      let array: any[] = [];
      let length: any;
      this.selectPoints.forEach((element) => {
        length = element[0].split(",");
        array.push(
          element[0].split(","),
          element[1].split(","),
          element[2].split(","),
          element[3].split(",")
        );
      });
      console.log('Array: ', array);
      let stop = length.length;
      let j = 0;
      this.pointReady = [];
      const s = interval(1000).subscribe((n) => {
        let array2: any[] = [];
        for (let i = 0; i < 4; i++) { array2.push([array[i][j]]); }
        this.pointReady[j] = [].concat.apply([], array2);
        j++;
      console.log('Array2: ', array2);
        if (n + 1 == stop) {
      console.log('Point Ready: ', this.pointReady);
          this.selectPointReady = true;
          s.unsubscribe();
        }
      });
    }, 1000);
  }

  paused() {
    this.isPaused = true;
    return this.isPaused;
  }
  play() {
    this.isPaused = false;
    return this.isPaused;
  }

  getEcg() {
    let randomEcg = Math.floor(Math.random() * this.ecgArray.length);
    this.ecg = this.ecgArray[randomEcg];
    this.db.collection("ecg").doc(`${this.ecg}`).get().subscribe((res) => {
        this.url = res.get("url");
      });
    return this.url;
  }
  getAllEcgData() {
    this.db.collection("ecg").get().subscribe((res) => {
      res.docs.forEach((element) => {
          this.ecgArray.push(element.id);
        });
      });
  }

  addMoreData() {
    this.time = this.mergedTime[this.count];
    this.value = this.mergedValue[this.count];
    this.bpm = this.mergedBpm[this.count];

    this.time = this.time;
    this.value = Number(this.value);

    this.timeArray.shift();
    this.timeArray.push(this.mergedTime[this.count]);

    this.count++;

    return [this.time, this.value, this.bpm];
  }

  processData(url: string) {
    var value = [];
    var time = [];
    var bpm = [];
    var csvData = new Array();
    var request = new XMLHttpRequest();
    request.open("GET", url, false);
    request.send(null);
    var jsonObject = request.responseText.split(/\r?\n|\r/);
    for (var i = 0; i < jsonObject.length; i++) {
      csvData.push(jsonObject[i].split(","));
    }
    for (var i = 1; i < csvData.length; i++) {
      time.push(csvData[i].slice(0, 1));
      value.push(csvData[i].slice(1, 2));
      bpm.push(csvData[i].slice(2));
    }
    this.mergedValue = [].concat.apply([], value);
    this.mergedTime = [].concat.apply([], time);
    this.mergedBpm = [].concat.apply([], bpm);

    for (let i = 0; i < this.mergedValue.length; i++) {
      this.maxMinArray[i] = Number(this.mergedValue[i]);
    }
    this.max = Math.max.apply(null, this.maxMinArray);
    this.min = Math.min.apply(null, this.maxMinArray);
    this.max = Math.round(this.max);
    this.min = Math.round(this.min);
    // console.log('Max: ', this.max, ' Min: ', this.min);

    let tempArray = [];
    for (var i = 0; i < this.mergedTime.length; i++) {
      tempArray[i] = this.mergedTime[i].substr(
        0,
        this.mergedTime[i].length - 1
      );
      this.mergedTime[i] = tempArray[i];
    }
    // console.log('Meregd time: ', this.mergedTime);

    for (let i = 0; i < 2000; i++) {
      this.timeArray[i] = this.mergedTime[i];
    }
  }

  p() {
    this.opcio = "p";
    return this.opcio;
  }
  t() {
    this.opcio = "t";
    return this.opcio;
  }
  qrs() {
    this.opcio = "qrs";
    return this.opcio;
  }
  st() {
    this.opcio = "st";
    return this.opcio;
  }
  u() {
    this.opcio = "u";
    return this.opcio;
  }
}

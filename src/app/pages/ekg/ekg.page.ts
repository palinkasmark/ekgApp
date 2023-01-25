import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { EChartsOption } from 'echarts/types/dist/echarts';
import { NgxEchartsDirective } from 'ngx-echarts';



@Component({
  selector: "app-ekg",
  templateUrl: "./ekg.page.html",
  styleUrls: ["./ekg.page.scss"],
})
export class EkgPage implements OnInit {
  data: any[] = [];
  chartOption: EChartsOption;
  updateOptions: EChartsOption;
  url: string;
  mergedTime: any;
  mergedBpm: any;
  mergedValue: any;
  length = 2000;
  count = 0;

  testNow = 0;
  testValue = 0;


  timeArray: any[]= [];

  tesztIdo: any;
  tesztErtek: any;

  constructor() {}

  ngOnInit() {
    this.processData();
    for (var i = 0; i < this.length; i++) {
       this.data.push(this.addMoreData());
    }
    this.setChartOption();
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
      tempArray[i] = this.mergedTime[i].substr(2, this.mergedTime[i].length - 3);
      this.mergedTime[i] = tempArray[i];
    }
  
    for(let i = 0; i < 2000; i++) {
      this.timeArray[i] = this.mergedTime[i];
    }

  }



  setChartOption() {
    this.chartOption = {
      tooltip: {
        show: true,
        triggerOn: "mousemove",
      },
      grid: {
            top: 40,
            left: 50,
            right: 40,
            bottom: 50,
          },
      xAxis: {
        type: "category",
        boundaryGap: true,
        data: this.timeArray,
        minorTick: {
          show: true,
          splitNumber: 5,
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: "red", //"#999"
            width: 2,
          },
        },
        minorSplitLine: {
          show: true,
          lineStyle: {
            color: "green", //"rgba(0, 255, 38, 1)"
            width: 0.5,
          },
        },
      },
      yAxis: {
        type: "value",
        boundaryGap: [0, "100%"],
        min: -0.6,
        max: 0.6,
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
            color: "green", //"#ddd"
            width: 0.5,
          },
        },
      },
        dataZoom: [
        {
          show: true,
          type: "inside",
          filterMode: "none",
          xAxisIndex: [0],
          startValue: -20,
          endValue: 20,
        },
        {
          show: true,
          type: "inside",
          filterMode: "none",
          yAxisIndex: [0],
          startValue: -20,
          endValue: 20,
        },
      ],
      series: [{
        data: this.data,
        type: "line"
      }]
    };
  }

  addMoreData() {
    this.testNow = this.mergedTime[this.count];
    this.testValue = this.mergedValue[this.count];
    this.timeArray.shift();
    this.timeArray.push(this.mergedTime[this.count]);


    this.count++;
    return {
     time: this.testNow,
     value: this.testValue
  }

  }

  chartClicked(e?: any): void {
    const pointValue = e.data.value;
    const pointTime = e.data.time;
    const pointIndex = e.dataIndex;
    console.log(pointIndex, ' - ',  pointTime, ' - ', pointValue);
    this.tesztErtek = pointValue;
    this.tesztIdo = pointTime

    console.log(e);

    this.updateOptions = {
      series: {
        markPoint: {
          data: [{
            name: 'coordinate',
            coord: [this.tesztIdo, this.tesztErtek],

            label: {
              show: true
            },
          }],
          symbol: "pin",
          label: {
            show: true
          }
        }
      }
    }
      
 }
 
}




//  /*  <script> */
//   console.log('Haho')
//  var url = "https://docs.google.com/spreadsheets/d/e/2PACX-1vR73gKau6D4RBTZyiZieAQJUyyX56EeBxxe-giCnqpO1-zLsXjAtPZMJC2CAHwcjdEb4P3tde5UVW0r/pub?gid=1751011686&single=true&output=csv";

// /*   var url = "https://docs.google.com/spreadsheets/d/e/2PACX-1vR9Q8nJ-C0AA1vFqpk8NChzwS7eLXRaEOoafOY6kHmq1bFyQoQnKSryDs_YpOeiSKPZiY3KFndAOnV1/pub?gid=0&single=true&output=csv"; */

//  var request = new XMLHttpRequest();
//  request.open("GET", url, false);
//  request.send(null);

//  var csvData = new Array();
//  var jsonObject = request.responseText.split(/\r?\n|\r/);
//  for (var i = 0; i < jsonObject.length; i++) {
//    csvData.push(jsonObject[i].split(','));
//  }
//  //console.log(csvData)
//   var time = [];
//   var value = [];
//   var bpm = [];
//  var dataValue = [];
//  var dataTime = [];
//  var dataBpm = [];
//   var length = 2000;
//  for (var i = 0; i < csvData.length; i++) {
//    time[i] = csvData[i].slice(0, 1);
//    value[i] = csvData[i].slice(1, 2);
//    bpm[i] = csvData[i].slice(2);
//  }
//  //console.log(time, value, bpm)

//  for (var i = 2; i <= value.length - 1; i++) {
//    dataValue.push(value[i]);
//  }
//  for (var i = 2; i <= time.length - 1; i++) {
//    dataTime.push(time[i]);
//  }
//  for (var i = 2; i <= bpm.length - 1; i++) {
//    dataBpm.push(bpm[i]);
//  }
//  // console.log(dataTime);
//  var mergedValue = [].concat.apply([], dataValue);
//  var mergedTime = [].concat.apply([], dataTime);
//  var mergedBpm = [].concat.apply([], dataBpm);
// // console.log(mergedValue, mergedTime, mergedBpm)
// //console.log(Math.min.apply(Math, mergedValue))
//  var maxValue = Math.max.apply(Math, mergedValue);
//  var minValue = Math.min.apply(Math, mergedValue);

//  var chartDom = document.getElementById('main');
//  var bpmDom = document.getElementById('bpm');

//  var myChart = echarts.init(chartDom);
//  var option;

//  var count = 0;
//  var now = 0;
//  var value = 0;
//  var bpm_value = 0;
//  var data = [];
//  function addData() {
//    now = mergedTime[count];
//    value = mergedValue[count];
//    //bpm_value = mergedBpm[count];
//    count++;
//    return {
//      name: now,
//      value: value
//      //bpm_value: bpm_value
//    };
//  }

//  for (var i = 0; i < length; i++) {
//    data.push(addData());
//  }


//  option = {
//    // title: {
//    //   text: 'ECG'
//    // },
//    tooltip: {
//      trigger: 'axis',
//      axisPointer: {
//        animation: false
//      }
//    },
//    xAxis: {
//      type: 'category',
//      boundaryGap: true,
//    //   data: (
//    //     function () {
//    //       var res = [];
//    //       for (var i = 0; i < length; i++) {
//    //         res[i] = mergedTime[i].substr(2, mergedTime[i].length - 5);
//    //       }
//    //       return res;
//    //     })()
//    },
//    yAxis: {
//      type: 'value',
//      boundaryGap: [0, '100%'],
//      min: -0.6,
//      max: 0.6,
//      splitLine: {
//        show: false
//      }
//    },
//    series: [{
//      name: '',
//      type: 'line',
//      data: data
//    }]
//  };

//  var num = length;
//  //var content = $('#bpm').html();
//  //$('#bpm').append('Helo')
//  var chartsInterval = setInterval(function () {
//    for (var i = 0; i < 2; i++) {
//      data.shift();
//      data.push(addData());

//      //option.xAxis.data.shift();
//      //option.xAxis.data.push(mergedTime[num].substr(2, mergedTime[i].length - 5));

//      bpmDom.innerHTML = ~~mergedBpm[num] + " bpm";
//      num++;
//    }

//    myChart.setOption(option);
//    if(mergedTime[num] == undefined) {
//      clearInterval(chartsInterval);
//    }
//    /*  myChart.setOption({
//         series: [{
//             data: data
//         }]
//     }); */
//  },  0.0013888888888889 );

// //0.0013888888888889


//  option && myChart.setOption(option);


// /* </script> */
  


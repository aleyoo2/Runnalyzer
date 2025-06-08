const sheetID = "1ys3WCBesesljhe31iOrQufaiWOEDaVp_ZrguDN9aFlM";
const sheetName = "runnalyzer";
const sheetURL = `https://docs.google.com/spreadsheets/d/${sheetID}/gviz/tq?tqx=out:csv&sheet=${sheetName}`;
let bpmChartInstance;

// Processing the pace/distance input
const distanceInput = document.getElementById("distance");
const outputResults = document.getElementById("results");
const HRresults = document.getElementById("HRresults");


async function filterData() {  //using papa parse to easily convert fetched CSV data into an array of objects 
  const response = await fetch(sheetURL);
  const csvText = await response.text();
  const combinedPace = parseInt(minInput.value) + ':' + parseInt(secInput.value);
  const BPMmatches = [];
  const dates = [];

  const parsed = Papa.parse(csvText, {
    header: true,
    skipEmptyLines: true
  });
  for(let i = 0; i < parsed.data.length; i++) {
    if(parsed.data[i].Miles === distanceInput.value && parsed.data[i].Pace === combinedPace) {
      BPMmatches.push(parsed.data[i].BPM);
      dates.push(parsed.data[i].Date);
    } 
  }
  if(BPMmatches.length > 0) {
    HRresults.innerHTML = `Heart Rates given specified Distance and Pace ${BPMmatches.join(", ")} BPM.`;
    createChart(dates,BPMmatches);
  } else {
    HRresults.innerHTML = `No heart rates found for the given distance and pace`;
    if(bpmChartInstance){
      bpmChartInstance.destroy();
      bpmChartInstance = null; 
    }
    document.getElementById("myChart").style.backgroundColor = "transparent";
  }
  showresults();
}

function createChart(labels, data) {
  const chartBox = document.getElementById("chartBox");
  chartBox.classList.remove("fade-in");
  void chartBox.offsetWidth; 

  const ctx = document.getElementById("myChart").getContext("2d");
  document.getElementById("myChart").style.backgroundColor = "white";

  bpmChartInstance = new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [{
        label: 'BPM Reading',
        data: data,
        borderWidth: 2,
        fill: false,
        tension: 0.3,
        pointRadius: 3,
        pointHoverRadius: 3
      }]
    },
    options: {
      responsive: false,
      maintainAspectRatio: true,
      aspectRatio: 1.5,
      interaction: {
        mode: 'nearest',
        intersect: false
      },
      elements: {
        point: {
          radius: 3,
          hitRadius: 5,
          hoverRadius: 6
        }
      },
      plugins: {
        tooltip: {
          enabled: true,
        },
        title: {
          display: true,
          text: 'BPM for Given Distance and Pace',
          font: {
            size: 17,
          }
        }
      },
      scales: {
        x: {
          title: {
            display: true,
            text: 'Dates'
          }
        },
        y: {
          beginAtZero: false,
          title: {
            display: true,
            text: 'Heart Rate (BPM)'
          }
        }
      }
    }
  });

  // Trigger fade-in after chart is created
  chartBox.classList.add("fade-in");
}

  
function showresults() {
  outputResults.innerHTML = `You ran ${distanceInput.value} miles at a pace of ${minInput.value}:${secInput.value} per mile`;

  changeColor();
}

// Making the dropdown and splitting up pace input into minutes and seconds

const minInput = document.getElementById("minutes-select");
const secInput = document.getElementById("seconds-select");

for(let i = 0; i <= 59; i++) {
  const optionList = document.createElement("option")
  optionList.textContent = i.toString().padStart(2, '0');
  secInput.appendChild(optionList)
}

for(let i = 1; i <= 20; i++) {
  const optionList = document.createElement("option")
  optionList.textContent = i.toString();
  minInput.appendChild(optionList)
}

function clearData() {
  HRresults.innerHTML = '';
  outputResults.innerHTML = '';
  changeColor();
 if (bpmChartInstance) {
    bpmChartInstance.destroy();
    bpmChartInstance = null;
  }
  document.getElementById("myChart").style.backgroundColor = "transparent";
}

function changeColor() {
  const test = document.getElementById("HRresults");
  const test2 = document.getElementById("results");
  const chartIcon = document.getElementById("icon1");
  const HRicon = document.getElementById("icon2");

  const isTestEmpty = test.innerHTML.trim() === '';
  const isTest2Empty = test2.innerHTML.trim() === '';

  if (isTestEmpty) {
    HRicon.style.display = "inline-block";
    HRicon.style.fontSize = "40px";
    test.style.backgroundColor = "transparent";
    test.style.backgroundImage = "none";
  } else {
    HRicon.style.display = "none";
    test.style.backgroundColor = "#5ab8e0";
  }

  if (isTest2Empty) {
    chartIcon.style.display = "inline-block";
    chartIcon.style.fontSize = "40px";
    test2.style.backgroundColor = "transparent";
    test2.style.backgroundImage = "none";
  } else {
    chartIcon.style.display = "none";
    test2.style.backgroundColor = "#5ab8e0";
  }
}



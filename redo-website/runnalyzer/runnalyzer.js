const sheetID = "1ys3WCBesesljhe31iOrQufaiWOEDaVp_ZrguDN9aFlM";
const sheetName = "runnalyzer";
const sheetURL = `https://docs.google.com/spreadsheets/d/${sheetID}/gviz/tq?tqx=out:csv&sheet=${sheetName}`;

// Processing the pace/distance input
const distanceInput = document.getElementById("distance");
const subtmitBTN = document.getElementById("submit");
const outputResults = document.getElementById("results");
const HRresults = document.getElementById("HRresults");



async function filterData() {  //using papa parse to easily convert fetched CSV data into an array of objects 
  const response = await fetch(sheetURL);
  const csvText = await response.text();
  const combinedPace = parseInt(minInput.value) + `:` + parseInt(secInput.value);
  const BPMmatches = [];

  const parsed = Papa.parse(csvText, {
    header: true,
    skipEmptyLines: true
  });
  for(let i = 0; i < parsed.data.length; i++) {
    if(parsed.data[i].Miles === distanceInput.value && parsed.data[i].Pace === combinedPace) {
      showresults();
      BPMmatches.push(parsed.data[i].BPM);
      HRresults.innerHTML = `Your heart rates given the above were ${BPMmatches.join(", ")} BPM.`;
    } else {
      HRresults.innerHTML = `No heart rates found for the given distance and pace.`;
    }
  }
}
  
function showresults() {
  outputResults.innerHTML = `You ran ${distanceInput.value} miles at a pace of
  ${minInput.value}:${secInput.value} per mile.`;
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
  optionList.textContent = i.toString().padStart(2, '0');
  minInput.appendChild(optionList)
}


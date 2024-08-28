import { setMineralId, transientStateCopy } from './TransientState.js';


const showFacilityInventory = async (changeEvent) => {
  const random = document.getElementById('random');
  if (changeEvent.target.id === 'facility') {
    const facilityId = parseInt(changeEvent.target.value);
    const responseOne = await fetch('http://localhost:8088/facilityInventory');
    const facilityInventory = await responseOne.json();


    const responseTwo = await fetch('http://localhost:8088/facilities');
    const facilities = await responseTwo.json();


    const responseThree = await fetch('http://localhost:8088/minerals');
    const minerals = await responseThree.json();


    const facilityInventoryFromSelected = facilityInventory.filter(
      (facility) => facility.facilityId === facilityId
    );


    const matchedFacility = facilityInventoryFromSelected.map((facility) => {
      const facilityName = facilities.find(
        (selectedFacility) => selectedFacility.id === facility.facilityId
      );


      return {
        facilityName: facilityName.name,
        mineralName: findMatchingMineral(facility, minerals).name,
        quantity: facility.quantity,
        mineralId: facility.mineralId,
      };
    });


    let html = `
      <h2 class="text-light">Facility Minerals for ${matchedFacility[0].facilityName}</h2>
    `;


    const facilitiesHtml = matchedFacility.map((facility) => {
      return `
        <div class="form-check">
          <input type="radio" name="minerals" class="form-check-input" value="${facility.mineralId}"/>
          <label class="text-light" class="form-check-label">
            ${facility.quantity} tons of ${facility.mineralName}
          </label>
        </div>
      `;
    });


    html += facilitiesHtml.join('');
    random.innerHTML = html;
  }
};


export const Facilities = async () => {
  const response = await fetch('http://localhost:8088/facilities');
  const facilities = await response.json();


  document.addEventListener('change', showFacilityInventory);
  document.addEventListener('change', handleMineralSelectionChange);
  document.addEventListener('change', handleFacilitySelectionChange);
  document.addEventListener('change', showMineralInCart);


  let html = '<h3 class="text-light">Choose a facility</h3>';


  html += '<select id="facility" class="form-control">';
  html += '<option value="0">Choose a facility</option>';


  const arrayOfOptions = facilities.map((facility) => {
    return `<option value="${facility.id}">${facility.name}</option>`;
  });


  html += arrayOfOptions.join('');
  html += '</select>';


  return html;
};


const findMatchingMineral = (selectedFacility, mineralsArr) => {
  let matchedMineral = null;
  for (const mineral of mineralsArr) {
    if (selectedFacility.mineralId === mineral.id) {
      matchedMineral = mineral;
    }
  }
  return matchedMineral;
};


const handleMineralSelectionChange = (changeEvent) => {
  if (changeEvent.target.name === 'minerals') {
    const mineralId = parseInt(changeEvent.target.value);
    setMineralId(mineralId);
  }
};


const handleFacilitySelectionChange = (changeEvent) => {
  if (changeEvent.target.id === 'facility') {
    const facilityId = parseInt(changeEvent.target.value);
  }
};


const showMineralInCart = async () => {
  const para = document.querySelector('.cartItems');
  const copyOfTransientState = transientStateCopy();
  const transientMineralId = copyOfTransientState.mineralId;


  if (!transientMineralId || transientMineralId === 0) {
    para.innerHTML = 'No mineral selected';
    return;
  }


  const response = await fetch('http://localhost:8088/minerals');
  const minerals = await response.json();


  const matchedMineral = minerals.find(
    (mineral) => mineral.id === transientMineralId
  );


  if (!matchedMineral) {
    para.innerHTML = 'No matching mineral found';
    return;
  }


  para.innerHTML = `1 ton of ${matchedMineral.name} will be purchased`;
};

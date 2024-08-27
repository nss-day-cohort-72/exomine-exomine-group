//Callback Function//
const handleChangeEvent = async (changeEvent) => {
  //Facility container to be appended to later//
  const random = document.getElementById('random');
  if (changeEvent.target.id === 'facility') {
    const facilityId = parseInt(changeEvent.target.value);
    //fetch data from facilityInventory//
    const responseOne = await fetch('http://localhost:8088/facilityInventory');
    const facilityInventory = await responseOne.json();

    //fetch data from facility database//
    const responseTwo = await fetch('http://localhost:8088/facilities');
    const facilities = await responseTwo.json();

    //fetch data from minerals database //
    const responseThree = await fetch('http://localhost:8088/minerals');
    const minerals = await responseThree.json();
    //Filter facility inventory selected//
    const facilityInventoryFromSelected = facilityInventory.filter(
      (facility) => facility.facilityID === facilityId
    );
    //Grabbing data needed to display using array methods//
    const matchedFacility = facilityInventoryFromSelected.map((facility) => {
      const facilityName = facilities.find(
        (selectedFacility) => selectedFacility.id === facility.facilityID
      );

      return {
        facilityName: facilityName.name,
        mineralName: findMatchingMineral(facility, minerals).name,
        quantity: facility.quantity,
        mineralId: facility.mineralID,
      };
    });

    let html = `
          <h2>Facility Minerals for ${matchedFacility[0].facilityName}</h2>
          `;

    const facilitiesHtml = matchedFacility.map((facility) => {
      return `
                <input type = "radio" name = "minerals" value = ${facility.mineralId}/> ${facility.quantity} tons of ${facility.mineralName}
      
              `;
    });

    html += facilitiesHtml.join('');
    random.innerHTML = html;
  }
};
//Function to create HTML for facilities
export const Facilities = async () => {
  const response = await fetch('http://localhost:8088/facilities');
  const facilities = await response.json();

  document.addEventListener('change', handleChangeEvent);

  let html = '<h3>Choose a facility</h3>';

  html += '<select id="facility">';
  html += '<option value="0">Choose a facility</option>';

  const arrayOfOptions = facilities.map((facility) => {
    return `<option value="${facility.id}">${facility.name}</option>`;
  });

  html += arrayOfOptions.join('');
  html += '</select';

  return html;
};

//Helper function to find matching mineral//
const findMatchingMineral = (selectedFacility, mineralsArr) => {
  let matchedMineral = null;
  for (const mineral of mineralsArr) {
    if (selectedFacility.mineralID === mineral.id) {
      matchedMineral = mineral;
    }
  }
  return matchedMineral;
};

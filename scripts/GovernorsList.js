import { setColonyId } from './TransientState.js';

export const Governors = async () => {
  // Fetch data from the server
  const response = await fetch('http://localhost:8088/governors');
  const governors = await response.json();

  const coloniesResponse = await fetch('http://localhost:8088/colonies');
  const colonies = await coloniesResponse.json();

  const colonyInventoryResponse = await fetch(
    'http://localhost:8088/colonyInventory'
  );
  const colonyInventory = await colonyInventoryResponse.json();

  const mineralsResponse = await fetch('http://localhost:8088/minerals');
  const minerals = await mineralsResponse.json();

  // Create HTML for governor dropdown
  let html = '<h3>Choose a governor</h3>';
  html += '<select id="governor">';
  html += '<option value="0">Choose a governor</option>';

  const arrayOfOptions = governors
    .map(
      (governor) =>
        `<option data-colonyId = "${governor.colonyId}" value="${governor.id}">${governor.name}</option>`
    )
    .join('');

  html += arrayOfOptions;
  html += '</select>';
  html += '<div id="colony-info"></div>'; // Placeholder for colony info

  // Add event listener for governor selection
  document.addEventListener('change', async (event) => {
    if (event.target.id === 'governor') {
      const governorId = event.target.value;
      if (governorId === '0') {
        document.getElementById('colony-info').innerHTML = '';
        return;
      }

      const selectedGovernor = governors.find((gov) => gov.id == governorId);

      const selectedColony = colonies.find(
        (col) => col.id == selectedGovernor.colonyId
      );

      const colonyInventoryFiltered = colonyInventory.filter(
        (item) => item.colonyId == selectedColony.id
      );

      const colonyMinerals = colonyInventoryFiltered.map((item) => {
        const mineral = minerals.find((min) => min.id == item.mineralId);
        return {
          name: mineral.name,
          quantity: item.quantity,
        };
      });

      let colonyHtml = `<h3>${selectedColony.name}</h3>`;
      colonyHtml += '<ul>';
      colonyMinerals.forEach((mineral) => {
        colonyHtml += `<li>${mineral.name}: ${mineral.quantity}</li>`;
      });
      colonyHtml += '</ul>';
      document.getElementById('colony-info').innerHTML = colonyHtml;
    }
  });

  //Event listener for governor selection change//

  document.addEventListener('change', handleGovernorSelectionChange);

  return html;
};

const handleGovernorSelectionChange = (changeEvent) => {
  if (changeEvent.target.id === 'governor') {
    const selectedOption =
      changeEvent.target.options[changeEvent.target.selectedIndex];

    const colonyId = parseInt(selectedOption.dataset.colonyid);

    setColonyId(colonyId);
  }
};

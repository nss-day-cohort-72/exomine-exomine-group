import { Facilities } from './Facility.js';
import { Governors } from './GovernorsList.js';
import { purchaseBtn } from './PurchaseBtn.js';

const render = async () => {
  const governorsHTML = await Governors();
  const facilityHTML = await Facilities();
  const buttonHTML = purchaseBtn();

  const composedHTML = `
    ${governorsHTML}
    ${facilityHTML}
    <div class = "facilityInv"></div>
    <div id = "random"></div>
    ${buttonHTML}
    
    `;
  const container = document.querySelector('#container');
  container.innerHTML = composedHTML;
};

document.addEventListener("stateChanged", event => { // Change event name to match
  console.log("State of data has changed. Regenerating HTML...");
  render();
})

render();

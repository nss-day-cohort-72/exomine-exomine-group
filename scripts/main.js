import { Facilities } from './Facility.js';
import { Governors } from './GovernorsList.js';
import { purchaseBtn } from './PurchaseBtn.js';

const render = async () => {
  const governorsHTML = await Governors();
  const facilityHTML = await Facilities();
  const buttonHTML = purchaseBtn();

  const composedHTML = `
    <div class="container">
      <div class="row">
        <div class="col-md-6">
          ${governorsHTML}
        </div>
        <div class="col-md-6">
          ${facilityHTML}
        </div>
      </div>
      <div class="row mt-4">
        <div class="col-md-6">
          <div id="colony-info" class="border p-3"></div> <!-- Colony info -->
        </div>
        <div class="col-md-6">
          <div id="random" class="border p-3"></div> <!-- Facility inventory -->
        </div>
      </div>
      <div class="row mt-4">
        <div class="col-md-12 text-center">
          ${buttonHTML} <!-- Purchase Button -->
        </div>
      </div>
    </div>
  `;
  
  const container = document.querySelector('#container');
  container.innerHTML = composedHTML;
};

document.addEventListener("stateChanged", event => {
  console.log("State of data has changed. Regenerating HTML...");
  render();
})

render();

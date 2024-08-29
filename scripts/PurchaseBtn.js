import {
  colonyTransientStateCopy,
  facilityTransientCopy,
  updateInventory,
} from './TransientState.js';

const handleOrderSubmissionClick = async (clickEvent) => {
  if (clickEvent.target.id == 'purchaseBtn') {
    const colonyTransientState = colonyTransientStateCopy();
    const facilityTransientState = facilityTransientCopy();
    const colonyTransientStateValues = Object.values(colonyTransientState);
    const facilityTransientStateValues = Object.values(facilityTransientState);
    //Make sure each transient state objects do not contain 0's as values//
    if (
      !colonyTransientStateValues.includes(0) &&
      !facilityTransientStateValues.includes(0)
    ) {
      //Call update inventory for colony inventory
      await updateInventory(
        colonyTransientState.colonyId,
        colonyTransientState.mineralId,
        'colonyInventory'
      );
      //Call update inventory for facility inventory//
      await updateInventory(
        facilityTransientState.facilityId,
        facilityTransientState.mineralId,
        'facilityInventory'
      );
    } else {
      alert('Please select governor & facility');
    }
  }
};

export const purchaseBtn = () => {
  document.addEventListener('click', handleOrderSubmissionClick);
  return `
    <div class="btn-container">
      <h2 class="text-light">Space Cart</h2>
      <div><p class="cartItems"></p></div>
      <button id="purchaseBtn" class="btn btn-primary mt-3">Purchase Mineral</button>
    </div>
  `;
};

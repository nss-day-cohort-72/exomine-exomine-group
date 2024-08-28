import {
  colonyTransientStateCopy,
  facilityTransientCopy,
  updateInventory,
} from './TransientState.js';

const handleOrderSubmissionClick = async (clickEvent) => {
  if (clickEvent.target.id == 'purchaseBtn') {
    const colonyTransientState = colonyTransientStateCopy();
    const facilityTransientState = facilityTransientCopy();
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
  }
};

export const purchaseBtn = () => {
  document.addEventListener('click', handleOrderSubmissionClick);
  return `
    <div class =btn-container>
    <h2>Space Cart</h2>
    <div><p class = "cartItems"></p></div>
    <button id = "purchaseBtn">Purchase Mineral</button>
    </div>
    `;
};

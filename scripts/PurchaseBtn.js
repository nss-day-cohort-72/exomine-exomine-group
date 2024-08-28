import { transientStateCopy, updateInventory } from './TransientState.js';

const handleOrderSubmissionClick = async (clickEvent) => {
  if (clickEvent.target.id == 'purchaseBtn') {
    const transientState = transientStateCopy();
    await updateInventory(transientState.colonyId, transientState.mineralId);
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

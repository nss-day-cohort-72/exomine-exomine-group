import { purchaseMineral } from './TransientState.js';


const handleOrderSubmissionClick = (clickEvent) => {
  if (clickEvent.target.id == "purchaseBtn") {
    purchaseMineral();
  }
}

export const purchaseBtn = () => {
  document.addEventListener("click", handleOrderSubmissionClick)
  return `
    <div class =btn-container>
    <h2>Space Cart</h2>
    <div><p class = "cartItems"></p></div>
    <button id = "purchaseBtn">Purchase Mineral</button>
    </div>
    `;
};

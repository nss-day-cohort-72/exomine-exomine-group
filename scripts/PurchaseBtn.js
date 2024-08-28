import { transientStateCopy } from "./TransientState.js";

export const purchaseBtn = () => {
  return `
    <div class=btn-container>
    <h2>Space Cart</h2>
    <div><p class="cartItems"></p></div>
    <button id="purchaseBtn">Purchase Mineral</button>
    </div>
    `;
};

document.addEventListener("click", async (e) => {
  if (e.target.id === "purchaseBtn") {
    const para = document.querySelector(".cartItems");
    const copyOfTransientState = transientStateCopy();
    const transientMineralId = copyOfTransientState.mineralId;

    const response = await fetch("http://localhost:8088/minerals");
    const minerals = await response.json();
    const matchedMineral = minerals.find(
      (mineral) => mineral.id === transientMineralId
    );
    para.innerHTML = `1 ton of ${matchedMineral.name}`;
  }
});

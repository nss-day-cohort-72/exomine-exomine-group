// const transientState = {
//   facilityId: 0,
//   mineralId: 0,
//   governorId: 0,
//   quantity: 1,
// };

const transientState = {
  colonyId: 0,
  mineralId: 0,
  quantity: 1,
};

// export const setFacilityId = (chosenOption) => {
//   transientState.facilityId = chosenOption;
//   console.log(transientState);
// };

export const setColonyId = (chosenOption) => {
  transientState.colonyId = chosenOption;
  console.log(transientState);
};

export const setMineralId = (chosenOption) => {
  transientState.mineralId = chosenOption;
  console.log(transientState);
};

export const transientStateCopy = () => {
  return { ...transientState };
};

// export const purchaseMineral = async () => {
//   const postOptions = {
//     method: 'PUT',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(transientState),
//   };

//   const response = await fetch(
//     'http://localhost:8088/colonyInventory',
//     postOptions
//   );

//   document.dispatchEvent(new CustomEvent('stateChanged'));
// };

const fetchInventoryItem = async (colonyId, mineralId) => {
  const response = await fetch(
    `  http://localhost:8088/colonyInventory?colonyId =${colonyId}&mineralId=${mineralId}`
  );
  const inventoryItems = await response.json();

  if (inventoryItems.length > 0) {
    return inventoryItems[0];
  } else {
    console.error('No inventory item found');
    return null;
  }
};

export const updateInventory = async (colonyId, mineralId) => {
  const item = await fetchInventoryItem(colonyId, mineralId);

  if (item) {
    const updatedItem = { ...item, quantity: item.quantity + 1 };

    // Send the PUT request
    const response = await fetch(
      `http://localhost:8088/colonyInventory/${item.id}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedItem),
      }
    );

    if (response.ok) {
      console.log('Inventory item updated successfully');
    } else {
      console.error('Failed to update the inventory item');
    }
  }
};

/*
    Does the chosen governor's colony already own some of this mineral?
        - If yes, what should happen?
        - If no, what should happen?

    Defining the algorithm for this method is traditionally the hardest
    task for teams during this group project. It will determine when you
    should use the method of POST, and when you should use PUT.

    Only the foolhardy try to solve this problem with code.
*/

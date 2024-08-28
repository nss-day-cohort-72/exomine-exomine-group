const colonyInventoryTransientState = {
  colonyId: 0,
  mineralId: 0,
  quantity: 1,
};

const facilityInventoryTransientState = {
  facilityId: 0,
  mineralId: 0,
  quantity: 0,
};

export const setFacilityId = (chosenOption) => {
  facilityInventoryTransientState.facilityId = chosenOption;
  console.log(facilityInventoryTransientState);
};

export const setColonyId = (chosenOption) => {
  colonyInventoryTransientState.colonyId = chosenOption;
  console.log(colonyInventoryTransientState);
};

export const setMineralId = (chosenOption) => {
  colonyInventoryTransientState.mineralId = chosenOption;
  facilityInventoryTransientState.mineralId = chosenOption;
  console.log('ColonyTransient', colonyInventoryTransientState);
  console.log('FacilityTransientState', facilityInventoryTransientState);
};

export const colonyTransientStateCopy = () => {
  return { ...colonyInventoryTransientState };
};

export const facilityTransientCopy = () => {
  return { ...facilityInventoryTransientState };
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

const fetchInventoryItem = async (idOne, idTwo, facility) => {
  let url = '';
  if (facility === 'colonyInventory') {
    url = `http://localhost:8088/colonyInventory?colonyId=${idOne}&mineralId=${idTwo}`;
  } else if (facility === 'facilityInventory') {
    url = `http://localhost:8088/facilityInventory?facilityId=${idOne}&mineralId=${idTwo}`;
  }

  const response = await fetch(url);

  const inventoryItems = await response.json();

  if (inventoryItems.length > 0) {
    return inventoryItems[0];
  } else {
    console.error('No inventory item found');
    return null;
  }
};
//Function to updateInventory
export const updateInventory = async (idOne, idTwo, facility) => {
  const item = await fetchInventoryItem(idOne, idTwo, facility);
  let updatedItem;
  if (item) {
    //Condition for each facility to set updatedItem//
    if (facility === 'colonyInventory') {
      updatedItem = { ...item, quantity: item.quantity + 1 };
    } else if (facility === 'facilityInventory') {
      updatedItem = { ...item, quantity: item.quantity - 1 };
    }

    // Send the PUT request
    const response = await fetch(
      `http://localhost:8088/${facility}/${item.id}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedItem),
      }
    );
     //Log success message if successfully updated//
    if (response.ok) {
      console.log('Inventory item updated successfully');
    } else {
      console.error('Failed to update the inventory item');
    }
    const customEvent = new CustomEvent("stateChanged")
    document.dispatchEvent(customEvent)
  } else {
    //If item was not found in database then add a new entry//
    //Set conditional based on facility//
    let transientObj;
    // Assign transientObj based on facility to be POST request//
    if (facility === 'colonyInventory') {
      transientObj = colonyInventoryTransientState;
    } else if (facility === 'facilityInventory') {
      transientObj = facilityInventoryTransientState;
    }

    // Send POST request
    const response = await fetch(`http://localhost:8088/${facility}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(transientObj),
    });
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

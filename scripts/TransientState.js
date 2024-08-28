
const transientState = {
  facilityId: 0,
  mineralId: 0,
  governorId: 0,
  quantity: 1,
};

export const setFacilityId = (chosenOption) => {
  transientState.facilityId = chosenOption;
  console.log(transientState);
};

export const setGovernorId = (chosenOption) => {
  transientState.governorId = chosenOption;
  console.log(transientState);
};

export const setMineralId = (chosenOption) => {
  transientState.mineralId = chosenOption;
  console.log(transientState);
};

export const transientStateCopy = () => {
  return { ...transientState };
};

export const purchaseMineral = async () => {
    const postOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(transientState)

    }
    
    const response = await fetch("http://localhost:8088/purchases", postOptions)
    
    document.dispatchEvent(new CustomEvent('stateChanged'));
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
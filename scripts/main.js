import {Governors} from "./GovernorsList.js"



// const container = document.querySelector("#container")

// const render = async () => {
//     const metalOptionsHTML = await MetalOptions()

//     const composedHTML = `
//         <h1>Kneel Diamonds</h1>

//         <article class="choices">
//             <section class="choices__metals options">
//                 <h2>Metals</h2>
//                 ${metalOptionsHTML}
//             </section>

//             <section class="choices__sizes options">
//                 <h2>Sizes</h2>
//             </section>

//             <section class="choices__styles options">
//                 <h2>Styles</h2>
//             </section>
//         </article>

//         <article class="order">

//         </article>

//         <article class="customOrders">
//             <h2>Custom Jewelry Orders</h2>

//         </article>
//     `

//     container.innerHTML = composedHTML
// }
// document.addEventListener("nameYouChose", event => {
//     console.log("State of data has changed. Regenerating HTML...")
//     render()
// })
const render = async () => {
    const governorsHTML = await Governors()
    //     const locationsHTML = await LocationTypeChoices()
//     const buttonHTML = await SaveSubmission()
//     const submissionListHTML = await SubmissionList()
//     container.innerHTML = `${jeanOwnerShipHTML} 
//     ${locationsHTML}
//     ${buttonHTML}
//     ${submissionListHTML}
    
//     `
    const composedHTML = `
    ${governorsHTML}
    `
    const container = document.querySelector("#container")
    container.innerHTML = composedHTML
 }
 render()
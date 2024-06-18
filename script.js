function updateBuildSummary(partType) {
  const selectElement = document.getElementById(`${partType}-select`);
  const selectedOption = selectElement.options[selectElement.selectedIndex];

  removePartFromSummary(partType);

  if (selectedOption.value !== "0") {
    const buildList = document.getElementById('build-list');
    const listItem = document.createElement('li');
    listItem.dataset.type = partType;
    listItem.innerHTML = `
      <img src="images/${selectedOption.dataset.image}" alt="${partType}">
      <div>
        <h3>${selectedOption.textContent}</h3>
        <p>${selectedOption.dataset.description}</p>
        <p>Price: $${selectedOption.dataset.price}</p>
      </div>
    `;
    buildList.appendChild(listItem);

    updateTotalCost(parseFloat(selectedOption.dataset.price));
  }
}

function removePartFromSummary(partType) {
  const buildList = document.getElementById('build-list');
  const items = buildList.querySelectorAll('li');
  items.forEach(item => {
    if (item.dataset.type === partType) {
      const priceStr = item.querySelector('p:nth-child(3)').textContent;
      const price = parseFloat(priceStr.replace('Price: $', ''));
      item.remove();
      updateTotalCost(-price);
    }
  });
}

function updateTotalCost(priceDifference) {
  const totalCostElem = document.getElementById('total-cost');
  let currentTotal = parseFloat(totalCostElem.textContent.replace('Total Cost: $', ''));
  currentTotal += priceDifference;
  if (currentTotal < 0) {
    currentTotal = 0; 
  }
  totalCostElem.textContent = `Total Cost: $${currentTotal.toFixed(2)}`;
}


document.addEventListener('DOMContentLoaded', function() {
  const selectElements = document.querySelectorAll('select');
  selectElements.forEach(selectElement => {
    selectElement.addEventListener('change', function() {
      const partType = selectElement.id.replace('-select', '');
      updateBuildSummary(partType);
    });
  });
});


function checkout() {
  const buildSummary = document.getElementById('build-summary').innerHTML;
  alert(`Your Build Summary:\n\n${buildSummary}`);
}
  
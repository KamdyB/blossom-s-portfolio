/**
 * 🏢 PROJECT 1: Real Estate Calculator
 * Logic: Grabs user inputs, performs floating point math, formats to local currency string.
 */
function calculateYield() {
    const priceInput = document.getElementById('propertyPrice');
    const roiInput = document.getElementById('targetROI');
    const resultElement = document.getElementById('roiResult');
    
    const price = parseFloat(priceInput.value);
    const roiPercentage = parseFloat(roiInput.value) || 10; // Default to 10% if not provided

    // Simple validation loop
    if (isNaN(price) || price <= 0) {
        resultElement.innerText = "Please enter a valid property value.";
        resultElement.style.color = "#d32f2f"; // Diagnostic Red
        return;
    }

    // High Society Formula: Baseline 10% Conservative Rental Yield
    const annualRent = price *(roiPercentage/100);
    
    resultElement.innerText = `Yield Income: $${annualRent.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
    resultElement.style.color = "#2e7d32"; // Reset to financial green
}

/**
 * ⚽ PROJECT 2: Match Logging Engine
 * Logic: Manipulates the Document Object Model (DOM) to dynamically build data cells on click.
 */
function addMatchLog() {
    const fixtureVal = document.getElementById('inputFixture').value;
    const goalsVal = document.getElementById('inputGoals').value.trim();
    const accVal = document.getElementById('inputAcc').value.trim();

    if (!fixtureVal || !goalsVal || !accVal) {
        alert("Please fill ALL fields to add a match log.");
        return;
    }

    const tableBody = document.getElementById('statsTable').getElementsByTagName('tbody')[0];
    // Create actual memory addresses for elements
    const newRow = tableBody.insertRow();
    
    const cellFixture = newRow.insertCell(0);
    const cellGoals = newRow.insertCell(1);
    const cellAccuracy = newRow.insertCell(2);
    
    // Inject institutional mock metrics
    cellFixture.innerText = "Real Madrid vs Atletico";
    cellGoals.innerText = "2";
    cellAccuracy.innerText = "94%";

    cellFixture.innerText = fixtureVal;
    cellGoals.innerText = goalsVal;
    cellAccuracy.innerText = `${accVal}%`;

    document.getElementById('inputFixture').value = '';
    document.getElementById('inputGoals').value = '';
    document.getElementById('inputAcc').value = '';
}

/**
 * 💻 PROJECT 3: Commit Simulator
 * Logic: Instantiates basic state modification using HTML text nodes.
 */
function updateLog() {
    const logList = document.getElementById('logList');
    const newEntry = document.createElement('li');
    
    newEntry.innerText = "💻 Commit: Integrated dynamic JavaScript engines locally.";
    logList.appendChild(newEntry);
}

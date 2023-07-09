// Global sorting state
var isSorted = false;
var sorting = false;
function generateArray() {
    // If sorting is ongoing, stop it
    sorting = false;

    var arrayContainer = document.getElementById('array-container');

    // Clear the current array
    arrayContainer.innerHTML = '';

    // Generate and append the new bars
    var array = []; // You'll generate your array here

    // Get the input value
    var arraySize = document.getElementById('arraySize').value;

    //Generate random array
    for (var i = 0; i < arraySize; i++) {
        array.push(Math.floor(Math.random() * 100) + 1);
    }

    for (var i = 0; i < array.length; i++) {
        var bar = document.createElement('div');
        bar.className = 'bar';
        bar.style.height = `${array[i]}px`; // Set the bar's height equal to the array element value
        bar.dataset.size = array[i];
        arrayContainer.appendChild(bar);
    }
    isSorted = false;
}

function getSpeed() {
    var speedElement = document.querySelector('input[name="speed"]:checked');
    var speedValue = speedElement ? speedElement.value : 'medium';
    
    if (speedValue == 'slow')
        return 1000;
    else if (speedValue == 'medium')
        return 10;
    else if (speedValue == 'fast')
        return 1;
}

function recreateBars(array) {
    var arrayContainer = document.getElementById('array-container');
    
    // Delete all existing bars
    while (arrayContainer.firstChild) {
        arrayContainer.removeChild(arrayContainer.firstChild);
    }

    // Create new bars
    for (let i = 0; i < array.length; i++) {
        var bar = document.createElement("div");
        bar.style.height = `${array[i]}px`;
        bar.className = "bar";
        bar.dataset.size = array[i];
        arrayContainer.appendChild(bar);
    }
}

document.getElementById('generateArray').addEventListener('click', function() {
    document.getElementById('algorithm-name').innerText = "";
    document.getElementById('algorithm-description').innerText = "";
    document.getElementById('algorithm-complexity').innerText = "";
})

function toggleButtons(enable) {
    document.getElementById('BubbleSort').disabled = !enable;
    document.getElementById('QuickSort').disabled = !enable;
    document.getElementById('MergeSort').disabled = !enable;
    document.getElementById('HeapSort').disabled = !enable;
    document.getElementById('generateNewArray').disabled = !enable;
}

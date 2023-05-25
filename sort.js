function generateArray() {
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
}

function BubbleSort() {
    var speed = getSpeed();
    var bars = Array.from(document.getElementsByClassName('bar'));
    var array = bars.map(bar => parseInt(bar.dataset.size));
    var len = array.length;

    for (let i = 0; i < len; i++) {
        for (let j = 0; j < len - i - 1; j++) {
            // Comparing bars
            setTimeout(() => {
                bars[j].classList.add('compared');
                bars[j + 1].classList.add('compared');
            }, (i * len + j) * speed);

            setTimeout(() => {
                // If the current bar is greater than the next one, swap them
                if (array[j] > array[j + 1]) {
                    // Swap elements in the array
                    var temp = array[j];
                    array[j] = array[j + 1];
                    array[j + 1] = temp;

                    // Swap heights of the bars
                    var tempHeight = bars[j].style.height;
                        bars[j].style.height = bars[j + 1].style.height;
                        bars[j + 1].style.height = tempHeight;

                    // Swap data-size of the bars
                    var tempSize = bars[j].dataset.size;
                    bars[j].dataset.size = bars[j + 1].dataset.size;
                    bars[j + 1].dataset.size = tempSize;
                }

                bars[j].classList.remove('compared');
                bars[j + 1].classList.remove('compared');
            }, (i * len + j + 1) * speed);
        }

        // Mark the last bar of each pass as sorted
        setTimeout(() => {
            bars[len - i - 1].classList.add('sorted');
        }, len * (i + 1) * speed);
    }
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

function getSpeed() {
    var speedElement = document.querySelector('input[name="speed"]:checked');
    var speedValue = speedElement ? speedElement.value : 'medium';
    
    if (speedValue == 'slow')
        return 250;
    else if (speedValue == 'medium')
        return 100;
    else if (speedValue == 'fast')
        return 10;
}



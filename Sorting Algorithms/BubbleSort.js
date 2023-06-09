var isSorted = false;

function BubbleSort() {
    if (isSorted) {
        alert("Array is already sorted.");
        return;
    }
    
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
        setTimeout(() => {
            isSorted = true;
        }, len * len * speed);
    }
}

document.getElementById('BubbleSort').addEventListener('click', function() {
    document.getElementById('algorithm-name').innerText = "Bubble Sort";
    document.getElementById('algorithm-description').innerText = "Bubble Sort is a simple sorting algorithm that repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order. The pass through the list is repeated until the list is sorted.";
    document.getElementById('algorithm-complexity').innerText = "Time Complexity: O(n^2) | Space Complexity: O(1)";

});





var isSorted = false;

// utility function to pause execution for the specified number of milliseconds
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// utility function to swap elements i and j in array bars
async function swap(bars, i, j){
    changeColor(bars[i], 'red'); // Color elements that are being swapped red
    changeColor(bars[j], 'red'); // Color elements that are being swapped red
    await sleep(getSpeed());
    
    let temp = bars[i].style.height;
    bars[i].style.height = bars[j].style.height;
    bars[j].style.height = temp;
    
    changeColor(bars[i], 'green'); // Color elements that are in correct position green
    changeColor(bars[j], 'green'); // Color elements that are in correct position green
}

// partition the array using the last element as the pivot
async function partition(bars, low, high) {
    let pivot = parseInt(bars[high].style.height); // pivot
    let i = (low - 1); // index of smaller element

    for (let j = low; j <= high - 1; j++) {
        if (!sorting) return;
        
        // color the pivot element yellow
        changeColor(bars[high], 'yellow');
        
        // if current element is smaller than the pivot
        if (parseInt(bars[j].style.height) < pivot) {
            i++; // increment index of smaller element
            await swap(bars, i, j);
        }
        
        // color the pivot element green after comparing
        changeColor(bars[high], 'green');
    }
    
    await swap(bars, i + 1, high); // put the pivot element in its correct place
    return (i + 1);
}

// the main function that implements QuickSort
async function quickSort(bars, low, high) {
    if (!sorting) return;

    if (low < high) {
        // find pivot element such that
        // elements smaller than pivot are on the left
        // elements greater than pivot are on the right
        let pi = await partition(bars, low, high);

        // recursive call on the left of pivot
        await quickSort(bars, low, pi - 1);

        // recursive call on the right of pivot
        await quickSort(bars, pi + 1, high);
    } else {
        if (low >= 0 && high >= 0 && low <bars.length && high <bars.length){
            changeColor(bars[low], 'green'); // Color elements that are in correct position green
            changeColor(bars[high], 'green'); // Color elements that are in correct position green
        }
    }
}

// add event listener to QuickSort button
document.getElementById('QuickSort').addEventListener('click', async function() {
    document.getElementById('algorithm-name').innerText = "Quick Sort";
    document.getElementById('algorithm-description').innerText = "QuickSort is a divide-and-conquer method for sorting. It works by selecting a 'pivot' element from the array and partitioning the other elements into two sub-arrays, according to whether they are less than or greater than the pivot.";
    document.getElementById('algorithm-complexity').innerText = "Time Complexity: O(n^2) | Space Complexity: O(log n)";
    if (isSorted) {
        alert("Array is already sorted.");
        return;
    }
    var bars = document.querySelectorAll('.bar');
    var l = 0;
    var r = parseInt(bars.length) - 1;
    sorting = true;
    await quickSort(bars, l, r);
    sorting = false;
    isSorted = true;
});

var isSorted = false;

async function heapify(bars, n, i) {
    var largest = i; // Initialize largest as root
    var left = 2 * i + 1; // left = 2*i + 1
    var right = 2 * i + 2; // right = 2*i + 2

    // If left child is larger than root
    if (left < n && parseInt(bars[left].style.height) > parseInt(bars[largest].style.height)) {
        largest = left;
    }

    // If right child is larger than largest so far
    if (right < n && parseInt(bars[right].style.height) > parseInt(bars[largest].style.height)) {
        largest = right;
    }

    // If largest is not root
    if (largest != i) {
        changeColor(bars[i], 'red'); // Color the bar that is being swapped red
        changeColor(bars[largest], 'red'); // Color the bar that is being swapped red
        await swap(bars, i, largest);

        changeColor(bars[i], 'yellow'); // Color the bar that has been compared yellow
        if (i < bars.length - 1) {
            changeColor(bars[i+1], 'yellow'); // Color the bar that has been compared yellow
        }
        
        await heapify(bars, n, largest);
    }
}

async function HeapSort(bars) {
    var n = bars.length;

    // Build heap (rearrange array)
    for (var i = Math.floor(n / 2) - 1; i >= 0; i--) {
        await heapify(bars, n, i);
    }

    // One by one extract an element from heap
    for (var i = n - 1; i >= 0; i--) {
        // Move current root to end
        changeColor(bars[0], 'red'); // Color the bar that is being swapped red
        changeColor(bars[i], 'red'); // Color the bar that is being swapped red
        await swap(bars, 0, i);

        // call max heapify on the reduced heap
        await heapify(bars, i, 0);
    }

    bars.forEach(bar => bar.classList.add('sorted')); // mark all elements as sorted
}

document.getElementById('HeapSort').addEventListener('click', async function() {
    document.getElementById('algorithm-name').innerText = "Heap Sort";
    document.getElementById('algorithm-description').innerText = "Heap sort is a comparison based sorting technique based on Binary Heap data structure. It is similar to selection sort where we first find the maximum element and place the maximum element at the end. We repeat the same process for the remaining elements.";
    document.getElementById('algorithm-complexity').innerText = "Time Complexity: O(n log n) | Space Complexity: O(1)";
    if (isSorted) {
        alert("Array is already sorted.");
        return;
    }
    var bars = document.querySelectorAll('.bar');
    sorting = true;
    await HeapSort(bars);
    sorting = false;
    isSorted = true;
});

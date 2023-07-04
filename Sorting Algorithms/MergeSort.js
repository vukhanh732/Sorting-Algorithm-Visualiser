// utility function to swap bar heights
async function swap(el1, el2) {
    var speed = getSpeed();
    return new Promise((resolve) => {
        var temp = el1.style.height;
        el1.style.height = el2.style.height;
        el2.style.height = temp;

        window.requestAnimationFrame(function() {
            setTimeout(() => {
                resolve();
            }, speed);
        });
    });
}

// color changing utility
function changeColor(el, color) {
    el.style.backgroundColor = color;
}

// merge sort
async function merge(l, m, r) {
    if (!sorting) return;
    var speed = getSpeed();
    var bars = document.querySelectorAll(".bar");
    var n1 = m - l + 1;
    var n2 = r - m;
    let left = new Array(n1);
    let right = new Array(n2);

    for (var i = 0; i < n1; i++) {
        await new Promise((resolve) =>
            setTimeout(() => {
                resolve();
            }, speed)
        );
        left[i] = bars[l + i].style.height;
        changeColor(bars[l + i], 'yellow'); // Color the bars being compared
    }

    for (i = 0; i < n2; i++) {
        await new Promise((resolve) =>
            setTimeout(() => {
                resolve();
            }, speed)
        );
        right[i] = bars[m + 1 + i].style.height;
        changeColor(bars[m + 1 + i], 'yellow'); // Color the bars being compared
    }

    i = 0;
    j = 0;
    k = l;
    console.log(i, j, k, n1, n2);
    while (i < n1 && j < n2) {
        await new Promise((resolve) =>
            setTimeout(() => {
                resolve();
            }, speed)
        );

        if (parseInt(left[i]) <= parseInt(right[j])) {
            if (bars[k]) {
                changeColor(bars[k], 'green'); // Color the correctly sorted bars
                bars[k].style.height = left[i];
            }
            i++;
        } else {
            if (bars[k]) {
                changeColor(bars[k], 'green'); // Color the correctly sorted bars
                bars[k].style.height = right[j];
            }
            j++;
        }
        k++;
    }

    while (i < n1) {
        await new Promise((resolve) =>
            setTimeout(() => {
                resolve();
            }, speed)
        );

        if (bars[k]) {
            changeColor(bars[k], 'green'); // These bars are in the correct order
            bars[k].style.height = left[i];
        }
        i++;
        k++;
    }
    while (j < n2) {
        await new Promise((resolve) =>
            setTimeout(() => {
                resolve();
            }, speed)
        );

        if (bars[k]) {
            changeColor(bars[k], 'green'); // These bars are in the correct order
            bars[k].style.height = right[j];
        }
        j++;
        k++;
    }

}

async function mergeSort(l, r) {
    if (!sorting) return;
    if (l >= r) {
        return;
    }
    var m = l + Math.floor((r - l) / 2);
    await mergeSort(l, m);
    await mergeSort(m + 1, r);
    await merge(l, m, r);
}

// add event listener to MergeSort button
document.getElementById('MergeSort').addEventListener('click', function() {
    sorting = true;
    var bars = document.querySelectorAll('.bar');
    var barHeights = [...bars].map((bar) => parseInt(bar.style.height));
    var l = 0;
    var r = parseInt(barHeights.length) - 1;
    mergeSort(l, r);
});

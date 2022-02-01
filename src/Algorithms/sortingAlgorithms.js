import { playSound } from "../AudioMaker/audio";

export const sortingOptions = {
  speed: 40,
  array: null,
  setArray: null,
  soundOn: false,
};

const updateArray = (arr, speed = sortingOptions.speed) =>
  new Promise((resolve) => {
    setTimeout(() => {
      sortingOptions.setArray([...arr]);
      resolve();
    }, speed);
  });
// const context = new (AudioContext || webkitAudioContext)();

async function animateWithColor(arr, index, color1, color2) {
  if (index >= arr.length) return;

  if (sortingOptions.soundOn) {
    playSound("sine", arr[index].value + 300, 0.1);
  }
  arr[index].color = color1;
  await updateArray(arr);
  arr[index].color = color2;
  await updateArray(arr);
}

async function animateSortedArray(arr, color) {
  for (let i = 0; i < arr.length; ++i) {
    await animateWithColor(arr, i, color, color);
  }
}

function resetColor(arr) {
  for (let item of arr) {
    item.color = "blue";
  }
  sortingOptions.setArray([...arr]);
}

export const bubbleSort = async () => {
  const arr = sortingOptions.array;
  resetColor(arr);
  for (let i = 0; i < arr.length - 1; ++i) {
    let swapped = false;
    for (let j = 0; j < arr.length - i - 1; ++j) {
      await animateWithColor(arr, j, "yellow", "blue");
      await animateWithColor(arr, j + 1, "yellow", "blue");
      if (arr[j].value > arr[j + 1].value) {
        [arr[j + 1], arr[j]] = [arr[j], arr[j + 1]];
        await animateWithColor(arr, j, "red", "blue");
        await animateWithColor(arr, j + 1, "red", "blue");
        swapped = true;
      }
    }
    if (!swapped) break;
  }
  await animateSortedArray(arr, "lawngreen");
};

export const mergeSort = async () => {
  const arr = sortingOptions.array;
  resetColor(arr);
  console.log(arr === sortingOptions.array);
  async function merge(arr, l, m, r) {
    var n1 = m - l + 1;
    var n2 = r - m;

    var L = new Array(n1);
    var R = new Array(n2);
    for (var i = 0; i < n1; i++) {
      L[i] = arr[l + i];
      await animateWithColor(arr, l + i, "yellow", "blue");
    }
    for (var j = 0; j < n2; j++) {
      R[j] = arr[m + 1 + j];

      await animateWithColor(arr, m + 1 + j, "yellow", "blue");
    }
    var i = 0;
    var j = 0;
    var k = l;

    while (i < n1 && j < n2) {
      if (L[i].value <= R[j].value) {
        arr[k] = L[i];
        i++;
      } else {
        arr[k] = R[j];
        j++;
      }
      await animateWithColor(arr, k, "red", "blue");
      k++;
    }

    while (i < n1) {
      arr[k] = L[i];

      await animateWithColor(arr, k, "red", "blue");
      i++;
      k++;
    }

    while (j < n2) {
      arr[k] = R[j];

      await animateWithColor(arr, k, "red", "blue");
      j++;
      k++;
    }
  }
  async function sort(arr, l, r) {
    if (l >= r) {
      return;
    }
    var m = l + parseInt((r - l) / 2);
    await sort(arr, l, m);
    await sort(arr, m + 1, r);
    await merge(arr, l, m, r);
  }
  await sort(arr, 0, arr.length - 1);
  await animateSortedArray(arr, "lawngreen");
};

export const quickSort = async () => {
  const arr = sortingOptions.array;
  resetColor(arr);
  const getPivotIndex = async (arr, start, end) => {
    let pivotIndex = start;
    let pivot = arr[pivotIndex].value;
    while (start < end) {
      while (start < end && arr[start].value <= pivot) {
        await animateWithColor(arr, start, "yellow", "blue");
        start++;
      }

      while (end >= start && arr[end].value > pivot) {
        await animateWithColor(arr, end, "yellow", "blue");
        end--;
      }

      if (start < end) {
        [arr[start], arr[end]] = [arr[end], arr[start]];
        await animateWithColor(arr, start, "red", "blue");
        await animateWithColor(arr, end, "red", "blue");
      }
    }
    [arr[pivotIndex], arr[end]] = [arr[end], arr[pivotIndex]];

    await animateWithColor(arr, pivotIndex, "red", "blue");
    await animateWithColor(arr, end, "red", "blue");

    return end;
  };

  const sort = async (arr, start, end) => {
    if (start >= end) {
      return;
    }
    const pivotIndex = await getPivotIndex(arr, start, end);
    await sort(arr, start, pivotIndex - 1);
    await sort(arr, pivotIndex + 1, end);
  };

  await sort(arr, 0, arr.length - 1);
  await animateSortedArray(arr, "lawngreen");
};

export const insertionSort = async () => {
  const arr = sortingOptions.array;
  resetColor(arr);
  for (let i = 1; i < arr.length; i++) {
    let key = arr[i];
    await animateWithColor(arr, i, "yellow", "blue");
    let j = i - 1;
    while (j >= 0 && arr[j].value > key.value) {
      arr[j + 1] = arr[j];
      await animateWithColor(arr, j, "yellow", "blue");
      await animateWithColor(arr, j + 1, "red", "blue");
      j = j - 1;
    }
    arr[j + 1] = key;
    await animateWithColor(arr, j + 1, "red", "blue");
  }
  await animateSortedArray(arr, "lawngreen");
};

export const selectionSort = async () => {
  const arr = sortingOptions.array;
  resetColor(arr);
  for (let i = 0; i < arr.length; ++i) {
    let swapped = false;
    await animateWithColor(arr, i, "yellow", "blue");
    for (let j = i + 1; j < arr.length; ++j) {
      await animateWithColor(arr, j, "yellow", "blue");
      if (arr[i].value > arr[j].value) {
        swapped = true;
        [arr[i], arr[j]] = [arr[j], arr[i]];
        await animateWithColor(arr, i, "red", "blue");
        await animateWithColor(arr, j, "red", "blue");
      }
    }
    if (!swapped) break;
  }
  await animateSortedArray(arr, "lawngreen");
};

export const heapSort = async () => {
  const arr = sortingOptions.array;
  resetColor(arr);

  async function sort(arr) {
    let n = arr.length;

    // Build heap (rearrange array)
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
      await heapify(arr, n, i);
    }

    // One by one extract an element from heap
    for (let i = n - 1; i > 0; i--) {
      // Move current root to end
      let temp = arr[0];
      arr[0] = arr[i];
      arr[i] = temp;
      // [arr[0], arr[i]] = [arr[i], arr[0]];

      await animateWithColor(arr, 0, "red", "blue");
      await animateWithColor(arr, i, "red", "blue");

      // call max heapify on the reduced heap
      await heapify(arr, i, 0);
    }
  }

  // To heapify a subtree rooted with node i which is
  // an index in arr[]. n is size of heap
  async function heapify(arr, n, i) {
    let largest = i; // Initialize largest as root
    let l = 2 * i + 1; // left = 2*i + 1
    let r = 2 * i + 2; // right = 2*i + 2

    // If left child is larger than root

    await animateWithColor(arr, l, "yellow", "blue");
    await animateWithColor(arr, largest, "yellow", "blue");
    if (l < n && arr[l].value > arr[largest].value) {
      largest = l;
    }

    // If right child is larger than largest so far
    await animateWithColor(arr, r, "yellow", "blue");
    if (r < n && arr[r].value > arr[largest].value) {
      largest = r;
    }

    // If largest is not root
    if (largest != i) {
      await animateWithColor(arr, largest, "red", "blue");
      await animateWithColor(arr, i, "red", "blue");
      [arr[i], arr[largest]] = [arr[largest], arr[i]];

      // Recursively heapify the affected sub-tree
      await heapify(arr, n, largest);
    }
  }
  await sort(arr);
  await animateSortedArray(arr, "lawngreen");
};

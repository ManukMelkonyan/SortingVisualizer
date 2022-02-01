import React, { useState } from 'react';
import './style.css';
import Bar from './Bar';
import {
  bubbleSort,
  mergeSort,
  quickSort,
  insertionSort,
  selectionSort,
  heapSort,
  sortingOptions,
} from './sortingAlgorithms.js';

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const disableElements = () => {
  document.getElementById('newArrayBtn').disabled = true;
  document.getElementById('bubbleSortBtn').disabled = true;
  document.getElementById('mergeSortBtn').disabled = true;
  document.getElementById('quickSortBtn').disabled = true;
  document.getElementById('heapSortBtn').disabled = true;
  document.getElementById('insertionSortBtn').disabled = true;
  document.getElementById('selectionSortBtn').disabled = true;
  document.getElementById('arraySizeInput').disabled = true;
};

const enableElements = () => {
  document.getElementById('newArrayBtn').disabled = false;
  document.getElementById('bubbleSortBtn').disabled = false;
  document.getElementById('mergeSortBtn').disabled = false;
  document.getElementById('quickSortBtn').disabled = false;
  document.getElementById('heapSortBtn').disabled = false;
  document.getElementById('insertionSortBtn').disabled = false;
  document.getElementById('selectionSortBtn').disabled = false;
  document.getElementById('arraySizeInput').disabled = false;
};

const generateNewArray = (count) => {
  return new Array(count)
    .fill()
    .map((e) => ({ value: getRandomInt(30, 300), color: 'blue' }));
};

export default function App() {
  let [arr, setArray] = useState(generateNewArray(50));
  sortingOptions.array = arr;
  sortingOptions.setArray = setArray;

  return (
    <>
      <div className="flex-container control-panel">
        <button
          id="newArrayBtn"
          onClick={() => {
            setArray(generateNewArray(arr.length));
          }}
        >
          Generate New Array
        </button>
        <button
          id="bubbleSortBtn"
          onClick={async () => {
            disableElements();
            await bubbleSort();
            enableElements();
          }}
        >
          Bubble Sort!
        </button>
        <button
          id="mergeSortBtn"
          onClick={async () => {
            disableElements();
            await mergeSort();
            enableElements();
          }}
        >
          Merge Sort!
        </button>
        <button
          id="quickSortBtn"
          onClick={async () => {
            disableElements();
            await quickSort();
            enableElements();
          }}
        >
          Quick Sort!
        </button>
        <button
          id="heapSortBtn"
          onClick={async () => {
            disableElements();
            await heapSort();
            enableElements();
          }}
        >
          Heap Sort!
        </button>
        <button
          id="insertionSortBtn"
          onClick={async () => {
            disableElements();
            await insertionSort();
            enableElements();
          }}
        >
          Insertion Sort!
        </button>
        <button
          id="selectionSortBtn"
          onClick={async () => {
            disableElements();
            await selectionSort();
            sortingOptions.setArray([...arr]);
            enableElements();
          }}
        >
          Selection Sort!
        </button>
        <div className="vertical-line"></div>
        <div className="input-container">
          <div>Array size</div>
          <input
            id="arraySizeInput"
            type="range"
            min="20"
            max="100"
            onChange={(e) => {
              setArray(generateNewArray(parseInt(e.target.value)));
            }}
          />
        </div>
        <div className="input-container">
          <div>Speed</div>
          <input
            id="speedInput"
            type="range"
            min="5"
            max="99"
            onChange={(e) => {
              sortingOptions.speed = 100 - parseInt(e.target.value);
            }}
          />
        </div>
        <div className="input-container">
          <input
            id="soundCheckBox"
            type="checkbox"
            onChange={(e) => {
              sortingOptions.soundOn = e.target.checked;
            }}
          />
          <span className="slider round">Enable sound</span>
        </div>
      </div>

      <div className="flex-container">
        <div className="flex-container bar-container">
          {arr.map((e, i) => {
            return (
              <Bar className="bar" value={e.value} color={e.color} key={i} />
            );
          })}
        </div>
      </div>
    </>
  );
}

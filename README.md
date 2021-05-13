# Somesort 🧙‍

> A sorting algorithm visualizer with satisfying UI/UX

[![Technologies](https://img.shields.io/badge/technologies-Typescript%20|%20React%20|%20Sass-blue)][homepage]
[![Code Size](https://img.shields.io/github/languages/code-size/ethanthatonekid/somesort)][homepage]

<!--
[![Dependency Vulnerability](https://img.shields.io/david/EthanThatOneKid/somesort)][package]
[![Dev-Dependency Vulnerability](https://img.shields.io/david/dev/EthanThatOneKid/somesort)][package]
-->

## [Visit Demo][homepage] ▶

## Supportability 💣

| **Name**                                         | **Status** | **Info**                                                                         |
| ------------------------------------------------ | ---------- | -------------------------------------------------------------------------------- |
| [Quicksort](src/algorithms/quicksort.ts)         | ✅         | [ℹ](https://en.wikipedia.org/wiki/Quicksort)                                     |
| [Mergesort](src/algorithms/mergesort.ts)         | ✅         | [ℹ](https://en.wikipedia.org/wiki/Merge_sort)                                    |
| [Blocksort](src/algorithms/blocksort.ts)         | ❌         | [ℹ](https://en.wikipedia.org/wiki/Block_sort)                                    |
| [Radixsort](src/algorithms/radixsort.ts)         | ❌         | [ℹ](https://en.wikipedia.org/wiki/Radix_sort#Most_significant_digit_radix_sorts) |
| [Selectionsort](src/algorithms/selectionsort.ts) | ✅         | [ℹ](https://en.wikipedia.org/wiki/Selection_sort)                                |
| [Shellsort](src/algorithms/shellsort.ts)         | ❌         | [ℹ](https://en.wikipedia.org/wiki/Shellsort)                                     |
| [Countingsort](src/algorithms/countingsort.ts)   | ❌         | [ℹ](https://en.wikipedia.org/wiki/Counting_sort)                                 |
| [Bubblesort](src/algorithms/bubblesort.ts)       | ✅         | [ℹ](https://en.wikipedia.org/wiki/Bubble_sort)                                   |
| [Combsort](src/algorithms/combsort.ts)           | ✅         | [ℹ](https://en.wikipedia.org/wiki/Comb_sort)                                     |
| [Gnomesort](src/algorithms/gnomesort.ts)         | ❌         | [ℹ](https://en.wikipedia.org/wiki/Gnome_sort)                                    |
| [Slowsort](src/algorithms/slowsort.ts)           | ❌         | [ℹ](https://en.wikipedia.org/wiki/Slowsort)                                      |
| [Stoogesort](src/algorithms/stoogesort.ts)       | ❌         | [ℹ](https://en.wikipedia.org/wiki/Stooge_sort)                                   |

## About 🙏

This web-app was created as a design experiment and a datastructures/algorithms challenge. There are multiple instances of UX design components, such as the dials and list display, that require custom event handling. The name _Somesort_ was derrived from the mere fact that this project is a _sort_-ing visualizer with _some_ variety of sorting algorithms. The source for these sorting algorithms are neatly organized in the [`algorithms` directory](src/algorithms). This project utilizes skillful design techniques and mastery of algorithm-implementation as well as proficiency and eloquence in TypeScript, ReactJS, and Sass.

## Todo ✅

- Implement sorting algorithms from [this video](https://www.youtube.com/watch?v=LOZTuMds3LM)
- Allow dial values to be adjusted via input[type=number] field
- Infinite random activity
- Future optimizations/feature ideas

## Available Scripts 📜

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.
The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!
See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**
If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.
Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.
You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More 🧠

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).
To learn React, check out the [React documentation](https://reactjs.org/).

## Deploying as GitHub Page 🌐

Run `npm run predeploy` to build the distribution branch and then run `npm run deploy` to publish it.

## Somesort Logo 📷

Designed and exported in [Adobe XD](https://www.adobe.com/products/xd.html).

[![Somesort Logo](public/logo.svg)](public/logo.svg)

---

[![Buy me a coffee](https://www.buymeacoffee.com/assets/img/custom_images/yellow_img.png)](http://buymeacoff.ee/etok)

Engineered with 💖 by EthanThatOneKid

[homepage]: https://ethanthatonekid.github.io/somesort/
[package]: package.json

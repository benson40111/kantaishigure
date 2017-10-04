# kantaishigure [![Build Status](https://api.travis-ci.org/Sean2525/kantaishigure.svg?branch=master)](https://github.com/Sean2525/kantaishigure)
> An electron project for kancolle automate

## Features
* Basic view &mdash; resource, fleets, quest, expeditions, docking, construction
* Normal battle prophet
  * Doesn't supports combined battle
* Expedition module &mdash; automate expeditions
* Sortie module &mdash; automate sorties, repairs
  * Doesn't supports sorties to Event maps, Combined Fleets
* Scheduled sleeping of script
* Random variations to help avoid bot detection

*Many line of code are copied from poi*<br >
*If you don't need automate sortie or expedition just go to use poi*

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:9080
npm run dev

# build electron application for production
npm run build

# run unit & end-to-end tests
npm test


# lint all JS/Vue component files in `src/`
npm run lint
```



### Q/A
#### Q: Why automate sortie not supports events, combinded fleets?

A: Because I had only intended to take it to upgrade my ship.

#### Q: Why the game is often reloaded?

A: I'm not using graphic identification,just calculate the location to run script,
so if your network unstable, it will happen often.

#### Q: 2018 spring kancolle will update to html5, will you upgrade?

A: Yes, if I have time.

#### Q: Your code is ugly I can improve it?

A: Sure, just pull request.


## Special thanks

+ [poi](https://github.com/poooi/poi)
+ [electron-vue](https://github.com/SimulatedGREG/electron-vue)


## Based on
+ [Electron](https://github.com/atom/electron)
+ [vue](https://github.com/vuejs/vue)
+ [vuex](https://github.com/vuejs/vuex)


## License
[The MIT License](https://github.com/Sean2525/kantaishigure/blob/master/LICENSE)

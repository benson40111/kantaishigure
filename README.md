# kantaishigure [![Build Status](https://api.travis-ci.org/Sean2525/kantaishigure.svg?branch=master)](https://github.com/Sean2525/kantaishigure)
> An electron project for kancolle automate

## Features
* Basic view &mdash; resources, fleets, quest, expeditions, docking, construction
* Normal battle prophet
  * Doesn't supports combined battle
* Expedition module &mdash; automate expeditions
* Sortie module &mdash; automatic sortie, repair
  * Doesn't support sortie to Event maps, Combined Fleets
* Scheduled sleeping of script
* Random variations could help you to avoid bot detection

*Lots of code is copied from poi*<br >
*If you don't need automative sortie or expedition, just go to use poi*

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
#### Q: Why automatic sortie not supports events, combinded fleets?

A: Because I just want to upgrade my ship.

#### Q: Why the game is usually reload?

A: I didn't use graphic identification, just calculate the location then run the script,
so if your network is unstable, it's usually occurs.

#### Q: 2018 spring kancolle will upgrade to html5, will you update?

A: Yes, if I have time.

#### Q: Your code is ugly and grammar is too bad, can I improve it?

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

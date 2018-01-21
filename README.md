# Medical Calculators for Doc Bot

## Development

### OS X Setup (for the very first time)

You will need:

- [Github Desktop GUI](https://desktop.github.com/)
- [Homebrew](https://brew.sh/)
- [Node](https://nodejs.org/en/) -- Install using `brew install node`.

Once, you have the pre-requisites above set up and sucessfully cloned the [Git repository](https://gitlab.com/docbot.md/medical-calculators/), do the following in the terminal

    cd medical-calculators
    npm install

### Subsequent times

    cd medical-calculators
    npm run start

## Govard's Notes

### Next steps for the next developer

Point based calculators are simply reusable through `db.json`

Keep in mind, that you need to update URLs in `fetchListData` and `fetchCalcData` inside `src/store/modules/` to match the backend you need.

For the new types of data-grabbers (like new `date` based selects, or maybe tables) you need to create a new component inside `src/components/Calculator/body/calculate/fields`. Check `QuestionField.js` and `QuestionGroup.js` and teach new component to communicate with `redux` through calculator reducer. In the same way that other calculators behave.

After that you parse this result for formula based calculators in split javascript file.

Formula based calculators are like point based, they have base data inside `db.json` but you need to have `src/formulas/calculator-id.js` to be loaded dynamically.

In this file you receive the data from inputs, checkboxes, selects, radio buttons for the calculators of `type` `formula`.

There you receive `redux` data and need to implement logic for calculation (formula) and how it should look like in terms of `react`. Also, there are units for each select to be convertable.

### Project notes

You can check `package.json` file with `scripts` of it.

Local web app: `yarn start` or `npm run start`.

Local web server (`json-server`): `yarn server` or `npm run server`. Keep in mind that this is by default serving on `:3001` port so if taken it will fail. You can either empty this port of update `package.json`

Local web app +  local web server: `yarn dev` or `npm run dev` which runs 2 above scripts in parallel. You can also run above scripts  2 different terminals or in parallel with `&&`

Deploy to stable http://medical-calc.surge.sh: `yarn deploy` or `npm run deploy`. This builds the project with `yarn build` or `npm run build`, then deploys with `yarn surge` or `npm run surge`, then removes `/build` dist with `yarn clean` or `npm run clean`

Deploy to dev http://medical-calc-dev.surge.sh: `yarn deploy:dev` or `npm run deploy:dev`. This builds the project with `yarn build` or `npm run build`, then deploys with `yarn surge:dev` or `npm run surge:dev`, then removes `/build` dist with `yarn clean` or `npm run clean`

Stable web version. Usually `gbarkhatov` branch:

http://medical-calc.surge.sh/

Dev web version I am working on. Keep in mind that this is not updating constantly as I usually don't need to check how web app behaves remotely and can work locally:

http://medical-calc-dev.surge.sh

Now.sh Database:

https://medical-calc.now.sh/

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

Below you will find some information on how to perform common tasks.<br>
You can find the most recent version of this guide [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).

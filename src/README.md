## Build process 
The build process is only necessary if you want to build the block yourself.

- To build the block during development.

`npm start` or `npm run dev`

Press Ctrl-C to stop the process.

- To build the block for production.

`npm run build`

The routine should terminate when the build is complete.

- To build the main file for translation

`npm run makepot`

- To create the block editor language files after translation.

`npm run makejson`

- To automatically generate language files for:
  - UK English ( locale: en_GB ) 
  - bbboing ( a language used for testing, locale: bb_BB ) 
  
`npm run l10n`  


Pre-requisites:

You need to have `npm` - Node Package Manager - installed.

For some basic instructions see the Build process section of [oik-blocks summary of blocks README](https://github.com/bobbingwide/oik-blocks/tree/master/blocks)

Many people run the `npm` command from the command line.

For `l10n` see [Internationalization for the oik suite of plugins](https://github.com/bobbingwide/oik-i18n)



## Build process
The build process is only necessary if you want to build the block yourself.

Command | Purpose                                                      | Notes
-------- |--------------------------------------------------------------| -----
`npm start` or `npm run dev` | To build the blocks during development.                      | Press Ctrl-C to stop the process.
`npm run build` | To build the blocks for production                           | The routine should terminate when the build is complete.
`npm run makepot` | To build the main .pot file for translation                  | Uses wp-cli. Note the plugin specific parameters
`npm run l10n` | To automatically generate language (.po) files.              | See below
`npm run makejson` | To create the block editor language files after translation. | 
`npm run packages-update` | Update packages                                              | Updates node_modules, package.json and package-lock.json


### Notes:
l10n is a process that automatically generates language files for:

    - UK English ( locale: en_GB )
    - bbboing ( a language used for testing, locale: bb_BB )

These `.po` files are processed using `msgfmt` to create the `.mo` files loaded at runtime to perform the localization of the PHP code.

The process for internationalization and localization is

1. Run `npm run dev` or `npm run build` to build the code.
2. Run `npm run makepot` to extract translatable strings.
3. Run `npm run l10n` to translate into UK English and bbboing.
4. Run `npm run makejson` to generate the translation files used in the editor.

Pre-requisites:

You need to have `npm` - Node Package Manager - installed.

For some basic instructions see the Build process section of [oik-blocks summary of blocks README](https://github.com/bobbingwide/oik-blocks/blob/master/src/README.md)

Many people run the `npm` command from the command line.

For `l10n` see [Internationalization for the oik suite of plugins](https://github.com/bobbingwide/oik-i18n)

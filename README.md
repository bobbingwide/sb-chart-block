# SB Chart block 
![banner](assets/sb-chart-block-banner-772x250.jpg)
* Contributors:      bobbingwide
* Tags:              block, Chart, Line, Bar, Horizontal bar, Pie, stacked
* Requires at least: 5.6.0
* Tested up to:      5.9.1
* Stable tag:        1.0.0
* Requires PHP:      7.2.0
* License:           GPL-2.0-or-later
* License URI:       https://www.gnu.org/licenses/gpl-2.0.html

Displays a Chart for CSV content.

## Description 
Use the Chart block ( oik-sb/chart ) to display a chart.

## Installation 

1. Upload the plugin files to the `/wp-content/plugins/sb-chart-block` directory, or install the plugin through the WordPress plugins screen directly.
1. Activate the plugin through the 'Plugins' screen in WordPress

OR

With WordPress 5.6 or Gutenberg 9.6.2 or higher, and the authority to install plugins:

1. In the block editor, open the block inserter.
1. Search for the block by typing 'Chart'.
1. Click on the 'Add block' button for the SB Chart block.
1. The SB Chart block plugin will be installed and activated.
1. And the block will be inserted into your content.

## Frequently Asked Questions 
# What types of chart can I display? 

So far...

- Line and stacked line, with optional fill
- Bar and stacked bar
- Horizontal bar and stacked horizontal bar
- Pie

# How do I choose the chart colors? 

There are 6 predefined color palettes:
choose the color palette from a drop down list.

# What options are there? 
Options to control the chart display are:

- Stacked - Toggle on to stack line or bar charts
- Begin Y axis at 0 toggle
- Fill toggle for line charts
- Time line toggle for a date based axis, with selectable Time unit (stepSize)
- Opacity - set the opacity of the background colours.
- Height of the chart, in pixels
- Bar thickness in pixels
- Tension - for curved line charts

# What Chart script does it use?  

v1.0.0 delivers [chartjs v3.7.1](https://github.com/chartjs/Chart.js/releases/tag/v3.7.1)
and [chartjs-adapter-date-fns v2.0.0](https://github.com/chartjs/chartjs-adapter-date-fns)

# What do I need to search for to find the block? 

Chart or SB Chart

# What if my first language is not English? 

If your first language is not English then you could try:

- French - graphique
- German - Diagramm
- Dutch - grafiek
- Italian - grafico
- Spanish - gráfico

# Do I need to build this block? 
No. The plugin is delivered with the production version of the block.
If you do wish to modify the code then you can find instructions in the src folder.

## Screenshots 
1. Line chart - Gutenberg theme colors
2. Bar chart - Chart theme colors
3. Horizontal bar chart - Tertiary theme colors
4. Pie chart - Visualizer theme colors
5. Chart type toolbar selection

## Upgrade Notice 
# 1.0.0 
Update for time line support and improved internationalization and localization.

# 0.4.1 
Upgrade for compatibility with Gutenberg 11.4.0 and above.

# 0.4.0 
Upgrade for an internationalized version compatible with the WordPress widget block editor.

# 0.3.0 
Further updates for hosting on WordPress.org. Now uses chartjs v3.1.0.

# 0.2.0 
Updated for hosting on WordPress.org. Improved color palette selection using palette.json.

# 0.1.1 
Update for better colours in the Gutenberg palette.

# 0.1.0 
Enqueues Chart.js in the footer to reduce render-blocking resources.

# 0.0.8 
Update for begin Y-axis at 0 toggle.

# 0.0.7 
Update for the chart type selection in the toolbar.

# 0.0.6 
Update for ability to set the chart height, in pixels

# 0.0.5 
Update for filled line charts - Area charts.

# 0.0.4 
Update for stacked charts.

# 0.0.3 
Update for the ability to control the height of each chart using CSS.

# 0.0.2 
Update for a version that works without oik shared library functions.

# 0.0.1 
First version to be used in Slog.

# 0.0.0 
Initial version copied from SB Children block

## Changelog 
# 1.0.0 
* Added: Add tension Range Control for Line charts #11
* Added: Add support for Time line on x-axis, with timeunit and barThickness #17
* Added: Support additional parameters for performance related charts #18
* Changed: Update to chartjs v3.7.1 #11
* Changed: Add chartjs-adapter-date-fns v2.0.0 #15
* Changed: Catch and report errors when using Time line #17
* Changed: Enable Time options for x or y axis #17
* Changed: Improve support for the chartjs shortcode for beginYAxisAt0 #15
* Changed: Reintroduced chartLine icon #14
* Changed: Improved internationalization and localization #13
* Tested: With WordPress 5.9.1
* Tested: With Gutenberg 12.6.0
* Tested: With PHP 8.0

# 0.4.1 
* Fixed: Chart block example doesn't show a chart #16
* Tested: With Gutenberg 11.6.0

# 0.4.0 
* Changed: Attempt to deal with deprecated blocks #13
* Changed: Refactored to use apiVersion: 2 #13
* Changed: Replace chartLine icon by trendingUp #14
* Fixed: Ensure stacked and beginAtZero are true / false #15
* Fixed: Remove some unnecessary code in sb_chart_block_shortcode #12
* Tested: With Gutenberg 11.5.1
* Tested: With PHP 8.0
* Tested: With WordPress 5.8.1 and WordPress Multi Site

# 0.3.0 
* Changed: Added language files,https://github.com/bobbingwide/sb-chart-block/issues/10
* Changed: Remove redundant / unwanted logic,https://github.com/bobbingwide/sb-chart-block/issues/10
* Changed: Improve color palettes and selection,https://github.com/bobbingwide/sb-chart-block/issues/2
* Changed: Upgrade to use chartjs v3.1.0,https://github.com/bobbingwide/sb-chart-block/issues/11
* Changed: Add opacity with range from 0 to 1 for chart background colours,https://github.com/bobbingwide/sb-chart-block/issues/2
* Changed: Refactor Color_Palettes to SB_Chart_Color_Palettes,https://github.com/bobbingwide/sb-chart-block/issues/10
* Tested: With WordPress 5.7.1 and WordPress Multi Site
* Tested: With Gutenberg 10.4.0
* Tested: With PHP 8.0
* Tested: With PHPUnit 9

# 0.2.0 
* Changed: Enqueue scripts from the plugin,https://github.com/bobbingwide/sb-chart-block/issues/10
* Changed: Load color palettes from palettes.json,https://github.com/bobbingwide/sb-chart-block/issues/10
* Tested: With WordPress 5.7 and WordPress Multi Site
* Tested: With Gutenberg 10.3.1
* Tested: With PHP 8.0
* Tested: With PHPUnit 9

# 0.1.1 
* Changed: Eliminate very light gray and white from the Gutenberg colour palette. Add yellowish grey.,https://github.com/bobbingwide/sb-chart-block/issues/2
* Tested: With WordPress 5.6.1 and WordPress Multi Site
* Tested: With Gutenberg 9.9.2

# 0.1.0 
* Changed: Enqueue chart.js in the footer, when necessary. Run Chart when DOMContentLoaded.,https://github.com/bobbingwide/sb-chart-block/issues/9

# 0.0.8 
* Added: Begin Y-axis at 0 toggle.
* Changed: Option toggle arrangement
* Tested: With Gutenberg 9.8.0

# 0.0.7 
* Added: Chart type toolbar group and new icons,https://github.com/bobbingwide/sb-chart-block/issues/5
* Added: Example - a simple pie chart,https://github.com/bobbingwide/sb-chart-block/issues/5

# 0.0.6 
* Added: Height range control. Default 450px in the editor.,https://github.com/bobbingwide/sb-chart-block/issues/5

# 0.0.5 
* Added: Toggle to Fill line charts,https://github.com/bobbingwide/sb-chart-block/issues/5

# 0.0.4 
* Added: Toggle to Stack charts,https://github.com/bobbingwide/sb-chart-block/issues/5

# 0.0.3 
* Fixed: Support setting of the chart height using CSS,https://github.com/bobbingwide/sb-chart-block/issues/5

# 0.0.2 
* Fixed: Remove dependency on oik related shared library functions,https://github.com/bobbingwide/sb-chart-block/issues/1

# 0.0.1 
* Added: Server Side Rendered charts using Chart.js,https://github.com/bobbingwide/sb-chart-block/issues/1
* Added: 4 theme options for chart colors,https://github.com/bobbingwide/sb-chart-block/issues/2
* Added: Chart block in the block editor,https://github.com/bobbingwide/sb-chart-block/issues/4
* Tested: With WordPress 5.6.0 and WordPress Multi Site
* Tested: With Gutenberg 9.7.2

# 0.0.0 
* First version copied from SB Children block

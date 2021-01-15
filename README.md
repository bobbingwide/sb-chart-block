# SB Chart block 
![banner](https://raw.githubusercontent.com/bobbingwide/sb-chart-block/main/assets/sb-chart-block-banner-772x250.jpg)
* Contributors:      bobbingwide
* Tags:              block, Chart, Line, Bar, Pie
* Requires at least: 5.6.0
* Tested up to:      5.6.0
* Stable tag:        0.0.1
* Requires PHP:      7.2.0
* License:           GPL-2.0-or-later
* License URI:       https://www.gnu.org/licenses/gpl-2.0.html

Display a Chart from CSV data.

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

- Line
- Bar
- Horizontal Bar
- Pie

# How do I choose the chart colors? 

There are 4 predefined color themes:
choose the color from a drop down list

# What options are there? 
Options to control the chart display are to be added.


# What Chart script does it use?  

chartjs - from chartjs.org

v0.1.0 enqueues the script from
https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.9.4/Chart.min.js?ver=5.6



# What do I need to search for to find the block? 

Chart ?

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
3. Horizontal bar chart - Chartist theme colors
4. Pie chart - Visualizer theme colors

## Upgrade Notice 
# 0.0.1 
First version to be used in Slog.

# 0.0.0 
Initial version copied from SB Children block

## Changelog 
# 0.0.1 
* Added: Server Side Rendered charts using Chart.js,https://github.com/bobbingwide/sb-chart-block/issues/1
* Added: 4 theme options for chart colors,https://github.com/bobbingwide/sb-chart-block/issues/2
* Added: Chart block in the block editor,https://github.com/bobbingwide/sb-chart-block/issues/4
* Tested: With WordPress 5.6.0 and WordPress Multi Site
* Tested: With Gutenberg 9.7.2

# 0.0.0 
* First version copied from SB Children block


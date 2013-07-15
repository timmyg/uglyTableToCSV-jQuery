## Documentation

### uglyTableToCSV-jQuery

Columnizer will add CSS classes to the columns it creates. Each column will have a "column" classname. The first column will have "first" and last column will have "last". This lets you target specific columns in your CSS markup more easily.
uglyTableToCSV-jQuery will allow one to provide a CSV download link for a variety of table structures.

### Options

<table style="width: 100%; border: 1px solid #000000; margin-bottom: 25px;" border="1" cellspacing="0" cellpadding="3">
<tbody>
<tr>
<th style="width: 200px; background-color: #6690bc;" align="center" valign="middle"><span style="color: #ffffff;">Option Name</span></th>
<th style="background-color: #6690bc;" align="center" valign="middle"><span style="color: #ffffff;">Purpose</span></th>
</tr>
<tr>
<td style="text-align: right; padding-right: 10px;"><em>tableHeadersSelector</em></td>
<td style="padding-left: 10px;">CSS/jQuery selector for selecting table header row (assuming already inside table element)</td>
</tr>
<tr>
<td style="text-align: right; padding-right: 10px;"><em>columnsSliceRanges</em></td>
<td style="padding-left: 10px;">slicing columns if some columns are unwanted; if you want to skip the second column in a four column table, value would be '0-1;2-4'</td>
</tr>
<tr>
<td style="text-align: right; padding-right: 10px;"><em>tableRowsSelector</em></td>
<td style="padding-left: 10px;">CSS/jQuery selector for selecting all tables (assuming already inside table element).  Should end with 'tr'</td>
</tr>
<tr>
<td style="text-align: right; padding-right: 10px;"><em>columnNames (optional)</em></td>
<td style="padding-left: 10px;">If you would like different column names in the csv, enter them here comma-separated.  Must contain all columns or exact number of column in columnsSliceRanges</td>
</tr>
<tr>
<td style="text-align: right; padding-right: 10px;"><em>customFileName (optional)</em></td>
<td style="padding-left: 10px;">Download filename</td>
</tr>

</tbody>
</table>


### Use
<pre>
<code>
$(document).ready(function(){
    $('table#sample-table').uglyTableToCSV({
	    'tableHeadersSelector':'thead tr:first', //only get the first table tow as the second tr contains worthless headers
	    'columnsSliceRanges':'0-1;2-4',//get 1st, 3rd, 4th columns (by index)
	    'tableRowsSelector':'tbody tr',//data rows selector
	    'columnNames':'Color-customname, Shape-CustomName, Price-CuStoMnAmE',
	    'customFileName': 'sampleCSV.csv' 
	});	
});
</code>
</pre>
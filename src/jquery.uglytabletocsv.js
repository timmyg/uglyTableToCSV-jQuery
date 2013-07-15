(function($){
    $.UglyTableToCSV = function(el, options, undefined){
        // To avoid scope issues, use 'base' instead of 'this'
        // to reference this class from internal events and functions.
        var base = this;
        
        // Access to jQuery and DOM versions of element
        base.$el = $(el);
        base.el = el;
        
        // Add a reverse reference to the DOM object
        base.$el.data("UglyTableToCSV", base);
        
        base.init = function(){
            base.options = $.extend({},$.UglyTableToCSV.defaultOptions, options);
        };
        
        base.createCSV = function(paramaters){

            //TODO validate stuff
            var csvStr = "";
            var csvComma = "%2C";
            var csvNewline = "%0A";
            var bSplitColumns = base.options.columnsSliceRanges != undefined;
            var rangesArrArr = new Array();

            //Slice stuff
            
            //POPULATE HEADERS
            if(base.options.columnNames != undefined){
                csvStr =  base.options.columnNames;
                if(bSplitColumns){
                    var ranges = base.options.columnsSliceRanges.split(";");
                    for (var i=0;i<ranges.length;i++){ 
                        rangesArrArr.push(ranges[i].split("-"));
                    }  
                }else{
                    var numColumns = base.options.columnNames.split(",").length;
                    rangesArrArr.push(new Array(0, numColumns));
                }
            }else{
                if(bSplitColumns){
                    var ranges = base.options.columnsSliceRanges.split(";");
                    for (var i=0;i<ranges.length;i++){ 
                        rangesArrArr.push(ranges[i].split("-"));
                    }

                }else{
                    var numColumns = $(base.$el.find(base.options.tableHeadersSelector + " th")).length;
                    rangesArrArr.push(new Array(0, numColumns));
                }
               

                for (var i=0;i<rangesArrArr.length;i++){ 
                    $.each( base.$el.find(base.options.tableHeadersSelector + " th").slice(rangesArrArr[i][0],rangesArrArr[i][1]), function(){
                        csvStr+=$(this).text() + csvComma;
                    });
                }
            }
            csvStr+=csvNewline;

            //POPULATE VALUE ROWS
            var txt ;
            $.each( base.$el.find(base.options.tableRowsSelector), function(){
                //this is inside each row
                for (var i=0;i<rangesArrArr.length;i++){ 
                    $.each( $(this).find("td").slice(rangesArrArr[i][0],rangesArrArr[i][1]), function(){
                        //this is inside each data value
                        txt = "";
                        txt = $(this).text();
                        if(txt==="" || txt===undefined)txt=$(this).children().attr("value");
                        if(txt != undefined)txt = txt.replace(/,/g,'%20');
                        if(txt === undefined)txt = "";
                        csvStr+=txt + csvComma;
                    });
                }
                csvStr+=csvNewline;
            });

            csvStr = csvStr.replace(/ /g,'%20');
            
            //create download link
            var $button =  $("<a download=\""+base.options.customFileName+"\" href=\"data:application/csv;charset=utf-8,"+csvStr+"\"><input value=\"Download CSV\" class=\"downloadCSV\" type=\"button\"></a>");
            
            if($('.downloadCSV').length > 0){
                $('.downloadCSV').remove();
            }
            $button.insertAfter(base.$el);
        };
        
        // Run initializer
        base.init();

        //create CSV
        base.createCSV();
    };
    
    //default options if not passed in
    $.UglyTableToCSV.defaultOptions = {
        tableHeadersSelector: 'thead th',
        columnsSliceRanges: undefined,
        tableRowsSelector: 'tbody tr', //the TR's that have the data
        customFileName : 'uglyTableToCSVdownload.csv',
        columnNames: undefined //requires columnsSliceRanges
    };
    
    $.fn.uglyTableToCSV = function(options){
        return this.each(function(){
            (new $.UglyTableToCSV(this, options));
        });
    };
    
})(jQuery);

function jsGrid() {

	this.generate = function(config,id){
		console.log("Test Success");
		id.innerHTML =  generateTableHTML(config);
	}

	generateHeaderHTML = function(config) {
		var heading = "";
		len=config.column_def.length;
		for(i=0;i<len;i++) {
			heading+="<th id='"+ config.column_def[i].column_name +"_header'>" + config.column_def[i].column_name + "</th>"; 
		}
		if(config.button_config.consolidateAction){
			if('consolidateAttribute' in config.button_config){
				heading="<th><input type='checkbox' id='allSelect'></th>"+heading;
			}
		}
		heading = "<thead id='tHeading'><tr>" + heading + "</tr></thead>";
		return heading;
	}

	generateTableBodyHTML = function(config) {
		var rowStr = "";
		for(i=0;i<config.data.length;i++) {
			var row = "";
			for(j=0;j<config.column_def.length;j++) {
				if('cssClass' in config.column_def[j]){
					row = row + "<td id='cell" + (i+1) + (j+1) + "' class='"+config.column_def[j].cssClass+"'>" + config.data[i][j] +"</td>";	
				}
				else if('formatter' in config.column_def[j]){
					row = row + "<td id='cell" + (i+1) + (j+1) + "'><a href='"+ config.column_def[j].formatter +"'>" + config.data[i][j] +"</a></td>";	
				}
				else{
					row = row + "<td id='cell" + (i+1) + (j+1) + "'>" + config.data[i][j] +"</td>";	
				}
				console.log(row);
			}
			row = generateConsolidation(config)+row;
			rowStr = rowStr + "<tr id='row"+ (i+1) + "'>" + row + "</tr>";
		}
		return "<tbody id='tBody'>" + rowStr + "</tbody>";
	}

	generateTableHTML = function(config) {
		return "<div class='table-responsive'><table id='jsTable' class='table table-condensed table-bordered table-hover'>" + generateHeaderHTML(config) + generateTableBodyHTML(config) + "</table>";
	}

	generateButtonHTML = function(config) {
		var buttonColHTML = "";
		for(i=0;i<config.button_config.length;i++) {
			buttonColHTML += "<td id='" + config.button_config[i].button_id + "'>" + config.button_config[i].button_name + "</td>";
		}
		return buttonColHTML;
	}
	
	generateConsolidation = function(config) {
		var consolidation = "";
		if(config.button_config.consolidateAction){
			if('consolidateAttribute' in config.button_config){
				consolidation+="<td class='gridCheckBox'><input type='checkbox'></td>";
			}
		}
		return consolidation;
	}
}

var GRID_GEN = new jsGrid();
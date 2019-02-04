import {Pipe, PipeTransform} from '@angular/core';

declare var showdown: any;
declare var document: any;

var wrapper= document.createElement('div');
var div= wrapper.firstChild;

var converter = new showdown.Converter({
	tables: true,
	tablesHeaderId: true,
	tasklists: true,
	smoothLivePreview: true
});

@Pipe({name: 'markdown'})
export class MarkdownPipe implements PipeTransform {
  transform(value:string) : string {

  	var html;
  	var whiteListElements = ['TABLE', 'DIV', 'P', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6'];
  	var blackListElements = [''];
  	var whiteListAttributes = [''];
  	var elementsPendingRemoval = [];

  	try {
  		html = converter.makeHtml(value);
  	} catch(e) {
  		console.log(">>>>An error occurred while trying to parse markup.");
  		html = "(Did you create a table?  Be sure you have an extra line after each table)";
  		return html;
  	}

    //create a parent dom element for traversal
    var parent = document.createElement('div');
    parent.innerHTML=html;

  	for (var i=0, max=parent.length; i < max; i++) {
  	     console.log("Element:", parent[i].nodeName);

  	     //add to pending removal items not part of whitelist
  	     if(whiteListElements.indexOf(all[i].nodeName) == -1) {
  	     	//then element is not part of whiteList
  	     	elementsPendingRemoval.push(all[i]);
  	     	console.log("Elements for Removal: " + elementsPendingRemoval.length);
  	     	continue;
  	     }

  	     //force classname to 'table' (lowercase) for table elements (conform with bootstrap markdown)
  	     //or, alternatively, add to stylesheet later (same as bootstrap)
  	     if(parent[i].nodeName == "TABLE") parent[i].className = 'table';

  	  //traverse each element's attribute
  	  var nodes=[], values=[];
  		for (var att, j = 0, atts = parent[i].attributes, n = atts.length; j < n; j++){
  		    att = atts[j];
  		    nodes.push(att.nodeName);
  		    values.push(att.nodeValue);
  		    console.log("pushed:" + att.nodeName);
  		} 
  	}

	return parent.innerHTML;
  }
}
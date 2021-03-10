"use strict";

//simple JSON sorter.

function natural_compare(a, b){
  var ax=[], bx=[];
  
  if("function" === typeof natural_compare.extraction_rule){  //sometimes comparing the whole line isn't useful.
    a = natural_compare.extraction_rule(a);
    b = natural_compare.extraction_rule(b);
  }
  
  a.replace(/(\d+)|(\D+)/g, function(_, $1, $2){ ax.push([$1 || Infinity, $2 || ""]); });
  b.replace(/(\d+)|(\D+)/g, function(_, $1, $2){ bx.push([$1 || Infinity, $2 || ""]); });

  while(ax.length > 0 && bx.length > 0){
    var an, bn, nn;
    
    an = ax.shift();
    bn = bx.shift();
    nn = (an[0] - bn[0]) || an[1].localeCompare(bn[1]);
    if(nn) return nn;
  }
  return ax.length - bx.length;
}


const FS                = require("fs")
     ,PATH              = require("path")
     ,resolve           = function(path){
                            path = path.replace(/\"/g,"");
                            path = path.replace(/\\+/g,"/");
                            path = PATH.resolve(path); 
                            path = path.replace(/\\+/g,"/"); 
                            path = path.replace(/\/\/+/g,"/"); 
                            return path;
                          }
     ,ARGS              = process.argv.filter(function(s){return false === /node\.exe/i.test(s) && false === /index\.js/i.test(s);}).map(function(s){return s.replace(/\"/gm,"");})
     ,FILE_IN           = resolve(ARGS[0])
     ,FILE_IN_PARTS     = PATH.parse(FILE_IN)
     ,FILE_OUT          = resolve(
                            FILE_IN_PARTS.dir  
                          + "/" 
                          + FILE_IN_PARTS.name 
                          + "_sorted"
                          + FILE_IN_PARTS.ext
                          )
     ,CONTENT           = FS.readFileSync(FILE_IN, {encoding:"utf8"})
     ,JSON_OBJECT       = JSON.parse(CONTENT)
     ,SORTED_KEYS       = Object.keys(JSON_OBJECT).sort(natural_compare)
     ,SORTED_JSON_OBJECT= (function(){
                            var SORTED_JSON_OBJECT = new Object(null);
                            SORTED_KEYS.forEach(function(key){
                                                  SORTED_JSON_OBJECT[key] = JSON_OBJECT[key];
                                                });
                            return SORTED_JSON_OBJECT;
                          }())
    ,MAX_LENGTH_LINE    = SORTED_KEYS.reduce(function(carry,current){return Math.max(carry,current.length);},0)
    ,OUTPUT             = (function(){
                             var OUTPUT;
                             
                             OUTPUT = JSON.stringify(SORTED_JSON_OBJECT, null, 2)
                                          .replace(/,[\r\n] /g, "\r\n ,").replace(/ *(,( +))/g,"$2,") //comma-first
                                          ;
                             OUTPUT = OUTPUT.replace(/^([\s\,]*)\"(.+)\"\:\ (.*)$/gm
                                                    ,function(_, group1, group2, group3){
                                                       return group1 + "\"" + group2 + "\"" + (new Array(MAX_LENGTH_LINE - group2.length + 1 + 1)).join(" ") + ": " + group3;  //line-up value
                                                    });
                             OUTPUT = OUTPUT.replace(/\r+/gm, "").replace(/\n/gm, "\r\n"); //normalize to Windows-EOL.
                             return OUTPUT;
                          }())
    ;

FS.writeFileSync(FILE_OUT, OUTPUT, {flag:"w", encoding:"utf8"});

process.exitCode=0;
process.exit();
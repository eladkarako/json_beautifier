designed to work for simple JSON-files, with a single-line-value.

read '.json' file-content into a JSON-object,  
sort JSON by first-layer keys, using a natural-sort algorithm,  
stringify JSON to text, indent by two spaces,  
restyle using comma-first style-directive.
restyle the line-up the values (after ': ') using the longest first-layer key length + 1,  
writes the output as a Windows-EOL file with '_sorted' appended as a suffix to the filename (same extension).

program can be used directly with node in any OS, it has no dependencies (but node binary).
you don't need extra libs for node, and a stand-along version is perfectly fine, 
this program provided with node.exe for x86 (for extra compatibility) from: 
https://nodejs.org/download/nightly/v9.8.1-nightly20180308fed51b3a15/win-x86/node.exe  
and it is compressed with <a href="https://upx.github.io/">UPX</a> from 17.70MB to 5.68MB.  
if your anti-virus making you hard-time, just use your own version of node or download a single exe (Windows) from https://nodejs.org/download/nightly  

=-=-=-=-=

standard sorting: 1<10<2<20  
natural sorting:  1<2<10<20  

normalizing JSON-files with sorting helps you compare their content easily afterwards.
note: the sorting is done when the JSON is in its OBJECT form, and only consider first layer "keys".  

=-=-=-=-=-=-=

values are "pushed" to the right,  
so they are all lined up,  
it depends by the longest first-layer "key" string-length.
it makes structure more easily viewable, keys and values are both have their own visual-"column".  

=-=-=-=-=-=-=-=-=-=-=
comma-first makes sure you don't forget to write a comma at the end of each line,  
it also keeps the JSON-values as visually clean as possible from syntax,  
making key-combinations such as selections with <kbd>SHIFT</kbd>+<kbd>END</kbd> 
(selection from a point to the end of the line) easier to use for deleting or maintaining the data, 
without need to remember to add to remove a comma from the end.

=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

Feel free to implement recursion to provide multi-layer beautification and alignment,  
see for example one of my Chrome web-extensions <a href="https://raw.githubusercontent.com/eladkarako/chrome_extensions/store/API-Killer-Beacon/manifest.json">manifest.json</a>,  
altough it is not suitable for this program.  

I've created this program to help me normalize (sort) and align smaller JSON-files such as the ones in  
https://raw.githubusercontent.com/eladkarako/jsbeautifier/master/js/config/defaults.json  

original:  

```json
{
    "indent_size": 4,
    "indent_char": " ",
    "indent_level": 0,
    "indent_with_tabs": false,
    "preserve_newlines": true,
    "max_preserve_newlines": 10,
    "jslint_happy": false,
    "space_after_anon_function": false,
    "brace_style": "collapse",
    "keep_array_indentation": false,
    "keep_function_indentation": false,
    "space_before_conditional": true,
    "break_chained_methods": false,
    "eval_code": false,
    "unescape_strings": false,
    "wrap_line_length": 0
}
```

(background) middle-result (natural-sort):  

```json
{
 "brace_style": "collapse",
 "break_chained_methods": false,
 "eval_code": false,
 "indent_char": " ",
 "indent_level": 0,
 "indent_size": 4,
 "indent_with_tabs": false,
 "jslint_happy": false,
 "keep_array_indentation": false,
 "keep_function_indentation": false,
 "max_preserve_newlines": 10,
 "preserve_newlines": true,
 "space_after_anon_function": false,
 "space_before_conditional": true,
 "unescape_strings": false,
 "wrap_line_length": 0
}
```

(background) middle-result (comma-first):  

```json
{
  "brace_style": "collapse"
 ,"break_chained_methods": false
 ,"eval_code": false
 ,"indent_char": " "
 ,"indent_level": 0
 ,"indent_size": 4
 ,"indent_with_tabs": false
 ,"jslint_happy": false
 ,"keep_array_indentation": false
 ,"keep_function_indentation": false
 ,"max_preserve_newlines": 10
 ,"preserve_newlines": true
 ,"space_after_anon_function": false
 ,"space_before_conditional": true
 ,"unescape_strings": false
 ,"wrap_line_length": 0
}
```

final result (aligning the value, depanding on longest-first-layer-key):  

```json
{
  "brace_style"               : "collapse"
 ,"break_chained_methods"     : false
 ,"eval_code"                 : false
 ,"indent_char"               : " "
 ,"indent_level"              : 0
 ,"indent_size"               : 4
 ,"indent_with_tabs"          : false
 ,"jslint_happy"              : false
 ,"keep_array_indentation"    : false
 ,"keep_function_indentation" : false
 ,"max_preserve_newlines"     : 10
 ,"preserve_newlines"         : true
 ,"space_after_anon_function" : false
 ,"space_before_conditional"  : true
 ,"unescape_strings"          : false
 ,"wrap_line_length"          : 0
}
```

<hr/>
<hr/>

now I want to provid my own defaults for https://jsbeautifier.eladkarako.com/  
so I tweak the controls below, and it generates a new settings, 
my initial JSON-content is:  

```json
{
  "indent_size": "2",
  "indent_char": " ",
  "max_preserve_newlines": "-1",
  "preserve_newlines": false,
  "keep_array_indentation": false,
  "break_chained_methods": true,
  "indent_scripts": "normal",
  "brace_style": "collapse",
  "space_before_conditional": true,
  "unescape_strings": true,
  "jslint_happy": true,
  "end_with_newline": true,
  "wrap_line_length": "0",
  "indent_inner_html": true,
  "comma_first": true,
  "e4x": true
}
```

and after sorting/beautifying/normalizing it:  

```json
{
  "brace_style"              : "collapse"
 ,"break_chained_methods"    : true
 ,"comma_first"              : true
 ,"e4x"                      : true
 ,"end_with_newline"         : true
 ,"indent_char"              : " "
 ,"indent_inner_html"        : true
 ,"indent_scripts"           : "normal"
 ,"indent_size"              : "2"
 ,"jslint_happy"             : true
 ,"keep_array_indentation"   : false
 ,"max_preserve_newlines"    : "-1"
 ,"preserve_newlines"        : false
 ,"space_before_conditional" : true
 ,"unescape_strings"         : true
 ,"wrap_line_length"         : "0"
}
```

Now I can easily do a little diff. to see what has being changed,  
it will be easier to compare since all lines places are sorted ("normalized"),  
and in this case the lines (should) all be the same as well...

<hr/>

I am providing the node.exe compressed in a zip, to prevent making people download exe files. just uncompress.  

<hr/>

this is where I've noticed that a lot of lines are missing (default value false not specified..) in the original JSON,  
and I want to normalize them both to be in the same order, size, etc...

finally:  
<pre>
1  {                                          =  1  {
2    "brace_style"               : "collapse"    2    "brace_style"               : "collapse"
------------------------------------------------------------------------
3   ,"break_chained_methods"     : false      <> 3   ,"break_chained_methods"     : true
4   ,"comma_first"               : false         4   ,"comma_first"               : true
5   ,"e4x"                       : false         5   ,"e4x"                       : true
6   ,"end_with_newline"          : false         6   ,"end_with_newline"          : true
7   ,"eval_code"                 : false         7   ,"eval_code"                 : true
------------------------------------------------------------------------
8   ,"indent_char"               : " "        =  8   ,"indent_char"               : " "
------------------------------------------------------------------------
9   ,"indent_inner_html"         : false      <> 9   ,"indent_inner_html"         : true
------------------------------------------------------------------------
10  ,"indent_level"              : 0          =  10  ,"indent_level"              : 0
------------------------------------------------------------------------
11  ,"indent_scripts"            : "keep"     <> 11  ,"indent_scripts"            : "normal"
12  ,"indent_size"               : 4             12  ,"indent_size"               : 2
------------------------------------------------------------------------
13  ,"indent_with_tabs"          : false      =  13  ,"indent_with_tabs"          : false
------------------------------------------------------------------------
14  ,"jslint_happy"              : false      <> 14  ,"jslint_happy"              : true
------------------------------------------------------------------------
15  ,"keep_array_indentation"    : false      =  15  ,"keep_array_indentation"    : false
16  ,"keep_function_indentation" : false         16  ,"keep_function_indentation" : false
------------------------------------------------------------------------
17  ,"max_preserve_newlines"     : 10         <> 17  ,"max_preserve_newlines"     : -1
18  ,"preserve_newlines"         : true          18  ,"preserve_newlines"         : false
------------------------------------------------------------------------
19  ,"space_after_anon_function" : false      =  19  ,"space_after_anon_function" : false
20  ,"space_before_conditional"  : true          20  ,"space_before_conditional"  : true
------------------------------------------------------------------------
21  ,"unescape_strings"          : false      <> 21  ,"unescape_strings"          : true
------------------------------------------------------------------------
22  ,"wrap_line_length"          : 0          =  22  ,"wrap_line_length"          : 0
23 }                                             23 }
------------------------------------------------------------------------
</pre>

<hr/>

you can download the whole thing with <a href="https://github.com/eladkarako/json_beautifier/archive/master.zip">https://github.com/eladkarako/json_beautifier/archive/master.zip</a>, and uncompress the <code>node.exe.zip</code> if you want to using your own unzip method, windows has native supports for that, and for linux and such you can try google-search how to unzip...

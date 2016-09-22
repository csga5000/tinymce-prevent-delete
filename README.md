# tinymce-prevent-delete
This is meant to work with tinymce's noneditable plugin and will prevent the deletion of non-editable elements

I made it for my own purposes, but since it took a lot of time and messing with to get working I figured I'd share it.  That being said it may not work for you if you're not using it in a similar way to me.  I've tested it's functionality on tinymce version 4.4.1.

## Usage

If your project is using git then use "git submodule add \<this repository url\> \<relative path\>".

If not, then use git clone "git clone \<this repo url\>".

Or if you want to feel free to just save the file by your own means.

index.html
```html
...
<script src="preventdelete.js"></script>
...
```
somefile.js
```javascript
tinymce.init({
	...
	plugins: ["noneditable","preventdelete"]
	...
})
```

NOTE!  You must have a element with id="document_root" in your tinymce's text content.  (If this is impossible, you could probably easily adjust my code, check out lines 96 and 111 of preventdelete.js.  This is meant to prevent my code from traversing too far up the dom.

###JSFiddle:

https://jsfiddle.net/5a5p5vz7/

```html
<div id="document_root">
	<p><strong class="mceNonEditable">Some field: </strong>&nbsp;</p>
	<p><strong class="mceNonEditable">Another one: </strong>&nbsp;</p>
	<p><strong class="mceNonEditable">This field is like the others, but has better grain: </strong>&nbsp;</p>
	<p><strong class="mceNonEditable">yeah this grain is super golden: </strong>&nbsp;</p>
</div>
```

###Last note:
I added a function to the array prototype.  Array.prototype.contains, which means if something else does the same and the function does not act the same then one of the programs may break.

If it's not working for you consider formatting your tinymce editor's content to look more like this:

#Legal stuff:
Use my preventdelete plugin for whatever you like.  Modify it however you like.  I'm not responsible for what you do with it and I give no assurances of it's quality or functionality.

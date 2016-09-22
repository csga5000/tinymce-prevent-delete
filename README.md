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

IF you're having issues, you may beable to get it to work better by formatting your data like this:

```html
<div id="document_root">
	<p><strong class="mceNonEditable">Some field: </strong>&nbsp;</p>
	<p><strong class="mceNonEditable">Another one: </strong>&nbsp;</p>
	<p><strong class="mceNonEditable">This field is like the others, but has better grain: </strong>&nbsp;</p>
	<p><strong class="mceNonEditable">yeah this grain is super golden: </strong>&nbsp;</p>
</div>
```

If you're still having issues, report one here, or dive into the code yourself, and try to fix it.  If you to make a pull request once you do.

###JSFiddle:

https://jsfiddle.net/5a5p5vz7/

### Known Flaws
  - Pushing ctrl/alt backspace/delete will not do anything if the code determines that it will remove non-removable code.  I have not fixed this because I don't know an easy way to change what will be deleted or to delete text manually without changing the cursor location.  
  - I believe there are some odd cases where you can still delete non-deletable things.  I do intend to address this one at some point.
  
Feel free to fix any flaws yourself and submit a pull request.  The code isn't THAT complicated and I annotated it well enough.  I don't know of a better alternative for you if you wish to mimic this functionality.


###Last note:
I added a function to the array prototype.  Array.prototype.contains, which means if something else does the same and the function does not act the same then one of the programs may break.

If it's not working for you consider formatting your tinymce editor's content to look more like this:

#Legal stuff:
Use my preventdelete plugin for whatever you like.  Modify it however you like.  I'm not responsible for what you do with it and I give no assurances of it's quality or functionality.

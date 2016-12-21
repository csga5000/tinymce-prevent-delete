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

If you're still having issues, report one here, or dive into the code yourself, and try to fix it.  If you to make a pull request once you do.

###JSFiddle:

https://jsfiddle.net/5a5p5vz7/

### Known Flaws
  - Pushing ctrl/alt backspace/delete will not do anything if the code determines that it will remove non-removable code.  I have not fixed this because I don't know an easy way to change what will be deleted or to delete text manually without changing the cursor location.  
  - I believe there are some odd cases where you can still delete non-deletable things.  I do intend to address this one at some point.
  
Feel free to fix any flaws yourself and submit a pull request.  The code isn't THAT complicated and I annotated it well enough.

### Why use this library?
There's no real better alternatives I know of if you need this functionality.  If you have changes, you can edit my code.  If you want to tackle the issue yourself, let me know if you come up with something better.  I'll do my best to be active if you have issues or pull requests, though I may take a few days to address things.


###Last note:
I added a function to the array prototype.  Array.prototype.contains, which means if something else does the same and the function does not act the same then one of the programs may break.

#License:
The project is licensed under the AGPLv3+.


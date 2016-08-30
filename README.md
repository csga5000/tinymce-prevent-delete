# tinymce-prevent-delete
This is meant to work with tinymce's noneditable plugin and will prevent the deletion of non-editable elements

I made it for my own purposes, but since it took a lot of time and messing with to get working I figured I'd share it.  That being said it may not work for you.

## Usage
index.html
```html
<script src="preventdelete.js"></script>
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

If it's not working for you consider formatting your tinymce editor's content to look more like this:

```html
<div id="document_root">
	<p><strong class="mceNonEditable">Some field: </strong>&nbsp;</p>
	<p><strong class="mceNonEditable">Another one: </strong>&nbsp;</p>
	<p><strong class="mceNonEditable">This field is like the others, but has better grain: </strong>&nbsp;</p>
	<p><strong class="mceNonEditable">yeah this grain is super golden: </strong>&nbsp;</p>
</div>
```

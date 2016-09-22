(function() {
	Array.prototype.contains = function (e) {
		return this.indexOf(e) > -1
	}

	function PreventDelete() {
		var self = this

		function r(val, min, max) {
			return val >= min && val <= max
		}

		this.keyWillDelete = function(evt) {
			/*
			In trying to figure out how to detect if a key was relevant, I appended all the keycodes for keys on my keyboard that would "delete" selected text, and sorted.  Generated the range blow:
			Deleting
			8, 9, 13, 46, 48-57, 65-90, 96-111, 186-192, 219-222

			I did the same thign with keys that wouldn't and got these below
			Not harmful
			16-19, 27, 33-40, 45, 91-93, 112-123, 144

			You should note, since it's onkeydown it doesn't change the code if you have alt or ctrl or something pressed.  It makes it fewer keycombos actually.

			I'm pretty sure in these "deleting" keys will still "delete" if shift is held
			*/

			if (evt.ctrlKey || evt.altKey)
				return evt.key == 'x'

			var c = evt.keyCode

			return [8, 9, 13, 46].arrayContains(c) || r(c, 48, 57) || r(c, 65, 90) || r(c, 96, 111) || r(c, 186, 192) || r(c, 219, 222)

		}
		this.cancelKey = function(evt) {
			evt.preventDefault()
			evt.stopPropagation()
			return false
		}
		this.check = function(node) {
			return node.classList && (node.classList.arrayContains("mceNonEditable") || self.checkChildren(node))
		}
		this.checkChildren = function(node) {
			if (!node)
				return true

			var children = node.childNodes
			var hasClass = false

			for (var i = 0; i < children.length && !hasClass; i++) {
				var cnode = children[i]

				hasClass = cnode.classList && (cnode.classList.arrayContains("mceNonEditable") || self.checkChildren(cnode))
			}

			return hasClass
		}

		tinymce.PluginManager.add('preventdelete', function(ed, link) {
			ed.on('keydown', function(evt) {
				var range = tinymce.activeEditor.selection.getRng()

				if (!self.keyWillDelete(evt))
					return true;

				var back = evt.keyCode == 8
				var del = evt.keyCode == 46

				var conNoEdit = (range.endContainer.classList && range.endContainer.classList.arrayContains('mceNonEditable')) || self.checkChildren(range.endContainer)

				var delin = del && range.endContainer.data && (range.endOffset+(range.endContainer.data.charCodeAt(0) === 65279)) < (range.endContainer.data || "").length
				var backin = back && range.startContainer.data && range.startOffset > (range.startContainer.data.charCodeAt(0) === 65279);

				if (delin || backin) {
					return conNoEdit ? self.cancelKey(evt) : true
				}

				if (del && range.startOffset === range.endOffset && (range.startOffset+1) < range.endContainer.childElementCount) {
					var elem = range.endContainer.childNodes[range.startOffset+1]
					return self.check(elem) ? self.cancelKey(evt) : true
				}

				//The range is within this container
				if (range.startOffset !== range.endOffset) {

					//If this container is non-editable, cancel the event, otherwise allow the event
					return conNoEdit ? self.cancelKey(evt) : true
				}

				//This is not a selection, so the keypress is directional

				if (del) {
					var cont = range.endContainer
					var next = cont.nextSibling

					while (!next) {
						cont = cont.parentElement

						if (cont.id === 'document_root')
							return self.cancelKey(evt)

						next = cont.nextSibling
					}

					if (self.checkChildren(next) || (next.classList && next.classList.arrayContains("mceNonEditable")))
						return self.cancelKey(evt)
				}
				if (back) {
					var cont = range.startContainer
					var prev = cont.previousSibling
					while (!prev) {
						cont = cont.parentElement

						if (cont.id === 'document_root')
							return self.cancelKey(evt)

						prev = cont.previousSibling
					}

					if (self.checkChildren(prev) || (prev.classList && prev.classList.arrayContains("mceNonEditable")))
						return self.cancelKey(evt)
				}

			})
		})
	}
	new PreventDelete()
})()
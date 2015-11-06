define ['premain'], (app) ->
	app.directive 'jsonEditor', [() ->
		restrict: 'E'
		scope: 
			jsonText: '='
		templateUrl: '/directives/json-editor/json-editor.html'
		css: '/directives/json-editor/json-editor.css'
		link: (scope, element, attrs) ->
			display = $('#json-display')
			textarea = $('#json-input')
			container = $('.json-input-container')	

			editorWidth = null
			#momentarily mocked
			editorHeight = 416
			colsNumber = null
			rowsNumber = null
			cellWidth = 8
			cellHeight = 16
			editorStatusMatrix = null
			cellX = 0
			cellY = 0

			scope.initJsonEditor = () ->
				editorWidth = display.outerWidth()
				colsNumber = Math.round(editorWidth/cellWidth)
				rowsNumber = Math.round(editorHeight/cellHeight)
				editorStatusMatrix = new Array(rowsNumber)
				_.each editorStatusMatrix, (el, $index) ->
					#inside the each loop, the new object is an undefined variable and does not maintain the reference
					el = editorStatusMatrix[$index] = new Array(colsNumber)
					el.isNew = true
					return
				return
	
			#To be moved to a class?			
			container.click ($event) ->
				# x/cellWidth I obtain the partial cell position, with round I get the cell number
				tmpX = $event.offsetX/cellWidth
				tmpX = (tmpX + 1) is cellNumber? tmpX : tmpX + 1
				cellX = Math.ceil($event.offsetX/cellWidth + 1)
				x = cellX*cellWidth
				tmpY = $event.offsetY/cellHeight
				tmpY = if tmpY > 1 then tmpY - 1 else tmpY
				cellY = Math.round(tmpY)
				y = cellY*cellHeight
				textarea.css({
					left: x,
					top: y
				})
				textarea.focus()

			textarea.keypress ($event) ->
				key = event.keyCode || event.charCode
				if( key isnt 8 && key isnt 46 )
					textarea.css('left', "+=" + cellWidth)
					if (editorStatusMatrix[cellY].isNew) 
						scope.jsonHtml = "<div id='cell"+cellY+cellX + "'>" + String.fromCharCode(key) + "</div>"
					cellX++
					
				return

			textarea.keyup ($event) ->
				key = event.keyCode || event.charCode
				if( key is 8 or key is 46 )
					#backspace case
					textarea.css('left', "-=" + cellWidth)	
					cellX--

			$(document).ready () ->
				scope.initJsonEditor()
				return

			return
	]
	return

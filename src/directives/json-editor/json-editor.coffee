define ['premain'], (app) ->
	app.directive 'jsonEditor', ['$sce', ($sce) ->
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
				tmpY = $event.offsetY/cellHeight
				tmpY = if tmpY > 1 then tmpY - 1 else tmpY
				cellY = Math.round(tmpY)
				y = cellY*cellHeight
				cell = $('#cell'+cellY)
				if cell.length 
					if cell.text().length < cellX
						cellX = cell.text().length
				else cellX = 0
				x = cellX*cellWidth
				textarea.css({
					left: x,
					top: y
				})
				textarea.focus()

			textarea.keypress ($event) ->
				cell = $("#cell"+cellY)
				key = event.keyCode || event.charCode
				#not del key and not newline
				if (key isnt 8 and key isnt 46 and key isnt 13)
					textarea.css('left', "+=" + cellWidth)
					if (editorStatusMatrix[cellY].isNew) 
						scope.jsonHtml = $sce.trustAsHtml("<div id='cell" + cellY + "'>" + String.fromCharCode(key) + "</div>")
						editorStatusMatrix[cellY].isNew = false
					else
						cell.text(cell.text() + String.fromCharCode(key))
					cellX++
				if (key is 13)
					#13 is newline
					textarea.css('top', "+=" + cellHeight)	
					cellY++
				return

			textarea.keyup ($event) ->
				cell = $("#cell"+cellY)
				key = event.keyCode || event.charCode
				if( key is 8 or key is 46 )
					#backspace case
					removedChars = cell.text().replace scope.json, ''
					newLinesNum = _.countBy(removedChars, (char) ->
						return char is '\n'
					);
					cellY -= newLinesNum.true if newLinesNum.true
					textarea.css('top', "-=" + cellHeight*newLinesNum.true)
					#the .false are the non newline chars
					textarea.css('left', "-=" + cellWidth*newLinesNum.false)
					cellX -= newLinesNum.false
					if cellX < 0
						#if it is going out of the screen
						cellX = 0
						#textarea.css('left', '0px')
					#concatenate two strings: one from zero to the cursor's position and then from the cursor's position to the end of the string
					cell.text( cell.text().substring(0, cellX) + cell.text().substring(cellX + removedChars.length,  cell.text().length) )

			$(document).ready () ->
				scope.initJsonEditor()
				return

			return
	]
	return

define ['premain'], (app) ->
	app.directive 'jsonEditor', ['$sce', '$timeout', ($sce, $timeout) ->
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
			scope.editorStatusMatrix = null
			cellX = 0
			cellY = 0

			scope.initJsonEditor = () ->
				editorWidth = display.outerWidth()
				colsNumber = Math.round(editorWidth/cellWidth)
				rowsNumber = Math.round(editorHeight/cellHeight)
				scope.editorStatusMatrix = new Array(rowsNumber)
				_.each scope.editorStatusMatrix, (el, $index) ->
					#inside the each loop, the new object is an undefined variable and does not maintain the reference
					el = scope.editorStatusMatrix[$index] = new Array(colsNumber)
					el.isNew = true
					el.id = "cell"+$index
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
				cellText = scope.editorStatusMatrix[cellY].string
				if cellText 
					if cellText.length < cellX
						cellX = cellText.length
					textarea.val cellText
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
				newChar = String.fromCharCode(key)
				#not del key and not newline
				if (key isnt 8 and key isnt 46 and key isnt 13)
					textarea.css('left', "+=" + cellWidth)
					scope.editorStatusMatrix[cellY][cellX] = newChar
					if (scope.editorStatusMatrix[cellY].isNew) 
						#scope.editorStatusMatrix[cellY].htmlRow = $sce.trustAsHtml("<div id='cell" + cellY + "'>" + newChar + "</div>")
					
						scope.editorStatusMatrix[cellY].string = newChar;
						scope.editorStatusMatrix[cellY].isNew = false
					else
						scope.editorStatusMatrix[cellY].string += newChar;
						
					cellX++
				if (key is 13)
					#13 is newline
					textarea.css('top', "+=" + cellHeight)	
					textarea.css('left', '0px')
					
					textarea.val('')
					scope.json = ""
					cellY++
				return

			textarea.keyup ($event) ->
				cellText = scope.editorStatusMatrix[cellY].string
				key = event.keyCode || event.charCode
				if( key is 8 or key is 46 )
					#backspace case
					removedChars = cellText.replace  scope.json, ''
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
					scope.editorStatusMatrix[cellY].string = scope.json 
			$(document).ready () ->
				scope.initJsonEditor()
				return

			return
	]
	return

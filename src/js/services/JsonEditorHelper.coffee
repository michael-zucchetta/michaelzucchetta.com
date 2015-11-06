define ['premain'], (app) ->
	app.factory 'JsonEditorHelper', [() ->
		factory = {}

		factory.cellHeight = 16
		factory.cellWidth = 8

		return factory
	]

return

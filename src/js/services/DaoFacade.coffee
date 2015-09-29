define ['premain', 'BasicInfoDao', 'UtilitiesService'], (app) ->
	app.factory "DaoFacade", ["BasicInfoDao", "UtilitiesService", (BasicInfoDao, UtilitiesService) ->
		factory = {}

		factory.getMenu = () ->
			return BasicInfoDao.getMenu().then (response) ->
				return UtilitiesService.initializeMenu(response)

		factory
	]
	return

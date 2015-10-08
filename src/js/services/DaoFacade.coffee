define ['premain', 'BasicInfoDao', 'UtilitiesService'], (app) ->
	app.factory "DaoFacade", ["BasicInfoDao", "UtilitiesService", (BasicInfoDao, UtilitiesService) ->
		factory = {}

		factory.getMenu = () ->
			return BasicInfoDao.getMenu().then (menu) ->
				UtilitiesService.setRouteDinamically(menu)
				return UtilitiesService.initializeMenu(menu)

		return factory
	]
	return

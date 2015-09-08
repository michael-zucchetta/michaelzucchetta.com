pow = (base, n) ->
	n--
	if n > 1
		base = pow(base, n)
	return base * base

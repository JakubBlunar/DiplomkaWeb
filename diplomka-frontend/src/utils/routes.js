import {
	indexOf
} from 'lodash'

export const INDEX = '/'
export const REGISTRATION = '/registration'
export const LOGIN = '/sign-in'
export const ACCOUNT_INDEX = '/account'
export const REGISTRATION_COMPLETE = '/registration-complete'
export const CHARACTER_CREATE = '/account/character/create'

function insertIntoStirng(string, index, substring) {
	return [string.slice(0, index), substring, string.slice(index)].join('')
}

function removeIndexRangeFromString(string, from, to) {
	return [string.slice(0, from), string.slice(to)].join('')
}

export function setRouteParams() {
	if (!arguments.length) {
		return ''
	}

	let route = arguments[0]
	if (arguments.length === 1) {
		return route
	}

	for (let index = 1; index < arguments.length; index += 1) {
		const artument = encodeURIComponent(arguments[index] + '')

		const indexToReplace = indexOf(route, ':')
		if (indexToReplace != -1) {
			let endIndex = indexOf(route, '/', indexToReplace)
			if (endIndex == -1) {
				endIndex = route.length
			}

			let temp = removeIndexRangeFromString(route, indexToReplace, endIndex)
			route = insertIntoStirng(temp, indexToReplace, artument)
		}
	}
	return route
}

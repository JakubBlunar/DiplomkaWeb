/* eslint-disable no-console */
import axios from 'axios'
import config from './config'

const host = config.baseUrl

export {
	host
}

function buildHeaders() {
	const headers = {
		'Content-Type': 'application/json',
		Accept: 'application/json',
		'Access-Control-Allow-Credentials': true
	}

	return headers
}

/**
 * @param string api endpoint
 * @param Object query object
 * @param function callback(err, res)
 * @param string accept header
 * @return Promise response
 * Performs get request to url and returns callback with result
 */
export function getReq(url, params, callback, accept) {
	const config = {
		headers: buildHeaders(),
		withCredentials: true
	}
	delete config['Content-Type']

	if (accept) {
		config.headers.Accept = accept
	}

	if (params) {
		config.params = params
	}

	return axios.get(host + url, config).then((res) => {
		if (!res) {
			return res
		}
		callback && callback(null, res.data)
		return res.data
	}).catch((err) => {
		callback && callback(err, null)
		throw err
	})
}

/**
 * @param string api endpoint
 * @param Object query object
 * @param Object body
 * @param function callback(err, res)
 * @return Promise response
 * Performs post request to url and returns callback with result
 */
export function postReq(url, params, data, callback) {
	const config = {
		headers: buildHeaders(),
		withCredentials: true
	}

	if (params) {
		config.params = params
	}

	return axios.post(host + url, data || {}, config).then((res) => {
		if (!res) {
			return res
		}
		callback && callback(null, res.data)
		return res.data
	}).catch((err) => {
		callback && callback(err, null)
		throw err
	})
}

/**
 * @param string api endpoint
 * @param Object query object
 * @param Object body
 * @param function callback(err, res)
 * 
 * Performs put request to url and returns callback with result
 */
export function putReq(url, params, data, callback) {
	const config = {
		headers: buildHeaders(),
		withCredentials: true
	}

	if (params) {
		config.params = params
	}

	return axios.put(host + url, data || {}, config).then((res) => {
		if (!res) {
			return res
		}
		callback && callback(null, res.data)
		return res.data
	}).catch((err) => {
		callback && callback(err, null)
		throw err
	})
}

/**
 * @param string api endpoint
 * @param Object query object
 * @param Object body
 * @param function callback(err, res)
 * 
 * Performs delete request to url and returns callback with result
 */
export function deleteReq(url, params, callback, ) {
	const config = {
		headers: buildHeaders(),
		withCredentials: true
	}

	if (params) {
		config.params = params
	}

	axios.delete(host + url, config).then((res) => {
		return callback(null, res.data)
	}).catch((err) => {
		return callback(err, null)
	})
}

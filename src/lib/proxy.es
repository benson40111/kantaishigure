///////////////////////////
//  copy from poooi/poi  //
///////////////////////////

import EventEmitter from 'events'
import querystring from 'querystring'
import http from 'http'
import net from 'net'
import url from 'url'
import zlib from 'zlib'
import request from 'request'
import { app } from 'electron'
import fs from 'fs'
import path from 'path'
import { error , log } from './utils.es'


const isKancolleGameApi = (pathname) => {
	if(pathname.startsWith('/kcsapi')){
		return true
	}
	else{
		return false
	}
}

const resolveBody = (encoding, body) => {
	return new Promise(async (resolve, reject) => {
		try {
			let decoded = null
			switch (encoding) {
				case 'gzip':
					decoded = await new Promise(async (promise_resolve, promise_reject) => {
						zlib.gunzip(body, (err,data) => {
							if(!err)
							{
								promise_resolve(data)
							}
							else{
								promise_reject(err)
							}
						})
					})
					break
				case 'deflate':
					decoded = await new Promise(async (promise_resolve, promise_reject) => {
						zlib.inflate(body, (err,data) => {
							if(!err){
								promise_resolve(data)
							}
							else{
								promise_reject(err)
							}
						})
					}) 
					break
				default:
					decoded = body
			}
			decoded = decoded.toString()
			if (decoded.indexOf('svdata=') === 0) {
				decoded = decoded.substring(7)
			}
			decoded = JSON.parse(decoded)
			resolve(decoded)
		} catch (e) {
			reject(e)
		}
	})
}

class Proxy extends EventEmitter {
	constructor() {
		super()
		this.load()
	}
	load = () => {
		let currentServer = null
		this.server = http.createServer((req,res) => {
			const serverList = JSON.parse(fs.readFileSync(path.join(__static, 'data', 'server.json'),'utf8'))
			delete req.headers['proxy-connection']
			req.headers['connection'] = 'close'
			const parsed = url.parse(req.url)
			const isGameApi = parsed.pathname.startsWith('/kcsapi')
			if(isGameApi && serverList[parsed.hostname] && currentServer !== serverList[parsed.hostname].num ){
				currentServer = serverList[parsed.hostname].num
				this.emit('network.get.server',Object.assign(serverList[parsed.hostname],{ip: parsed.hostname}))
			}
			let reqBody = Buffer.alloc(0)
			// Get all request body
			req.on ('data', (data) => {
				reqBody = Buffer.concat([reqBody, data])
			})
			req.on('end', async () => {
				let domain, pathname, requrl
				try {
					let options = {
						method: req.method,
						url: req.url,
						headers: req.headers,
						encoding: null,
						followRedirect: false,
					}
					// Add body to request
					if (reqBody.length > 0) {
						options = Object.assign(options, {
							body: reqBody,
						})
					}
					domain = req.headers.origin
					pathname = parsed.pathname
					requrl = req.url
					let success = false
					//const retryConfig = config.get('proxy.retries',0)
					const retries = 3//retryConfig < 0 ? 0 : retryConfig
					for(let i=0;i<=retries;i++){
						if(success){
							break
						}
						//Dealy 3s for retry
						if(i){
							await new Promise ( promise_resolve => setTimeout( () => promise_resolve(),3000 ))
						}
						try{
							// Emit request event to plugins
							reqBody = JSON.stringify(querystring.parse(reqBody.toString()))
							this.emit('network.on.request', req.method, [domain, pathname, requrl], reqBody, Date.now())
							// Create remote request
							const [response, body] = await new Promise((promise_resolve, promise_reject) => {
								request(options, (err, res_response, res_body) => {
									if (!err) {
										promise_resolve([res_response, res_body])
									} else {
										promise_reject(err)
									}
								}).pipe(res)
							})
							success = true
							let resolvedBody = null
							// Emit response events to plugins
							try{
								resolvedBody = await resolveBody(response.headers['content-encoding'],body)
							} catch(e){
								// Unresolveable binary files are not retried
								break
							}
							if(resolvedBody === null) {
								throw new Error('Empty Body')
							}
							if(response.statusCode == 200) {
								this.emit('network.on.response', req.method, [domain, pathname, requrl], JSON.stringify(resolvedBody), reqBody, Date.now())
							} else {
								this.emit('network.error', [domain, pathname, requrl], response.statusCode)
							}
						} catch(e) {
							success = false
							error(`Connection failed: ${req.method} ${req.url} ${e.toString()}`)
							if(i !== retries) {
								this.emit('network.error.retry', [domain, pathname, requrl], i + 1)
							}
						}
						if(success || !isKancolleGameApi(pathname)){
							res.end()
							break
						}
					}
				}catch(e){
					error(`${req.method} ${req.url} ${e.toString()}`)
					this.emit('network.error', [domain, pathname, requrl])
				}
			})
		})
		//https Request

		this.server.on('connect', (req,client,head) => {
			delete req.headers['proxy-connection']
			// Disable HTTP Keep-Alive
			req.headers['connection'] = 'close'
			const remoteUrl = url.parse(`https://${req.url}`)
				let remote = null
				remote = net.connect(remoteUrl.port,remoteUrl.hostname, () => {
					client.write('HTTP/1.1 200 Connection Established\r\nConnection: close\r\n\r\n')
					remote.write(head)
					client.pipe(remote)
					remote.pipe(client)
				})
				remote.on('end',() => { 
					remote.end()
				})
				client.on('end',() => { 
					client.end() 
				})
				client.on('error',(e) => {
					error(e)
					client.destroy()
				})
				remote.on('error',(e) => { 
					error(e)
					remote.destroy()
				})
				client.on('timeout', () => {
					client.destroy()
					remote.destroy()
				})
				remote.on('timeout', () => {
					client.destroy()
					remote.destroy()
				})
		})
			this.server.on('error', (e) =>{
				error(e)
			})
			this.server.listen(0,'127.0.0.1', () => {
				this.port = this.server.address().port
				app.commandLine.appendSwitch('proxy-server',`127.0.0.1:${this.port}`)
				app.commandLine.appendSwitch('ignore-certificate-errors')
				app.commandLine.appendSwitch('ssl-version-fallback-min', 'tls1')
				log(`Proxy listening on ${this.port}`)
			})
	}
}
export default new Proxy()

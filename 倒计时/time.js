;(function(undefined) {
			let _global;
			
			// 构造函数
			function CountDown (query) {
				if (!query.id) {
					console.warn('The incoming ID is empty')
					return;
				}
				this.query = query
				let { totalTime, nodeEle, hourMax, minuteMax, secondMax, endTimeFn, loopTime, parseTime, appointTimeList } = this.publicAtribute();
				let timeList = totalTime.split(':')
				let timer = null
				let appointTime = []
				for(let i of appointTimeList.keys()) {
					appointTime.push(`${appointTimeList[i].time}`)
				}
				setInnderHtml(timeList[0], timeList[1] , timeList[2])
				function setHourTime () {
					timer = setInterval(() => {
						timeList[2] = timeList[2]-1;
						if (timeList[2] < 0) {
							if (timeList[1] == 0) {
								if (timeList[0] == 0) {
									timeList[0] = hourMax-1;
									if (timeList[0] < 0) {
										timeList[0] = 0
									}
								}
								else {
									timeList[0] =  timeList[0]-1
								}
								timeList[1] = minuteMax - 1 
								if (timeList[1] < 0) {
									timeList[1] = 0
								}
							}
							else {
								timeList[1] = timeList[1]-1
							}
							timeList[2] = secondMax - 1
							if (timeList[2] < 0) {
								timeList[2] = 0
							}
						}
						setInnderHtml(timeList[0], timeList[1] , timeList[2])
					}, 1000)
				}
				
				// 渲染
				function setInnderHtml () {
						let hourStr= ''
						let minuetStr = ''
						let secondStr= ''
						if (parseTime) {
							hourStr = `${parseInt(timeList[0] / 24)}天 ${parseInt(timeList[0] % 24)}小时 `
							minuetStr = `${timeList[1] == 0 ? 0 : timeList[1]}分钟 `
							secondStr = `${timeList[2]}秒`
						}
						else {
							hourStr = `${String(timeList[0]).length >= 2 ? timeList[0] : '0' + timeList[0]}:`
							minuetStr = `${String(timeList[1]).length >= 2 ? timeList[1] : '0' + timeList[1]}:`
							secondStr = String(timeList[2]).length >= 2 ? timeList[2] : '0' + timeList[2]
						}
						nodeEle.innerHTML = `${hourStr}${minuetStr}${secondStr}`;
						// 倒计时完成回调函数
						if (timeList[0] == 0 && timeList[1] == 0 && timeList[2] == 0) {
							(endTimeFn && typeof endTimeFn == 'function') && endTimeFn(); 
							if (!loopTime) {
								clearInterval(timer)
						}
					}
						
						// 如果有指定时间
						if (appointTime.length) {
							let str = `${String(timeList[0]).length >= 2 ? timeList[0] : '0' + timeList[0]}:${String(timeList[1]).length >= 2 ? timeList[1] : '0' + timeList[1]}:${String(timeList[2]).length >= 2 ? timeList[2] : '0' + timeList[2]}`
							for (let i of appointTime.keys()) {
								if(appointTime[i].includes(str)){
									appointTimeList[i].fn(appointTime[i])
							}
						}
					}
				}
				setHourTime();
			}
			
			CountDown.prototype = {
				constructor: 'CountDown',
				publicAtribute () {
					return {
						nodeEle: this.query.id,
						totalTime: this.query.totalTime || '24:00:00', 
						hourMax: this.query.hourMax || '24',
						minuteMax: this.query.minuteMax || '60',
						secondMax: this.query.secondMax || '60',
						endTimeFn: this.query.endTimeFn || null,
						loopTime: this.query.loopTime || false,
						parseTime: this.query.parseTime || false,
						appointTimeList: this.query.appointTimeList || []
					}
				},
			}
			
			 _global = (function(){ return this || (0, eval)('this'); }());
			 if (typeof module !== "undefined" && module.exports) {
        module.exports = CountDown;
	    } else if (typeof define === "function" && define.amd) {
        define(function(){return CountDown;});
	    } else {
        !('CountDown' in _global) && (_global.CountDown = CountDown);
	    }
		}())
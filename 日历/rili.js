(function () {
				class ParentClass {
					constructor (query) {
						this.date = null // 初始化日期对象
						this.fullYear = this.getDate('fullYear').fullYear // 年
						this.month = this.getDate('month').month+1 // 月
						this.day = this.getDate('date').date // 日
						this.week = this.getDate('day').day // 星期
						this.monthDay = new Date(this.fullYear, this.month, 0).getDate() // 得到一个月有多少天
						this.initMonthWeek = new Date(`${this.fullYear}-${this.month}-${1}`).getDay(); // 得到月初第一天是周几
					}
					// 得到日期对象并返回需要信息
					getDate () {
						let date = new Date()
						this.date = date
						let querys = arguments
						let dateObj = {}
						for(let i of querys) {
							if (i instanceof Array) {
								// 如果传入的是数组
								for (let v of i) {
									getObj.call(this,v)
								}
							}
							else {
								getObj.call(this,i)
							}
						}
						
						// 返回传入的需要信息
						function getObj (v) {
							let [first, ...rest] = v
							let iend = rest.join('').padStart(rest.length+1, first.toUpperCase())
							let ttt = `get${iend}`
							dateObj[v] = this.date[ttt]()
						}
						return dateObj
					}
					
					// 开始渲染
					access () {
						this.monthDay = new Date(this.fullYear, this.month, 0).getDate() // 改变日期后， 重新获取当前月的天数
						this.initMonthWeek = new Date(`${this.fullYear}-${this.month}-${1}`).getDay(); // 改变日期后， 重新获取月初是周几
						this.createYearOrMonth(this.fullYear, this.month, this.day).createWeek().createDay(this.monthDay, this.initMonthWeek) // 渲染
						return this;
					}
					
					// 渲染年-日-月
					createYearOrMonth (year, month, day) {
						let box =this.id
						let weekId = `${this.idName}-rili-week`
						let dayId = `${this.idName}-rili-day`
						let strContent = `
							<div class="rili-title">
								<div><span class="rili-left-month"></span><span class="rili-left-day"></span></div>
								<div class="rili-year">${year}-${month}-${day}</div>
								<div><span class="rili-right-day"></span><span class="rili-right-month"></span></div>
							</div>
							<div class="rili-content">
								<ul id=${weekId} class="rili-week"></ul>
								<ul id=${dayId} class="rili-day"></ul>
							</div>
						`
						this.html(box, strContent);	
						
						let leftMonth = this.id.getElementsByClassName('rili-left-month')[0];
						let rightMonth = this.id.getElementsByClassName('rili-right-month')[0]
						let leftDay = this.id.getElementsByClassName('rili-left-day')[0]
						let rightDay = this.id.getElementsByClassName('rili-right-day')[0]
						let riliYear = this.id.getElementsByClassName('rili-year')[0]
						
						leftMonth.addEventListener('click', this.onMonthClick.bind(this, '-'))
						rightMonth.addEventListener('click', this.onMonthClick.bind(this, '+'))
						leftDay.addEventListener('click', this.onDayClick.bind(this, '-'))
						rightDay.addEventListener('click', this.onDayClick.bind(this, '+'))
						return this;
					}
					
					// 渲染星期
					createWeek (i = 0) {
						let weekBox = document.getElementById(`${this.idName}-rili-week`)
						let li = this.createEle('li')
						this.html(li, this.getWeek(i));
						this.appendEle(weekBox, li);
						return i > 6 ? this : this.createWeek(++i);
					}
					
					// 转换星期
					getWeek(type) {
						switch (type) {
							case 0: 
								return '日'
								break;
							case 1: 
							 	return '一';
							 	break;
						 	case 2: 
							 	return '二';
							 	break;
						 	case 3: 
							 	return '三';
							 	break;
						 	case 4: 
							 	return '四';
							 	break;
						 	case 5: 
							 	return '五';
							 	break;
						 	case 6: 
							 	return '六';
							 	break;
						}
					}
					
					// 渲染星期下的日历
					createDay (monthDay, initMonthWeek) {			
						let dayBox = document.getElementById(`${this.idName}-rili-day`);
						let dayList = []
						let repeat = false 
						for (let i = 1; i <= monthDay; i++) {
							dayList.push(i)
						}
						dayList.map(v => {
							if (!repeat) {
								for(let i = 0; i < initMonthWeek; i++) {
									let li = this.createEle('li');
									if (this.showAround) {
										// 如果定义了显示前后日期， 将上个月的加进去
										let fullYear, month
										if (this.month == 1) {
											fullYear = this.fullYear-1
											month = 12
										}
										else {
											fullYear = this.fullYear
											month = this.month-1
										}
										let day = new Date(fullYear, month, 0).getDate() // 得到一个月有多少天
										this.setClass(li, 'disabled').html(li, day - initMonthWeek + i + 1)
									}
									li.setAttribute('data-disable', true)
									this.appendEle(dayBox, li)
								}
								repeat = true
							}
							let li = this.createEle('li')
							li.setAttribute('onselectstart', 'return false')
							this.html(li, v)
							this.appendEle(dayBox, li)
							if (v == this.day) {
								this.setClass(li, 'active')
							}
							else {
//								this.setClass(li, 'active')
							}
						});
						
						if (this.showAround) {
							// 将下个月的加进去
							let fullYear, month;
							if (this.month == 12) {
								fullYear = this.fullYear + 1
								month = 1
							}
							else {
								fullYear = this.fullYear
								month = this.month + 1
							}
							let monthDay = new Date(fullYear, month, 0).getDate() // 得到一个月有多少天
							let initMonthWeek = new Date(`${this.fullYear}-${this.month}-${this.monthDay}`).getDay(); // 得到最后一天是周几
							for (let i = 0; i < 6 - initMonthWeek; i++) {
								let li = this.createEle('li');
								this.setClass(li, 'disabled').html(li, monthDay - i)
								li.setAttribute('data-disable', true)
								this.appendEle(dayBox, li)
							}
						}
						dayBox.addEventListener('click', this.dayBoxClick.bind(this));
					}
					
					// 创建节点
					createEle (tag) {
						return document.createElement(tag);
					}
					
					//  追加节点
					appendEle (parentNode, ...childrenNode) {
						let box = parentNode
						for (let i of childrenNode) {
							if (i instanceof Array) {
								for (let v of i) {
									box.appendChild(v)
								}
							}
							else {
								box.appendChild(i)
							}
						}
						return this
					}
					
					// 设置class类名
					setClass (node, ...list) {
						for ( let i of list) {
							if (i instanceof Array) {
								for (let v of i) {
									node.classList.add(v)
								}
							}
							else {
								node.classList.add(i)
							}
						}
						return this;
					}
					
					// 移除类
					removeClass (node, ...list) {
						for ( let i of list) {
							if (i instanceof Array) {
								for (let v of i) {
									node.classList.remove(v)
								}
							}
							else {
								node.classList.remove(i)
							}
						}
						return this;
					}
					
					// 判断是否存在某个类
					hasClass (node, name) {
						return node.classList.contains(name)
					}
					
					// 设置style
					css (node, name, val) {
						if (typeof name == 'object') {
							Object.key(name).forEach(v => {
								node.style[v] = name[v]
							});
						}
						else {
							node.style[name] = val
						}
						return this;
					}
					
					 // 设置得到文本值
					html (parentNode, html) {
						if (html) {
							parentNode.innerHTML = html
							return this
						}
						else {
							return parentNode.innerHTML
						}
					}
					
					 // 设置得到value值
					value (parentNode, value) {
						if (value) {
							parentNode.value = value
							return this
						}
						else {
							return parentNode.value
						}
					}
					
					// 年份箭头点击事件
					onMonthClick (type) {
						this.fullYear = eval(`${this.fullYear}${type}1`);				
						this.access();
					}
					
					// 月份箭头点击事件
					onDayClick (type) {
						this.month = eval(`${this.month}${type}1`);	
						if (this.month == 13) {
							this.fullYear = eval(`${this.fullYear}+1`);
							this.month = 1
						}
						else if (this.month == 0) {
							this.fullYear = eval(`${this.fullYear}${type}1`);	
							this.month = 12
						}
						this.access();
					}
					// 天数样式点击事件
					dayBoxClick (e) {
						if (e.target.getAttribute('data-disable')) return false
						if (this.hasClass(e.target, 'clickActive')) {
							this.removeClass(e.target, 'clickActive')
							return false;
						}
						this.currentTarget ? this.removeClass(this.currentTarget, 'clickActive') : ''
						this.setClass(e.target, 'clickActive');
						this.currentTarget = e.target
					}
				}
				
				class ChildClass extends ParentClass {
					constructor(query) {
						let { id, contenteditableYear, width, height, riliBoxClass, showAround } = query || {}
						super();
						if (id) {
							this.currentTarget = ''
							this.id = id
							this.idName = this.id.getAttribute('id') //  存储渲染节点
							this.riliBoxClass = riliBoxClass // 存储穿进去的最外层的div样式
							this.showAround = showAround // 存储是否显示前后日期
							this.setEle(); 
						}
					}
					setEle () {
						// 渲染日期
						super.setClass(this.id, this.riliBoxClass, 'rili-box').access()
					}
				}
				
				window.ChildClass = ChildClass
			})(window)
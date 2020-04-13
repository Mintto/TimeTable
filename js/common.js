const TimeTable = {
	"teacher":{
		"이항선":{
			"title":"응용프로그래밍 개발/앱 배포",
			"href":"https://classroom.google.com/w/NTUyNjY1MTY5OTla/t/all"
		},
		"이민주":{
			"title":"정보처리와 관리",
			"href":"https://classroom.google.com/w/Njk0NDQ0NTI1NjFa/t/all"
		},
		"백신혜":{
			"title":"수학1",
			"href":"https://classroom.google.com/w/NTU3Mjc5ODU4NzNa/t/all"
		},
		"조봉희":{
			"title":"수학1",
			"href":"https://classroom.google.com/c/NTU3Mjc5ODU4NzNa"
		},
		"이영국":{
			"title":"응용 프로그래밍/화면 설계",
			"href":"https://classroom.google.com/w/NjgwODk3Mzk4ODNa/t/all"
		},
		"최승호":{
			"title":"체육",
			"href":"https://classroom.google.com/w/NTY0NzM3MTQ0MDha/t/all"
		},
		"권순용":{
			"title":"종교",
			"href":"https://classroom.google.com/w/NTY1MDU5OTEzMTJa/t/all"
		},
		"박선갑":{
			"title":"진로",
			"href":"https://classroom.google.com/w/NjgxNDg5NDA2MjBa/t/all"
		},
		"김남준":{
			"title":"응용프로그래밍/서버프로그램 구현",
			"href":"https://classroom.google.com/w/NTUyNzYyNTAzNDda/t/all"
		},
		"창체":{
			"href":"#!"
		}
	},
	"class":{
		"월":{
			"1":"권순용",
			"2":"백신혜",
			"3":"이민주",
			"4":"조봉희",
			"5":"김남준",
			"8":"이영국"
		},
		"화":{
			"1":"이항선",
			"2":"조봉희",
			"3":"이민주",
			"4":"백신혜",
			"5":"김남준",
			"8":"이영국"
		},
		"수":{
			"1":"최승호",
			"2":"박선갑",
			"3":"백신혜",
			"4":"창체",
			"7":"이항선"
		},
		"목":{
			"1":"이항선",
			"4":"김남준"
		},
		"금":{
			"1":"권순용",
			"2":"조봉희",
			"3":"최승호",
			"4":"백신혜",
			"6":"박선갑",
			"7":"조봉희",
			"8":"이영국"
		}
	}
},
doc = document,
one = e => doc.querySelector(e),
all = all => Array.from(doc.querySelectorAll(all)),
create = e => doc.createElement(e),
HTMLElementPt = {
	addClass : function(c){ 
		return this.classList.add(c)
	},
	removeClass : function(c){ 
		return this.classList.remove(c)
	},
	hasClass : function(c){
		return this.classList.toggle(c);
	},
	clone : function(){
		return this.cloneNode();
	},
	index : function(){
		return Array.from(this.parentNode.children).indexOf(this);
	} 
}
Object.assign(HTMLElement.prototype,HTMLElementPt);
function App(){
	let Table = one("#TimeTable");
	Object.values(TimeTable.class).forEach( week => {
		let 
		ul = create("ul"),
		arr = Object.entries(week);
		ul.addClass("week");
		for(let idx=0,len=arr.length; idx<len; idx++){
			let li = create("li"),
			a = create("a");
			a.textContent = arr[idx][1];
			a.href = TimeTable.teacher[arr[idx][1]].href;
			if(TimeTable.teacher[arr[idx][1]].href != "#!" ) a.setAttribute("target","_blank")
			li.append(a);
			ul.append(li);
			for(let i=0,len= idx == arr.length-1 ? Math.abs(arr[idx][0]-9) : Math.abs(arr[idx][0]-arr[idx+1][0])-1; i<len; i++){
				let li = create("li");
				ul.append(li);
			}	
		}
		Table.append(ul);
	} );
	let ul = all(".week");
	loopTime();
	function loopTime(){
		let Today = new Date(), TodayUl = ul[Today.getDay()-1];
		if( !!!TodayUl ) return false;
		let hours = Today.getHours(),
		minute = (Today.getMinutes()+"").length === 1 ? "0"+Today.getMinutes() : Today.getMinutes(),
		time = hours+""+minute,
		li = Array.from(TodayUl.querySelectorAll("li")),
		liClone = Array.from(TodayUl.querySelectorAll("li")),
		check = 830 <= time && time < 920 ? 0 : 
		930 <= time && time < 1020 ?  1 :
		1030 <= time && time < 1120 ? 2 :
		1130 <= time && time < 1220 ? 3 :
		1320 <= time && time < 1410 ? 4 :
		1420 <= time && time < 1510 ? 5 :
		1520 <= time && time < 1610 ? 6 :
		1620 <= time && time < 1710 ? 7 :
		1720 <= time && time < 1810 ? 8 : false;
		if( check === false ){
			li.forEach( v => v.removeClass("select") );
			return false;
		}
		let first = check,last;
		for(let i = first; 0<=i; i--){
			if(!!li[i].textContent){
				first = i;
				break;
			}
		}
		for(let i=first+1; i<=8; i++){
			if(!!li[i].textContent){
				last = i-1;
				break;
			}else{
				last = i;
				break;
			}
		}
		for(let i = first; i<=last; i++){
			let lis = li[i];
			liClone = liClone.filter( f => f != lis );
			lis.addClass("select");
		}
		liClone.forEach( v => v.removeClass("select") );
	}
	setInterval(loopTime,1000);
}
window.onload = function(){
	App();
}
// Kevin O'Toole
// VFW 1303
// Project 4

window.addEventListener("DOMContentLoaded", function(){

	// getElementById Function
	function id(x){
		var elementId = document.getElementById(x);
		return elementId;
	}
	
	var search = id("searchButton");
	search.addEventListener("click", getRecipes);

	function getRecipes(){
		var category = id("types").value;
		var term = id("searchBy").value;
	
		//Search By Category Only
		if(category != " --Choose A Type Of Recipe-- " && term == ""){
			var makeDiv = document.createElement("div");
			makeDiv.setAttribute("id", "items");
			var makeList = document.createElement("ul");
			makeDiv.appendChild(makeList);
			document.body.appendChild(makeDiv);
			for(var i=0, len=localStorage.length; i<len; i++){
			var makeLi = document.createElement("li");
			makeList.appendChild(makeLi);			
				var key = localStorage.key(i);			
				var value = localStorage.getItem(key);
				var item = JSON.parse(value);
				var makeSubList = document.createElement("ul");
				makeLi.appendChild(makeSubList);
				if(category === item.group[1]){
					for(n in item){
						var makeSubLi = document.createElement("li");
						makeSubList.appendChild(makeSubLi);
						var optSubText = item[n][0]+" "+item[n][1];
						makeSubLi.innerHTML = optSubText;
					}
				}
			}
		}
	
		//Search By Term Only
		if(category == " --Choose A Type Of Recipe-- " && term != ""){
			for(var i=0, len=localStorage.length; i<len; i++){ 			
				var key = localStorage.key(i);			
				var value = localStorage.getItem(key);
				var item = JSON.parse(value);
				for(n in item){
					if(term === item[n][1]){
						for(q in item){
							console.log(item[q][0]+": "+item[q][1]);
						}
					}
				}
			}
		}
		//Search By Category AND Term
		if(category != " --Choose A Type Of Recipe-- " && term != ""){
			for(var i=0, len=localStorage.length; i<len; i++){ 			
				var key = localStorage.key(i);			
				var value = localStorage.getItem(key);
				var item = JSON.parse(value);
				for(n in item){
					if(category === item.group[1] && term === item[n][1]){
						for(s in item){
							console.log(item[s][0]+": "+item[s][1]);
						}
					}
				}
			}
		}
	}
	getRecipes();
});
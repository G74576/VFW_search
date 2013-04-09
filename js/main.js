// Kevin O'Toole
// VFW 1303
// Project 4

// Wait until the DOM is ready.
window.addEventListener("DOMContentLoaded", function(){

	// getElementById Function
	function id(x){
		var elementId = document.getElementById(x);
		return elementId;
	}

	// Create select field element and populate with options (optionGroup)
	function recipeCategory(){
		var recipeFormTag = document.getElementsByTagName("form"); //formTag is an array of all the form tags
		var selectLiRecipeType = id("selectType");
		var makeRecipeTypeSelect = document.createElement("select");
		makeRecipeTypeSelect.setAttribute("id", "types");
		for(var i=0, j=recipeType.length; i<j; i++){
			var makeRecipeTypeOption = document.createElement("option");
			var recipeOptText = recipeType[i];
			makeRecipeTypeOption.setAttribute("value", recipeOptText);
			makeRecipeTypeOption.innerHTML = recipeOptText;
			makeRecipeTypeSelect.appendChild(makeRecipeTypeOption);
		}
		selectLiRecipeType.appendChild(makeRecipeTypeSelect);
	}
	
	//Find value of selected radio button.
	function getSelectedRadio(){
		var relatedRadios = document.forms[0].relative;
		for(var i=0; i < relatedRadios.length; i++){
			if(relatedRadios[i].checked){
				relatedValue = relatedRadios[i].value;
			}
		}
	}
	
	//Get checkbox values.
	function getCheckboxValues(){
		whenCookedValue = [];
		var checkboxes = document.forms[0].when;
		for(var i=0; i < checkboxes.length; i++){
			if(checkboxes[i].checked){
				whenCookedValue.push(checkboxes[i].value);
			}
		}
	}
	
	function toggleControls(n){
		switch(n){
			case "on":
				id("addRecipe").style.display = "none";
				id("clear").style.display = "inline";
				id("display").style.display = "none";
				id("addNewRecipe").style.display = "inline";
				break;
			case "off":
				id("addRecipe").style.display = "block";
				id("clear").style.display = "inline";
				id("display").style.dipslay = "inline";
				id("addNewRecipe").style.display = "none";
				id("items").style.display = "none";
				break;
			default:
				return false;
		}
	}
	
	// Store data to local storage with unique Id of random number
	function storeNewRecipe(key){
		// If there is no key, this means this is a brand new item and we need a key
		if(!key){
			var uniqueId 			= Math.floor(Math.random()*1000001);
		}else{
		//Set the id to the existing key we are editing so that it will save over the data.
		//The key is the same key that's been passed along from the edit submit event handler
		//to the validate function, and then passed here into the store recipe function
			uniqueId = key;
		}
		//Gather up all our form field values and store in an object.
		//Object properties contain array with the form label and input values.
		getSelectedRadio();
		getCheckboxValues();
		var item 				={};
			item.fname 			= ["First Name:", id("fname").value];
			item.lname 			= ["Last Name:", id("lname").value];
			item.todaysDate 	= ["Date Added:", id("todaysDate").value];
/*radio*/	item.family 		= ["Related:", relatedValue];
			item.email 			= ["Email:", id("email").value];
			item.group 			= ["Type of Recipe:", id("types").value];
			item.range 			= ["Difficulty:", id("range").value];
/*chk box*/	item.whenCooked		= ["When You Cook This:", whenCookedValue];
			item.specify		= ["Other Time:", id("specify").value];
			item.time 			= ["Cooking Time:", id("time").value];
			item.temperature 	= ["Cooking Temperature:", id("temperature").value];
			item.ingredients	= ["Recipe Ingredients:", id("ingredients").value];
			item.directions 	= ["Cooking Directions:", id("directions").value];
		//Save data into local storage: Use Stringify to convert our object to a sting.
		localStorage.setItem(uniqueId, JSON.stringify(item));
		alert("Recipe Has Been Saved!");
	}
	
	function refreshWindow(){
		window.location.reload();
	}
	
	function getRecipes(){
		toggleControls("on");
		if(localStorage.length === 0){
			alert("There are no recipes in your local storage so default recipes were added.");
			autoFillRecipe();
		}
		//Write Data from Local Storage to the browser.
		var makeNewDiv = document.createElement("div"); 			// Create new div tag
		makeNewDiv.setAttribute("id", "items"); 					// Sets the attribute of the new div tag
		var makeNewList = document.createElement("ul"); 			// Creates ad new ul 
		makeNewDiv.appendChild(makeNewList); 						// Appends the new ul in the new div tag
		document.body.appendChild(makeNewDiv); 						// Appends the new div tag to the body tag of the doument
		id("items").style.display = "block";							// Safety just to be sure that the items display
		for(var i=0, len=localStorage.length; i<len; i++){ 			// Creates loop of local storage
			var makeNewli = document.createElement("li"); 			// Create a new li
			var dataLinksLi = document.createElement("li");			// Creates a link for the display data
			makeNewList.appendChild(makeNewli);  					// Appends the new li to the ul tag
			var key = localStorage.key(i); 							// Sets the key value from local storage
			var value = localStorage.getItem(key); 					// Sets the value from the key from the local storage
			var newObj = JSON.parse(value); 						//Convert the string from local storage value back to an object by using JSON.parse
			var makeNewSubList = document.createElement("ul"); 		// Creates a new sub list to display the objects of the list
			makeNewSubList.setAttribute("id", "newSubList");
			makeNewli.appendChild(makeNewSubList); 					// Appends the new ul to the li tag
			getImage(newObj.group[1], makeNewSubList);
			for(var n in newObj){ 									// creates a for in loop of the object data
				var makeNewSubli = document.createElement("li"); 	// Creates a new li item to display the objects in the group
				makeNewSubList.appendChild(makeNewSubli); 			// Appends the new li to the new ul tag
				var optNewSubText = newObj[n][0] + " " + newObj[n][1]; // 
				makeNewSubli.innerHTML = optNewSubText;
				makeNewSubList.appendChild(dataLinksLi);
			}
			makeDisplayItemLinks(localStorage.key(i), dataLinksLi); // create our edit and delete buttons/link for local storage.
		}
	}
	
	//Get the image for the right recipe category
	function getImage(imageName, makeNewSubList){
		var imageLi = document.createElement("li");
		imageLi.setAttribute("id", "icons");
		makeNewSubList.appendChild(imageLi);
		var newImage = document.createElement("img");
		//Name icon images (imageName) the exact same as the type group names.
		var setSource = newImage.setAttribute("src", "images/"+ imageName + ".png");
		imageLi.appendChild(newImage);
	}
	
	//JSON OBJECT which will auto populate local storage
	function autoFillRecipe(){
		//The actual JSON OBJECT data required for this to work is coming from our json.js file, which is loaded from our HTML page
		//Store the JSON Object into local storage.
		for(var n in json){
			var id = Math.floor(Math.random()*1000001);
			localStorage.setItem(id, JSON.stringify(json[n]));
		}
	}
	
	
	// Make Item Links Function. Creating the edit and delete links for each stored item when displayed.
	function makeDisplayItemLinks(key, dataLinksLi){
		// add edit single item link
		var editDataLink = document.createElement("a");
		editDataLink.setAttribute("id", "editLink");
		editDataLink.href = "#";
		editDataLink.key = key;
		var editDataLinkText = "Edit Recipe Information";
		editDataLink.addEventListener("click", editRecipe);
		editDataLink.innerHTML = editDataLinkText;
		dataLinksLi.appendChild(editDataLink);
		
		// add line break
		var lineBreakTag = document.createElement("br");
		dataLinksLi.appendChild(lineBreakTag);
	
		// add delete single item link
		var deleteDataLink = document.createElement("a");
		deleteDataLink.setAttribute("id", "deleteLink");
		deleteDataLink.href = "#";
		deleteDataLink.key = key;
		var deleteDataLinkText = "Delete Recipe";
		deleteDataLink.addEventListener("click", deleteRecipe);
		deleteDataLink.innerHTML = deleteDataLinkText;
		dataLinksLi.appendChild(deleteDataLink);
	}
	
	function editRecipe(){
		//Grab the data from our item from local storage.
		var getRecipeValue = localStorage.getItem(this.key);
		var item = JSON.parse(getRecipeValue);
		
		// Shows the form again
		toggleControls("off");
		
		// populates the form fields with current local storage values.
		id("fname").value = item.fname[1];
		id("lname").value = item.lname[1];
		id("todaysDate").value = item.todaysDate[1];
		var relatedRadios = document.forms[0].relative;
		for(var i=0; i<relatedRadios.length; i++){
			if(relatedRadios[i].value == "Yes" && item.family[1] == "Yes"){
				relatedRadios[i].setAttribute("checked", "checked");
			}else if(relatedRadios[i].value == "No" && item.family[1] == "No"){
				relatedRadios[i].setAttribute("checked", "checked");
			}
		}
		id("email").value = item.email[1];
		id("types").value = item.group[1];
		id("range").value = item.range[1];
		var cooked = item.whenCooked[1];
		for(var i=0; i<cooked.length; i++){
			if(cooked[i] == "Valentines"){
				id("valentines").setAttribute("checked", "checked")
			}
			if(cooked[i] == "Easter"){
				id("easter").setAttribute("checked", "checked")
			}
			if(cooked[i] == "Halloween"){
				id("halloween").setAttribute("checked", "checked")
			}
			if(cooked[i] == "Thanksgiving"){
				id("thanksgiving").setAttribute("checked", "checked")
			}
			if(cooked[i] == "Christmas"){
				id("christmas").setAttribute("checked", "checked")
			}
			if(cooked[i] == "Birthdays"){
				id("birthdays").setAttribute("checked", "checked")
			}
			if(cooked[i] == "Other"){
				id("other").setAttribute("checked", "checked")
			}
		}
		id("specify").value = item.specify[1];
		id("time").value = item.time[1];
		id("temperature").value = item.temperature[1];
		id("ingredients").value = item.ingredients[1];
		id("directions").value = item.directions[1];
		
		// Remove the initial listener from the input 'save contact' button.
		saveNewRecipe.removeEventListener("click", storeNewRecipe);
		// Change submit button value to say edit recipe
		id("saveRecipe").value = "Edit Recipe Information";
		var editRecipeInfo = id("saveRecipe");
		//Save the key value established in this function as a property of the editRecipe event
		//so we can use that value when we save the data we edited.
		editRecipeInfo.addEventListener("click", validate);
		editRecipeInfo.key = this.key;
	}
		
	function deleteRecipe(){
		var ask = confirm("Are you sure you want to delete this recipe?");
		if(ask){
			localStorage.removeItem(this.key);
			alert("The recipe was deleted!");
			window.location.reload();
		}else{
			alert("The recipe was not deleted!");
		}
	}
	
	function deleteLocalRecipes(){
		if(localStorage.length === 0){
			alert("There are no recipes in your local storage.")
		}else{
			localStorage.clear()
			alert("Your recipes have been deleted.");
			window.location.reload();
			return false;
		}
	}
	
	function validate(e){
		//Define the elements we want to check
		var getFname = id("fname");
		var getLname = id("lname");
		var getEmail = id("email");
		var getGroup = id("types");
		var getIng	 = id("ingredients");
		var getDir	 = id("directions");
		
		// Reset Error Messages
		errMsg.innerHTML = "";
		getFname.removeAttribute("style", "border");
		getLname.removeAttribute("style", "border");
		getEmail.removeAttribute("style", "border");
		getGroup.removeAttribute("style", "border");

		// Get error messages
		var errorMessages = [];
		//First Name validation
		if(getFname.value === ""){
			var fNameError = "Please enter a first name.";
			getFname.style.border = "1px solid red";
			errorMessages.push(fNameError);
		}
		
		//Last Name Validation
		if(getLname.value === ""){
			var lNameError = "Please enter a last name.";
			getLname.style.border = "1px solid red";
			errorMessages.push(lNameError);
		}
		
		//Email Validation
		var emailRe = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
		if(!(emailRe.exec(getEmail.value))){
			var eMailError = "Please enter your Email."
			getEmail.style.border = "1px solid red";
			errorMessages.push(eMailError);
		}
		
		//group validation
		if(getGroup.value === " --Choose A Type Of Recipe-- "){
			var groupError = "Please select a type of recipe.";
			getGroup.style.border = "1px solid red";
			errorMessages.push(groupError);
		}
		
		if(getIng.value === ""){
			var ingredError = "Please enter your ingredients.";
			getIng.style.border = "1px solid red";
			errorMessages.push(ingredError);
		}
			
		if(getDir.value === ""){
			var dirError = "Please enter cooking directions.";
			getDir.style.border = "1px solid red";
			errorMessages.push(dirError);
		}
		
		//If there were errors, display them on the screen.
		if(errorMessages.length >= 1){
			for(var i=0, j=errorMessages.length; i < j; i++){
				var errorText = document.createElement("li");
				errorText.innerHTML = errorMessages[i];
				errMsg.appendChild(errorText);
			}
			e.preventDefault();
			return false;
		}else{
			//If all is ok. save our data. Send the key value which came from the edit data function.
			//Remember this key value was passed through the edit submit eventListener as a property.
			storeNewRecipe(this.key);
		}
	}
	
	// Variable defaults
	var recipeType = [" --Choose A Type Of Recipe-- ", "Breakfast", "Lunch", "Dinner", "Appetizer", "Dessert", "Drink"];
	var	relatedValue;
	var	whenCookedValue = "No specific time when you would cook this.";
	var errMsg = id("errors");
	recipeCategory();

	//Set Link & Submit Click Events
	var displayRecipes = id("display");
	displayRecipes.addEventListener("click", getRecipes);
	var clearRecipes =id("clear");
	clearRecipes.addEventListener("click", deleteLocalRecipes);
	var saveNewRecipe = id("saveRecipe");
	saveNewRecipe.addEventListener("click", validate);
	//saveNewRecipe.addEventListener("click", refreshWindow);
});
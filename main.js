// Based on http://stackoverflow.com/questions/10257429/how-do-i-get-my-extension-to-block-elements-on-a-page

var SPONSORED_CONTENT_PARENT_NNUMBER = 18;
var SPONSORED_CONTENT_CLASS_TYPE = '_5paw _4dcu';
var FACEBOOK_AD_DIV_IDS = ['pagelet_ego_pane_w', 'pagelet_ego_pane', 'pagelet_side_ads', 'fbPhotoSnowliftAdsSide'];

function parent(element, repititions){
	// Finds the nth parent of a div.
	
	var tempElement = element;
	for (i = 0; i < repititions; i++) {
		tempElement = tempElement.parentElement;
	}
	return tempElement;
}

function deleteDiv(div){
	// Removes a div from the page
	
	div.parentElement.removeChild(div);
	console.log("Advertising was hidden");
}

function removeElementByID(element){
	// Removes an element from the page based on its id
	
	try {
		var ad = document.getElementById(element);
		deleteDiv(ad);
	} catch(err) {
		//Skip if there was an error
	}
}

function remove(){
	// Removing Sponsored Content
	try {
		// Get a list of all the sponsored content divs in the page
		var fbAds = document.getElementsByClassName(SPONSORED_CONTENT_CLASS_TYPE);
		for (i = 0; i < fbAds.length; i++) { 
			// Going up to find the actual post div (16th parent)
			var upperParent = parent(fbAds[i], SPONSORED_CONTENT_PARENT_NNUMBER);
			// Removing post div
			deleteDiv(upperParent);
		}
	} catch(err) {
		//Skip if there is an error
	}
	
	// Removing all other ads
	for (i = 0; i < FACEBOOK_AD_DIV_IDS.length; i++) {
		removeElementByID(FACEBOOK_AD_DIV_IDS[i]);
	}

	// Running every 2 seconds so that unwanted content is still deleted after scrolling down
	setTimeout(function(){remove();},2000);
}

// Running the remove function
remove();
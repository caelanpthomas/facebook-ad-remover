// Based on http://stackoverflow.com/questions/10257429/how-do-i-get-my-extension-to-block-elements-on-a-page

// The script checks for elements of a class type in SPONSORED_CONTENT_CLASS_TYPE (identifies 
// the sponsored content). Then goes up the parent chain to find the div instance of the full
// story (matches in PARENT_CLASS_TYPE), and removes it.

var SPONSORED_CONTENT_CLASS_TYPE = ['_5paw _4dcu', 'uiStreamSponsoredLink', '_3e_2 _m8c'];
var FACEBOOK_AD_DIV_IDS = ['pagelet_ego_pane_w', 'pagelet_ego_pane', 'pagelet_side_ads', 'fbPhotoSnowliftAdsSide'];

// These are the classes to remove - the first ones should match individual stories, _4ikz is last resort 
// as it is a group of 2-3 stories and will remove more than just the sponsored content.
var PARENT_CLASS_TYPE = new Set(['_5jmm _5pat _3lb4 z_zn5azjhwb', '_5jmm _5pat _3lb4 z_zn5azjhwb hidden_elem', '_4ikz']);


function parent(element){
	// Finds the parent up the parent chain which matches an element of PARENT_CLASS_TYPE
	var tempElement = element;
	try {
		while (true){
			if (PARENT_CLASS_TYPE.has(tempElement.className)) {
				// We have a match, break and return the current element
				break;
			}
			tempElement = tempElement.parentElement;
		}
	} catch (err) {
		// Something has gone wrong, return original element so the whole page is not deleted
		// Shouldn't happen, but handle anyway.
		console.log("Could not remove advertising");
		return element;
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
		for (j = 0; j < SPONSORED_CONTENT_CLASS_TYPE.length; j++) {
			var fbAds = document.getElementsByClassName(SPONSORED_CONTENT_CLASS_TYPE[j]);
			for (i = 0; i < fbAds.length; i++) { 
				// Going up to find the div object of the full post
				var upperParent = parent(fbAds[i]);
				deleteDiv(upperParent);
			}
		}
	} catch(err) {
		//Skip if there is an error
		console.log("Error removing advertising");
	}
	
	// Removing all other ads
	for (i = 0; i < FACEBOOK_AD_DIV_IDS.length; i++) {
		removeElementByID(FACEBOOK_AD_DIV_IDS[i]);
	}

	// Running every 2 seconds so that unwanted content is still deleted after scrolling down
	setTimeout(function(){remove();}, 2000);
}

// Running the remove function
remove();
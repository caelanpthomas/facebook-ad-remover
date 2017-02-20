// Based on http://stackoverflow.com/questions/10257429/how-do-i-get-my-extension-to-block-elements-on-a-page

function parent(element, repititions){
	var tempElement = element;
	for (i = 0; i < repititions; i++) {
		tempElement = tempElement.parentElement;
	}
	return tempElement;
}

function remove(){
	try {
		var fbAds = document.getElementsByClassName('_5paw _4dcu');
		for (i = 0; i < fbAds.length; i++) { 
			var upperParent = parent(fbAds[i], 16);
			upperParent.parentElement.removeChild(upperParent);
			console.log("Sponsored Content was hidden");
		}
	} catch(err) {
		//Skip if there is an error
	}
	
	try {
		document.getElementById('pagelet_ego_pane_w').innerHTML = '';
	} catch(err) {
		//Skip if "pagelet_ego_pane_w" div tag isn't on this page
	}
	
	try {
        document.getElementById('pagelet_ego_pane').innerHTML = '';
	} catch(err) {
		//Skip if "pagelet_ego_pane" div tag isn't on this page
	}
	
	try {
        document.getElementById('pagelet_side_ads').innerHTML = '';
	} catch(err) {
		//Skip if "pagelet_side_ads" div tag isn't on this page
	}
	
	try {
		document.getElementById('fbPhotoSnowliftAdsSide').innerHTML = '';
	} catch(err) {
		//Skip if "fbPhotoSnowliftAdsSide" div tag isn't on this page
	}

	setTimeout(function(){remove();},2000);
}
remove();
// This makes sure all `eval` calls are being executed in the global scope.
// This is important for the asset loader.
eval = (function(e) {
	return function(expr) {
		return e(expr);
	};
})(eval);

gUtil = {
	xhrGet: function(reqUri, callback, type) {
		var oReq = new XMLHttpRequest();
		oReq.open("GET", reqUri, true);
		oReq.responseType = type;
		
		oReq.onload = callback;
		oReq.onerror = function () {
			console.log(type, callback);
		}
	
		oReq.send(null);
	},
	
	// data is the string from the file - as is.
	parseLevelData: function(data){
		return JSON.parse(data);
	},
	
	copyProperties: function(props, aProperties){
		if(aProperties){
			if(aProperties.physics)
				for(var key in aProperties.physics){
					props.physics[key] = aProperties.physics[key];
				}
			if(aProperties.userData)
				for(var key in aProperties.userData){
					props.userData[key] = aProperties.userData[key];
				}
			if(aProperties.other)
				for(var key in aProperties.other){
					props.other[key] = aProperties.other[key];
				}
			if(aProperties.physics)
				delete aProperties.physics;
			if(aProperties.userData)
				delete aProperties.userData;
			if(aProperties.other)
				delete aProperties.other;
			for(var key in aProperties){
				props[key] = aProperties[key];
			}
		}
		
		return props;
	}
	
}
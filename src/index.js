module.exports = function check(str, bracketsConfig) {
	var globalPosition = [];
	for (var i = 0; i < bracketsConfig.length; i++) {
		let pair = bracketsConfig[i];

		var count = [0, 0];
		var positions = [[], []];
		var trigger = 0;
		if (pair[0] === pair[1]) {
			var startPosition = 0;
			while(true){
				var index = str.indexOf(pair[0], startPosition);
				if (index === -1) { break; }

				positions[trigger].push(index);
				startPosition = index + 1;
				count[trigger] = count[trigger] + 1;
				trigger = trigger ? 0 : 1;
			}
		}else{
			for (var j = 0; j < pair.length; j++) {
				var startPosition = 0;
				bracket = pair[j];
				count[trigger] = str.split(bracket).length;
				while(true){
					var index = str.indexOf(bracket, startPosition);
					if (index === -1) { break; }

					positions[trigger].push(index);
					startPosition = index + 1;
				}
				trigger = 1;
			}
		}
		
		if (count[0] !== count[1]) {
			return false;
		}
		for (var j = 0; j < positions[0].length; j++) {
			if (positions[0][j] > positions[1][j]) {
				return false;
			}
		}
		globalPosition[i] = [positions[0], positions[1]];
	}

	for (var i = 0; i < bracketsConfig.length - 1; i++) {
		var braketsType = globalPosition[i];
		var openBrakets = globalPosition[i][0];
		var closeBrakets = globalPosition[i][1];

		for (var j = i + 1; j < bracketsConfig.length; j++) {
			var braketsTypeNext = globalPosition[j];
			var openBraketsNext = globalPosition[j][0];
			var closeBraketsNext = globalPosition[j][1];
			
			for (var k = 0; k < openBrakets.length; k++) {
				if ((openBraketsNext[k] < closeBrakets[k] &&
					closeBraketsNext[k] > closeBrakets[k] &&
					openBrakets[k] < openBraketsNext[k]) ||
					(openBrakets[k] < closeBraketsNext[k] &&
					closeBrakets[k] > closeBraketsNext[k] &&
					openBraketsNext[k] < openBrakets[k]) ){
					return false;
				}
			}
		}
	}
	return true;
}

UIkit.util.ready(function () {

	var inputArea = document.getElementById("inputArea")
	var targetDiv = document.getElementById('suggestionList')
	inputArea.addEventListener("paste", event => {
		// Removing all the items left in the list if something gets pasted again
		while(targetDiv.firstChild) {
			targetDiv.removeChild(targetDiv.firstChild)
		}

		// Adding a spinner after a paste has been done in inputArea for visual effects,
		// and letting the whole file load
		var spinnerDiv = document.createElement("div")
		spinnerDiv.className = "uk-align-center"
		spinnerDiv.setAttribute("uk-spinner","")
		targetDiv.appendChild(spinnerDiv)

		// Removing it after 1.5s
		setTimeout(function () {
			// Tar bort spinnern
			targetDiv.removeChild(spinnerDiv)

			// Creating ul to hold suggestion for coursenames
			var ulItem = document.createElement("ul")
			targetDiv.appendChild(ulItem)

			// Splits the input to find the ones with SUMMARY to add them to array and
			// check if it has already been added, then don't add it, otherwise do
			var inputLines = inputArea.value.split("\n")

			// Checks if it is a valid file
			if (inputLines[0] == "BEGIN:VCALENDAR") {
				console.log("Nu kör jag")
				var summaryArray = []
				inputLines.forEach(function(line) {
					if (line.slice(0,7) == "SUMMARY") {
						if (summaryArray.indexOf(line) == -1) {
							// if the index of the line can't be found, add it to the array
							summaryArray.push(line)
							console.log(line)
						} else {

						}
					}
					var liItem = document.createElement("li")
					liItem.textContent = line
					ulItem.appendChild(liItem)
				})
				inputArea.setAttribute("readonly", "")
			} else {
				console.log("Men inte nu")
				var liItem = document.createElement("li")
				liItem.textContent = "Du har inte klistrat in en giltig iCal fil, försök igen"
				ulItem.appendChild(liItem)
			}
		}, 1500)
	})
	// Clear the text area and all the examples
	var clearButton = document.getElementById('clearAreaButton')
	clearButton.addEventListener("click", event => {
		inputArea.value = ""
		// Removing all the items left in the list if something gets pasted again
		while(targetDiv.firstChild) {
			targetDiv.removeChild(targetDiv.firstChild)
		}
		inputArea.removeAttribute("readonly")
	})
})


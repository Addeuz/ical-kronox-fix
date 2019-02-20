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

		// Removing it after 1.5s and adding all the found 'SUMMARY' strings that probably needs to be changed
		setTimeout(function () {
			// Tar bort spinnern
			targetDiv.removeChild(spinnerDiv)

			// Creating ul to hold suggestion for coursenames
			let ulItem = document.createElement("ul")
			targetDiv.appendChild(ulItem)

			// Splits the input to find the ones with SUMMARY to add them to array and
			// check if it has already been added, then don't add it, otherwise do
			let inputLines = inputArea.value.split('\n')

			// Checks if it is a valid file
			if (inputLines[0] == "BEGIN:VCALENDAR") {
				let summaryArray = []
				for (let inputLine of inputLines) {
					if (inputLine.slice(0,7) == "SUMMARY") {
						// If the line has 'SUMMARY' in the beginning push it to summaryArray
						summaryArray.push(inputLine)
					}
				}
				// Using ternary operator for when there is no 'Sign' in 'Summary'
				// Im chaining them for edge cases when sign or moment doesn't exist
				const lines = summaryArray.map(line => (line.match(/(?:SUMMARY:Kurs.grp: )(.+)(?:Sign:)/))
												? line.match(/(?:SUMMARY:Kurs.grp: )(.+)(?:Sign:)/)[1]
												: line.match(/(?:SUMMARY:Kurs.grp: )(.+)(?:Moment:)/)
												? line.match(/(?:SUMMARY:Kurs.grp: )(.+)(?:Moment:)/)[1]
												: false
												)

				// Filtering the values of the array
				const results = lines.filter((line, i) => {
					if (!lines.slice(0, i).includes(line)) {
						return true
					}
				})

				// Looping throught the results array to append them as list items
				for(let result of results) {
					// Checking if ternery operator form befory returned something or false
					// if it returned false, I don't want it in the list items
					if(result) {
						var liItem = document.createElement('li')
						liItem.textContent = result
						ulItem.appendChild(liItem)
					}
				}
				inputArea.setAttribute("readonly", "")
			} else {

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


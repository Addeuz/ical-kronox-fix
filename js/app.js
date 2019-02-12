UIkit.util.ready(function () {
	var inputArea = document.getElementById("inputArea")
	inputArea.addEventListener("paste", event => {
		// Removing all the items left in the list if something gets pasted again
		var targetDiv = document.getElementById('suggestionList')
		while(targetDiv.firstChild) {
			targetDiv.removeChild(targetDiv.firstChild)
		}
		// Adding a spinner after a paste has been done in inputArea for visual effects
		var spinnerDiv = document.createElement("div")
		spinnerDiv.className = "uk-align-center"
		spinnerDiv.setAttribute("uk-spinner","")
		targetDiv.appendChild(spinnerDiv)

		// Removing it after 1.5s
		setTimeout(function () {
			targetDiv.removeChild(spinnerDiv)
			// Creating a ul with li items and giving it the value of inputArea
			var ulItem = document.createElement("ul")
			targetDiv.appendChild(ulItem)
			var liItem = document.createElement("li")
			liItem.textContent = inputArea.value
			ulItem.appendChild(liItem)
		}, 1500)
	})
})


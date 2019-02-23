UIkit.util.ready(function () {

	let inputArea = document.getElementById("inputArea")
	let targetDiv = document.getElementById('courseList')
	inputArea.addEventListener("paste", event => {
		// Removing all the items left in the list if something gets pasted again
		while(targetDiv.firstChild) {
			targetDiv.removeChild(targetDiv.firstChild)
		}

		// Adding a spinner after a paste has been done in inputArea for visual effects,
		// and letting the whole file load
		let spinnerDiv = document.createElement("div")
		spinnerDiv.className = "uk-align-center"
		spinnerDiv.setAttribute("uk-spinner","")
		targetDiv.appendChild(spinnerDiv)

		// Removing it after 1.5s and adding all the found 'SUMMARY' strings that probably needs to be changed
		setTimeout(function () {
			// Remove the spinner
			targetDiv.removeChild(spinnerDiv)

			// Splits the input to find the ones with SUMMARY to add them to array and
			// check if it has already been added, then don't add it, otherwise do
			let inputLines = inputArea.value.split('\n')

			// Checks if it is a valid file
			if (inputLines[0] == 'BEGIN:VCALENDAR') {
				let summaryArray = []
				for (let inputLine of inputLines) {
					if (inputLine.slice(0,7) == 'SUMMARY') {
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
			    if (results) {
					let h2Item = document.createElement('h2')
					h2Item.classList.add('uk-heading-secondary')
					h2Item.innerHTML = 'Hittade kurser'
					targetDiv.appendChild(h2Item)
				}
				// Looping throught the results array to append them as list items
				for(let result of results) {
					// Checking if ternery operator from before returned something or false
					// if it returned false, I don't want it in the list items
					if(result) {

						let resultIndex = results.indexOf(result)

						// One div DOM element per result
						let courseListItemDiv = document.createElement('div')
						courseListItemDiv.setAttribute('uk-grid','')
						courseListItemDiv.setAttribute('id','courseListItem')
						courseListItemDiv.classList.add('uk-width-1-1', 'uk-padding-small', 'uk-padding-remove-left', 'uk-margin-remove-top')
						courseListItemDiv.style.borderTop = '1px solid #e5e5e5'
						targetDiv.appendChild(courseListItemDiv)

						let courseNameSpanDiv = document.createElement('div')
						courseNameSpanDiv.classList.add('uk-width-5-6')
						courseListItemDiv.appendChild(courseNameSpanDiv)

						let courseNameSpan = document.createElement('span')
						courseNameSpan.classList.add('uk-flex', 'uk-flex-middle', 'uk-height-1-1', 'courseNameSpan')
						courseNameSpan.setAttribute('inputId', resultIndex)
						courseNameSpan.appendChild(document.createTextNode(result))
						courseNameSpanDiv.appendChild(courseNameSpan)

						let courseEditButtonDiv = document.createElement('div')
						courseEditButtonDiv.classList.add('uk-width-1-6')
						courseListItemDiv.appendChild(courseEditButtonDiv)

						let courseEditButton = document.createElement('button')
						courseEditButton.setAttribute('id', 'editButton'+resultIndex)
						courseEditButton.setAttribute('uk-toggle', 'target: #editDiv'+resultIndex)
						courseEditButton.classList.add('uk-button', 'uk-button-default', 'uk-align-right', 'uk-margin-remove')
						courseEditButton.innerHTML = 'Redigera'
						courseEditButtonDiv.appendChild(courseEditButton)

						let courseEditNameDiv = document.createElement('div')
						courseEditNameDiv.setAttribute('uk-grid', '')
						courseEditNameDiv.setAttribute('hidden', '')
						courseEditNameDiv.setAttribute('id', 'editDiv'+resultIndex)
						courseEditNameDiv.classList.add('uk-margin-small-top')
						courseListItemDiv.appendChild(courseEditNameDiv)

						let editInputNameDiv = document.createElement('div')
						editInputNameDiv.classList.add('uk-width-1-2')
						courseEditNameDiv.appendChild(editInputNameDiv)

						let editInputName = document.createElement('input')
						editInputName.setAttribute('id', 'editInput'+resultIndex)
						editInputName.setAttribute('type', 'text')
						editInputName.setAttribute('inputId', resultIndex)
						editInputName.classList.add('uk-input', 'editInputName')
						editInputName.style.width = "1000px"
						editInputNameDiv.appendChild(editInputName)

						let editSaveButtonDiv = document.createElement('div')
						editSaveButtonDiv.classList.add('uk-width-1-2')
						courseEditNameDiv.appendChild(editSaveButtonDiv)

						let editSaveButton = document.createElement('button')
						editSaveButton.setAttribute('id', 'saveEditButton'+resultIndex)
						editSaveButton.setAttribute('inputId', resultIndex)
						editSaveButton.classList.add('uk-button', 'uk-button-primary', 'uk-margin-remove', 'editSaveButton')
						editSaveButton.innerHTML = 'Spara'
						editSaveButtonDiv.appendChild(editSaveButton)
						}
					}
					// Selecting the edit-save buttons to add eventListener to it.
					const editButtons = [].slice.call(document.querySelectorAll('.editSaveButton'))
					const courseNames = [].slice.call(document.querySelectorAll('.courseNameSpan'))
					console.log(editButtons)
					console.log(courseNames)
					for(let editButton of editButtons) {
						editButton.addEventListener('click', event => {
							// Getting the inputId from the button
							const inputId = event.target.attributes[1].nodeValue
							// Getting the value in the input field
							const inputValue = document.getElementById('editInput'+inputId).value
							const courseNameSpan = courseNames[inputId]
							// Putting value in the input to the course name
							courseNameSpan.innerHTML = inputValue
						})
					}
					inputArea.setAttribute('readonly', '')
				} else {
					let h4Item = document.createElement('h4')
					h4Item.innerHTML = 'Du har ej klistrat in en giltig .ics fil, var vänlig försök igen'
					targetDiv.appendChild(h4Item)
				}
		}, 1500)
	})
	// Clear the text area and all the examples
	let clearButton = document.getElementById('clearAreaButton')
	clearButton.addEventListener('click', event => {
		inputArea.value = ''
		// Removing all the items left in the list if something gets pasted again
		while(targetDiv.firstChild) {
			targetDiv.removeChild(targetDiv.firstChild)
		}
		inputArea.removeAttribute('readonly')
	})
})

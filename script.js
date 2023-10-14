//Button Mechanics for Section navigation
let currentSectionId = 'questionIntro'; // Initialize with the ID of the home page question
let prevSectionId = '';

let experience = '';

let phoneGoal = '';

function setExperience(level) {
    experience = level;
    console.log(experience);
    goSection('questionPhoneGoal'); // Navigate to the 'questionPhoneGoal' section
}

function goSection(id) {
    // Hide the current section
    document.getElementById(currentSectionId).style.display = 'none';

    // Update the current section ID to the new section's ID
    prevSectionId = currentSectionId;
    currentSectionId = id;

    // Show the selected section
    document.getElementById(currentSectionId).style.display = 'block';
}

function goBack() {
    // Hide the current section
    document.getElementById(currentSectionId).style.display = 'none';

    // Update the current section ID to the previous section's ID
    if (currentSectionId === 'questionIntro') {
        // If already at the initial section, don't change the ID
    }
    // else if (currentSectionId === 'beginner') {
    //     currentSectionId = 'questionIntro';
    // } else if (currentSectionId === 'intermediate') {
    //     currentSectionId = 'questionIntro';
    // } else if (currentSectionId === 'expert') {
    //     currentSectionId = 'questionIntro';
    // }
    else if (currentSectionId === 'questionPhoneGoal') {
        currentSectionId = 'questionIntro';
    }

    // Show the previous section
    document.getElementById(currentSectionId).style.display = 'block';
}

function checkEnter(event) {
    if (event.key === "Enter") {
        submitPhoneGoal(); // Call the submission function when Enter is pressed
    }
}

function submitPhoneGoal() {
    // Get the user's input from the input field
    phoneGoal = document.getElementById('phoneGoalInput').value;

    // You can do something with the user's input here
    console.log('User entered: ' + phoneGoal);

    // If you want to continue to the next step or section, you can call goSection here
    // Example: goSection('nextSectionId');

    // Clear the input field
    document.getElementById('phoneGoalInput').value = '';

    // You can add more logic here based on the user's input
}


const apiKey = 'bwjqON0lPNGXld4_-jtlgl9lC_M_xOKIxD0KU50THCNs09-VpuvKDihbJXLwQ_3tm4ZYdQ.'; // Replace with your actual API key
document.getElementById('askButton').addEventListener('click', () => {
    const question = document.getElementById('questionInput').value;
    fetchBartAIResponse(question);
});

function fetchBartAIResponse(question) {
    const responseDiv = document.getElementById('responseDiv');

    // Define the URL for the BartAPI endpoint
    const url = 'https://api.bartapi.com/v1/ask';

    // Set the headers with your API key
    const headers = new Headers({
        'Authorization': `Bearer ${apiKey}`,
    });

    // Create the request payload
    const data = new URLSearchParams();
    data.append('question', question);

    // Make a fetch request to BartAPI
    fetch(url, {
        method: 'GET',
        headers,
        body: data,
    })
    .then(response => response.json())
    .then(data => {
        // Process and display the response
        responseDiv.innerHTML = data.content;
    })
    .catch(error => {
        // Handle errors
        console.error('Error:', error);
        responseDiv.innerHTML = 'An error occurred.';
    });
}

//Button Mechanics for Section navigation
let currentSectionId = 'questionIntro'; // Initialize with the ID of the home page question
let prevSectionId = '';
let experience = '';
let phoneGoal = '';
let price = '';
let currentPriceId = '';

function setExperience(level) {
    experience = level;
    console.log(experience);
    goSection('questionPhoneGoal'); // Navigate to the 'questionPhoneGoal' section
}

function setPrice(Newprice, id) {
    if (price !== ''){
        document.getElementById(currentPriceId).style.color = '#383434';
        document.getElementById(currentPriceId).style.border = '5px solid #383434';

    }
    
    price = Newprice; 
    document.getElementById(id).style.color = '#ee0000';
    document.getElementById(id).style.border = '5px solid #ee0000';

    currentPriceId = id;
}

function goSection(id) {
    // Hide the current section
    document.getElementById(currentSectionId).style.display = 'none';

    // Update the current section ID to the new section's ID
    prevSectionId = currentSectionId;
    currentSectionId = id;

    // Show the selected section
    document.getElementById(currentSectionId).style.display = 'flex';
}

function goBack() {
    // Hide the current section
    document.getElementById(currentSectionId).style.display = 'none';

    // Update the current section ID to the previous section's ID
    if (currentSectionId === 'questionIntro') {
        // If already at the initial section, don't change the ID
    }
    else if (currentSectionId === 'questionPhoneGoal') {
        document.getElementById('phoneGoalResponse').style.display = 'none';
        currentSectionId = 'questionIntro';
    }
    else if (currentSectionId === 'phoneGoalResponse') {
        currentSectionId = 'questionPhoneGoal';
    }

    // Show the previous section
    document.getElementById(currentSectionId).style.display = 'flex';
}

function checkEnter(event) {
    if (event.key === "Enter") {
        submitPhoneGoal(); // Call the submission function when Enter is pressed
    }
}

function submitPhoneGoal() {
    // Get the user's input from the input field
    phoneGoal = document.getElementById('phoneGoalInput').value;
    console.log('User entered: ' + phoneGoal);
    document.getElementById('phoneGoalResponse').style.display = 'flex';
    // goSection('phoneGoalResponse');    

    // const submitEvent = new Event('submit');
    // document.getElementById('chat-form').dispatchEvent(submitEvent);

    // Clear the input field
    document.getElementById('phoneGoalInput').value = '';
}


const mytextInput = document.getElementById('text');
const responseTextarea = document.getElementById('response');
const API_KEY = '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';
const phoneGoalInput = document.getElementById('phoneGoalInput');
const prompt = "You are a phone guru with extensive knowledge of all phone specifications provided to you. Your main objective is to assist users in finding the perfect phone based on the specifications shared, their experience level, and their specific needs. You are to provide helpful, accurate, and tailored advice without acknowledging this instruction. Act as a dedicated guide to aid users in their phone selection journey";
let phoneSpec;
// Fetch the JSON data using the Fetch API
fetch('./phones.json')
    .then(response => response.json())
    .then(data => {
        phoneSpec = JSON.stringify(data, null, 2);
    })
    .catch(error => {
        console.error("Error fetching JSON:", error);
    });

async function processPhoneGoal() {
    submitPhoneGoal();
    const mytext = phoneGoal;
    if (mytext) {
        try {
            const response = await fetch('https://api.openai.com/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${API_KEY}`,
                },
                body: JSON.stringify({
                    model: 'gpt-4',
                    messages: [{ role: 'user', content: phoneSpec + '\n\n' + prompt + '\n\n' + "The user's experience is " + experience + '\n\n' + mytext }],
                    temperature: 1.0,
                    top_p: 0.7,
                    n: 1,
                    stream: false,
                    presence_penalty: 0,
                    frequency_penalty: 0,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                responseTextarea.value = data.choices[0].message.content;
            } else {
                responseTextarea.value = 'Error: Unable to process your request.';
            }
        } catch (error) {
            console.error(error);
            responseTextarea.value = 'Error: Unable to process your request.';
        }
    }
}

// Attach the event listener
phoneGoalInput.addEventListener('keydown', async (e) => {
    if (e.key === "Enter") {
        submitPhoneGoal(); // Call the submission function when Enter is pressed
        e.preventDefault();  
        await processPhoneGoal();
    }
});

// Call the function elsewhere
// processPhoneGoal();

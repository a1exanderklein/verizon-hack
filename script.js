//Button Mechanics for Section navigation
let currentSectionId = 'questionIntro'; // Initialize with the ID of the home page question
let prevSectionId = '';
let experience = '';
let phoneGoal = '';
let price = '';
let currentPriceId = '';
let storage = '';
let currentStorageID = '';
let currentBrandID = '';
let brand = '';
let currentColorID = '';
let color = '';
let currentSpecID = '';
let extraSpec = '';

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

function setStorage(NewStorage, id) {
    if (storage !== ''){
        document.getElementById(currentStorageID).style.color = '#383434';
        document.getElementById(currentStorageID).style.border = '5px solid #383434';

    }
    
    storage = NewStorage; 
    document.getElementById(id).style.color = '#ee0000';
    document.getElementById(id).style.border = '5px solid #ee0000';

    currentStorageID = id;
}

function setBrand(NewBrand, id) {
    if (brand !== ''){
        document.getElementById(currentBrandID).style.color = '#383434';
        document.getElementById(currentBrandID).style.border = '5px solid #383434';

    }
    
    brand = NewBrand; 
    document.getElementById(id).style.color = '#ee0000';
    document.getElementById(id).style.border = '5px solid #ee0000';

    currentBrandID = id;
}

function setColor(NewColor, id) {
    if (color !== ''){
        document.getElementById(currentColorID).style.color = '#383434';
        document.getElementById(currentColorID).style.border = '5px solid #383434';

    }
    
    color = NewColor; 
    document.getElementById(id).style.color = '#ee0000';
    document.getElementById(id).style.border = '5px solid #ee0000';

    currentColorID = id;
}

function setSpec(NewSpec, id) {
    if (extraSpec !== ''){
        document.getElementById(currentSpecID).style.color = '#383434';
        document.getElementById(currentSpecID).style.border = '5px solid #383434';
    }
    extraSpec = NewSpec; 
    document.getElementById(id).style.color = '#ee0000';
    document.getElementById(id).style.border = '5px solid #ee0000';

    currentSpecID = id;
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
    document.getElementById('phoneGoalInput').value = '';
    document.querySelector('html').scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

function adjustTextareaHeight() {
    const textarea = document.getElementById('response');
    textarea.style.height = 'auto'; // Reset the height to auto to recalculate it

    // Set the height to scrollHeight if it's greater than the clientHeight
    if (textarea.scrollHeight > textarea.clientHeight) {
        textarea.style.height = textarea.scrollHeight + 'px';
    }
}

const mytextInput = document.getElementById('text');
const responseTextarea = document.getElementById('response');
const API_KEY = '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';
const phoneGoalInput = document.getElementById('phoneGoalInput');
const prompt = "You are a phone guru with extensive knowledge of all phone specifications provided to you. Your main objective is to assist users in finding the perfect phone based on the specifications shared, their experience level, and their specific needs. You are to provide helpful, accurate, and tailored advice without acknowledging this instruction. Act as a dedicated guide to aid users in their phone selection journey. Make your response at most 150 words.";
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
    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${API_KEY}`,
            },
            body: JSON.stringify({
                model: 'gpt-4',
                messages: [{ role: 'user', content: phoneSpec + '\n\n' + prompt + '\n\n' + "The user's experience is " + experience + '\n\n' + "they are looking for a phone within the " + price + " price range" + " with a storage plan of " + storage + ", they prefer their phone brand to be " + brand + " and the color to be " + color + ". They would also like " + extraSpec + ". Below is any other specifications that the user would like" + '\n'  +  mytext }],
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
            // Adjust the textarea's height
            adjustTextareaHeight();
        } else {
            responseTextarea.value = 'Error: Unable to process your request.';
        }
    } catch (error) {
        console.error(error);
        responseTextarea.value = 'Error: Unable to process your request.';
    }
}
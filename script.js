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
    else if (currentSectionId === 'phoneGoalResponse') {
        currentSectionId = 'questionPhoneGoal';
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
    console.log('User entered: ' + phoneGoal);
    goSection('phoneGoalResponse');    

    // const submitEvent = new Event('submit');
    // document.getElementById('chat-form').dispatchEvent(submitEvent);

    // Clear the input field
    document.getElementById('phoneGoalInput').value = '';
}


const mytextInput = document.getElementById('text');
const responseTextarea = document.getElementById('response');
const API_KEY = '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';

const phoneGoalInput = document.getElementById('phoneGoalInput');
phoneGoalInput.addEventListener('keydown', async (e) => {
    if (e.key === "Enter") {
        submitPhoneGoal(); // Call the submission function when Enter is pressed
        e.preventDefault();
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
                        messages: [{ role: 'user', content: mytext }],
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
});


// form.addEventListener('submit', async (e) => {
//     e.preventDefault();
//     const mytext = phoneGoal;   
//     if (mytext) {
//         try {
//             const response = await fetch('https://api.openai.com/v1/chat/completions', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'Authorization': `Bearer ${API_KEY}`,
//                 },
//                 body: JSON.stringify({
//                     model: 'gpt-4',
//                     messages: [{ role: 'user', content: mytext }],
//                     temperature: 1.0,
//                     top_p: 0.7,
//                     n: 1,
//                     stream: false,
//                     presence_penalty: 0,
//                     frequency_penalty: 0,
//                 }),
//             });

//             if (response.ok) {
//                 const data = await response.json();
//                 responseTextarea.value = data.choices[0].message.content;
//             } else {
//                 responseTextarea.value = 'Error: Unable to process your request.';
//             }
//         } catch (error) {
//             console.error(error);
//             responseTextarea.value = 'Error: Unable to process your request.';
//         }
//     }
// });
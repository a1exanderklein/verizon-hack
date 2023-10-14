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
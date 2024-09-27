document.getElementById('paymentForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form from submitting the default way

    // Get form values
    const fullName = document.getElementById('fullName').value;
    const phoneNumber = document.getElementById('phoneNumber').value;
    const email = document.getElementById('email').value;

    // Calculate total payment amount based on visitor status and hire options
    let totalAmount = 30; // Default visitor fee
    if (document.getElementById('clubs').checked) totalAmount += parseInt(document.getElementById('clubs').value);
    if (document.getElementById('buggie').checked) totalAmount += parseInt(document.getElementById('buggie').value);

    // Check if visitor is a member
    const isMember = document.getElementById('isMember').checked;
    const membershipNumber = document.getElementById('membershipNumber').value;

    // If member, redirect to the member portal
    if (isMember && membershipNumber) {
        window.location.href = 'https://hvgolfclub.thymesoft.net';
        return;
    }

    // Process payment for non-members using Square
    processPayment(fullName, phoneNumber, email, totalAmount);
});

// Initialize Square Payments
const payments = Square.payments('YOUR_APPLICATION_ID', 'YOUR_LOCATION_ID');

// Function to initialize and display the Square card payment form
async function initializeCard(payments) {
    const card = await payments.card(); // Create a new card object
    await card.attach('#card-container'); // Attach card form to the container on the page
    return card;
}

// Function to tokenize and handle the payment
async function tokenize(paymentMethod) {
    const result = await paymentMethod.tokenize();
    
    // If the tokenization is successful, you will get a token to process the payment
    if (result.status === 'OK') {
        alert('Payment successful! Token: ' + result.token);
        // Normally, you would send the token to your backend for payment processing
    } else {
        alert('Payment failed: ' + result.errors[0].message);
    }
}

// Initialize the card payment form
const card = await initializeCard(payments);

// Event listener for the "Pay Now" button
document.getElementById('card-button').addEventListener('click', async function() {
    await tokenize(card); // Tokenize and handle payment when "Pay Now" is clicked
});

function processPayment(name, phone, email, amount) {
    // This function now initializes the Square payment form
    alert(`Proceeding to payment of $${amount} for ${name}. Please enter your card details...`);

    // Simulate successful payment (you would process with Square)
    document.getElementById('responseMessage').innerText = `Payment of $${amount} was successful!`;
}

function toggleMemberInput() {
    const isMember = document.getElementById('isMember').checked;
    const memberField = document.getElementById('memberNumberField');
    const paymentSection = document.getElementById('paymentSection');
    
    if (isMember) {
        memberField.style.display = 'block'; // Show member number input if they select "I am a member"
        paymentSection.style.display = 'none'; // Hide payment section for members
    } else {
        memberField.style.display = 'none'; // Hide member number input if they uncheck the member box
        paymentSection.style.display = 'block'; // Show payment section for non-members
    }
}
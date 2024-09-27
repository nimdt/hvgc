document.getElementById('paymentForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form from submitting the default way

    // Get form values
    const fullName = document.getElementById('fullName').value;
    const phoneNumber = document.getElementById('phoneNumber').value;
    const email = document.getElementById('email').value;

    // Generate a mock MAC address for the demo
    const macAddress = generateMockMacAddress();

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

    // Mock check for existing MAC address to prevent multiple charges in one day
    if (checkIfMacExists(macAddress)) {
        alert('You have already paid for today.');
        return;
    }

    // Process payment for non-members using Square
    processPayment(fullName, phoneNumber, email, totalAmount, macAddress);
});

// Function to generate a mock MAC address (for demo purposes)
function generateMockMacAddress() {
    const hexDigits = "0123456789ABCDEF";
    let macAddress = "";
    for (let i = 0; i < 6; i++) {
        macAddress += hexDigits.charAt(Math.floor(Math.random() * 16));
        macAddress += hexDigits.charAt(Math.floor(Math.random() * 16));
        if (i !== 5) macAddress += ":";
    }
    return macAddress;
}

// Function to simulate MAC address check
let macDatabase = {}; // Mock storage for MAC addresses

function checkIfMacExists(macAddress) {
    const today = new Date().toLocaleDateString();
    return macDatabase[macAddress] && macDatabase[macAddress] === today;
}

// Function to process payment and log the MAC address
function processPayment(name, phone, email, amount, macAddress) {
    // Log the MAC address with the current date
    const today = new Date().toLocaleDateString();
    macDatabase[macAddress] = today;

    // Simulate payment processing
    alert(`Processing payment of $${amount} for ${name}. MAC Address: ${macAddress}`);
    
    // Simulate successful payment
    document.getElementById('responseMessage').innerText = `Payment of $${amount} was successful! MAC Address logged: ${macAddress}`;
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
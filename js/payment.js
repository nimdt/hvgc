document.getElementById('paymentForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form from submitting the default way

    // Get form values
    const fullName = document.getElementById('fullName').value;
    const phoneNumber = document.getElementById('phoneNumber').value;
    const email = document.getElementById('email').value;
    
    // Check if visitor is over 18
    const isOver18 = document.getElementById('over18').checked;
    
    // Determine payment method
    const paymentMethod = document.querySelector('input[name="paymentMethod"]:checked').value;

    // If paying with cash, handle voucher number
    if (paymentMethod === 'cash') {
        const voucherNumber = document.getElementById('voucherNumber').value;
        if (!voucherNumber || voucherNumber.length !== 4 || isNaN(voucherNumber)) {
            alert('Please enter a valid 4-digit payment voucher number.');
            return;
        }

        // Process cash payment (for demo, we log the voucher number)
        alert(`Payment of cash with voucher number ${voucherNumber} recorded for ${fullName}.`);
        document.getElementById('responseMessage').innerText = `Cash payment recorded. Voucher number: ${voucherNumber}`;
        return;
    }

    // Calculate total amount
    let totalAmount = calculateTotalAmount(isOver18); // Pass the over-18 status to the function
    processPayment(fullName, phoneNumber, email, totalAmount);
});

// Function to calculate total amount based on over-18 checkbox
function calculateTotalAmount(isOver18) {
    let totalAmount = isOver18 ? 30 : 10; // $30 if over 18, otherwise $10
    if (document.getElementById('clubs').checked) totalAmount += parseInt(document.getElementById('clubs').value);
    if (document.getElementById('buggie').checked) totalAmount += parseInt(document.getElementById('buggie').value);
    return totalAmount;
}

// Show/Hide voucher number field based on payment method
document.querySelectorAll('input[name="paymentMethod"]').forEach((element) => {
    element.addEventListener('change', function() {
        if (this.value === 'cash') {
            document.getElementById('voucherField').style.display = 'block';
            document.getElementById('card-container').style.display = 'none'; // Hide card payment form
        } else {
            document.getElementById('voucherField').style.display = 'none';
            document.getElementById('card-container').style.display = 'block'; // Show card payment form
        }
    });
});

function processPayment(name, phone, email, amount) {
    // This function handles card payments with Square (already implemented)
    alert(`Processing card payment of $${amount} for ${name}.`);
}
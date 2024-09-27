document.getElementById('paymentForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form from submitting the default way

    // Get form values
    const fullName = document.getElementById('fullName').value;
    const phoneNumber = document.getElementById('phoneNumber').value;
    const email = document.getElementById('email').value;

    // Determine payment method
    const paymentMethod = document.querySelector('input[name="paymentMethod"]:checked').value;

    // If paying with cash, handle voucher number
    if (paymentMethod === 'cash') {
        const voucherNumber = document.getElementById('voucherNumber').value;
        if (!voucherNumber) {
            alert('Please enter your payment voucher number.');
            return;
        }

        // Process cash payment (for demo, we log the voucher number)
        alert(`Payment of cash with voucher number ${voucherNumber} recorded for ${fullName}.`);
        document.getElementById('responseMessage').innerText = `Cash payment recorded. Voucher number: ${voucherNumber}`;
        return;
    }

    // If paying with card, continue to process the payment through Square
    const totalAmount = calculateTotalAmount(); // Assume you have a function to calculate total
    processPayment(fullName, phoneNumber, email, totalAmount);
});

// Function to calculate total amount (you can adjust this as needed)
function calculateTotalAmount() {
    let totalAmount = 30; // Default visitor fee
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
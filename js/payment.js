let playerCount = 1;
let totalAmount = 0; // Initialize the total amount

// Function to toggle the voucher field for cash payments
function toggleVoucherField() {
    const voucherField = document.getElementById('voucherField');
    const cashPayment = document.getElementById('cashPayment').checked;

    if (cashPayment) {
        voucherField.style.display = 'block'; // Show voucher field if paying by cash
    } else {
        voucherField.style.display = 'none'; // Hide voucher field if paying by card
    }
}

// Function to validate the voucher number (must be exactly 4 digits)
function validateVoucherNumber() {
    const voucherNumber = document.getElementById('voucherNumber').value;
    if (voucherNumber.length !== 4 || isNaN(voucherNumber)) {
        alert("Please enter a valid 4-digit voucher number.");
        return false;
    }
    return true;
}

// Function to calculate the total amount based on player selections
function calculateTotal() {
    totalAmount = 0; // Reset total amount
    
    // Loop through all players, starting with Player 1
    for (let i = 1; i <= playerCount; i++) {
        const ageGroup = document.getElementById(`ageGroup${i}`)?.value;
        if (ageGroup === "under18") {
            totalAmount += 10; // Under 18: $10
        } else if (ageGroup) {
            totalAmount += 30; // 18 and older: $30
        }

        // Add hire options costs
        const clubs = document.getElementById(`clubs${i}`)?.checked ? parseInt(document.getElementById(`clubs${i}`).value) : 0;
        const buggie = document.getElementById(`buggie${i}`)?.checked ? parseInt(document.getElementById(`buggie${i}`).value) : 0;
        totalAmount += clubs + buggie;
    }

    updateTotalDisplay(); // Update the displayed total
}

// Update the total display on the page
function updateTotalDisplay() {
    document.getElementById('totalDisplay').innerText = `Total: $${totalAmount}`;
}

// Add Player Button functionality
document.getElementById('addPlayerButton').addEventListener('click', function() {
    playerCount++;
    const additionalPlayers = document.getElementById('additionalPlayers');
    
    // Create new fields for the additional player
    const newPlayerDiv = document.createElement('div');
    newPlayerDiv.classList.add('player');
    newPlayerDiv.dataset.player = playerCount;
    newPlayerDiv.id = `player${playerCount}`; // Assign an ID to each player div
    
    newPlayerDiv.innerHTML = `
        <h3>Player ${playerCount}</h3>
        <div class="form-group">
            <label for="fullName${playerCount}">Full Name</label>
            <input type="text" id="fullName${playerCount}" name="fullName${playerCount}" required>
        </div>
        <div class="form-group">
            <label for="email${playerCount}">Email (Optional)</label>
            <input type="email" id="email${playerCount}" name="email${playerCount}">
        </div>
        <div class="form-group">
            <label for="phoneNumber${playerCount}">Phone Number (Optional)</label>
            <input type="tel" id="phoneNumber${playerCount}" name="phoneNumber${playerCount}">
        </div>
        <div class="form-group">
            <label for="ageGroup${playerCount}">Please select the player's age:</label>
            <select id="ageGroup${playerCount}" name="ageGroup${playerCount}" required onchange="calculateTotal()">
                <option value="">Select age group</option>
                <option value="under18">Under 18</option>
                <option value="18-25">18 - 25</option>
                <option value="25-45">25 - 45</option>
                <option value="45-65">45 - 65</option>
                <option value="65plus">65+</option>
            </select>
        </div>
        <!-- Hire options for each player -->
        <div class="form-group">
            <label for="hireOptions${playerCount}">Additional Hire Options</label>
            <input type="checkbox" id="clubs${playerCount}" name="hireOptions${playerCount}" value="5" onchange="calculateTotal()"> Clubs Hire - $5<br>
            <input type="checkbox" id="buggie${playerCount}" name="hireOptions${playerCount}" value="5" onchange="calculateTotal()"> Buggie Hire - $5
            <p><small>*Must give 2 days notice for hire options. Call 03 6264 1737.</small></p>
        </div>
        <button type="button" class="removePlayerButton" onclick="removePlayer(${playerCount})">Remove Player</button>
    `;
    additionalPlayers.appendChild(newPlayerDiv);
    calculateTotal(); // Update the total when a new player is added
});

// Function to remove a player
function removePlayer(playerId) {
    const playerDiv = document.getElementById(`player${playerId}`);
    if (playerDiv) {
        playerDiv.remove(); // Remove the player div
        calculateTotal(); // Recalculate the total
    }
}

// Handle form submission
document.getElementById('paymentForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form from submitting the default way

    const cashPayment = document.getElementById('cashPayment').checked;

    // If paying by cash, validate the voucher number
    if (cashPayment) {
        if (!validateVoucherNumber()) {
            return; // Stop if voucher number is invalid
        }
        alert(`Please pay a total of $${totalAmount} in cash and place the voucher with your number.`);
        document.getElementById('responseMessage').innerText = `Payment of $${totalAmount} to be made in cash. Voucher number recorded.`;
        return;
    }

    // If paying by card, proceed to Square payment process (Square API integration needed here)
    alert(`Proceeding to card payment for $${totalAmount}`);
    // Square API processing code goes here

    document.getElementById('responseMessage').innerText = `Payment of $${totalAmount} was successful!`;
});
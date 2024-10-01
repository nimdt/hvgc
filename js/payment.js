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

    let playerData = [];

    // Ensure Player 1 information is filled out
    const fullName1 = document.getElementById('fullName1').value;
    const email1 = document.getElementById('email1').value;
    const phoneNumber1 = document.getElementById('phoneNumber1').value;
    const ageGroup1 = document.getElementById('ageGroup1').value;

    if (!fullName1 || !email1 || !phoneNumber1 || !ageGroup1) {
        alert('Player 1 information is required!');
        return; // Stop form submission if Player 1 information is incomplete
    }

    // Add Player 1 to player data
    playerData.push({
        fullName: fullName1,
        email: email1,
        phoneNumber: phoneNumber1,
        ageGroup: ageGroup1,
        hireOptions: {
            clubs: document.getElementById('clubs1').checked ? 5 : 0,
            buggie: document.getElementById('buggie1').checked ? 5 : 0
        }
    });

    // Loop through all additional players
    for (let i = 2; i <= playerCount; i++) {
        const fullName = document.getElementById(`fullName${i}`)?.value;
        const email = document.getElementById(`email${i}`)?.value;
        const phoneNumber = document.getElementById(`phoneNumber${i}`)?.value;
        const ageGroup = document.getElementById(`ageGroup${i}`)?.value;

        if (fullName && ageGroup) {
            // Collect player data for processing
            playerData.push({
                fullName: fullName,
                email: email || 'N/A', // Optional email
                phoneNumber: phoneNumber || 'N/A', // Optional phone number
                ageGroup: ageGroup,
                hireOptions: {
                    clubs: document.getElementById(`clubs${i}`)?.checked ? 5 : 0,
                    buggie: document.getElementById(`buggie${i}`)?.checked ? 5 : 0
                }
            });
        }
    }

    // Process payment for non-members and display player information
    processPayment(totalAmount, playerData);
});

function processPayment(totalAmount, playerData) {
    let playersInfo = "";
    playerData.forEach(player => {
        playersInfo += `\nPlayer: ${player.fullName}, Email: ${player.email}, Phone: ${player.phoneNumber}, Age Group: ${player.ageGroup}, Clubs: ${player.hireOptions.clubs}, Buggie: ${player.hireOptions.buggie}`;
    });

    alert(`Processing payment of $${totalAmount} for the following players: ${playersInfo}`);

    // Simulate a successful payment
    document.getElementById('responseMessage').innerText = `Payment of $${totalAmount} was successful for the following players: ${playersInfo}`;
}
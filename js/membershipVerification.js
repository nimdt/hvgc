// Function to read the CSV file
function loadCSV(callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'membership.csv', true); // Load your local membership.csv
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var csvData = xhr.responseText;
            callback(parseCSV(csvData));
        } else if (xhr.status !== 200) {
            console.error("Error loading CSV file, using fallback data.");
            callback(null);  // Trigger fallback to hardcoded data
        }
    };
    xhr.send();
}

// Function to parse CSV data
function parseCSV(data) {
    var lines = data.split("\n");
    var result = [];

    // Assume first line is header, so start from second line
    for (var i = 1; i < lines.length; i++) {
        var line = lines[i].trim();
        if (line) {
            var fields = line.split(",");
            result.push({
                name: fields[0].trim(),
                membershipNumber: fields[1].trim()
            });
        }
    }
    return result;
}

// Verify membership number
document.getElementById("verifyMember").addEventListener("click", function() {
    const membershipNumber = document.getElementById("membershipNumber").value;

    // Load the CSV file and verify
    loadCSV(function(members) {
        if (members) {
            const member = members.find(m => m.membershipNumber === membershipNumber);

            // Show message based on whether the membership is valid
            if (member) {
                document.getElementById("memberStatusMessage").innerText = `Membership verified for ${member.name}!`;
                document.getElementById("memberPortalButton").style.display = "block";  // Show portal button if valid
            } else {
                document.getElementById("memberStatusMessage").innerText = "Invalid membership number. Please try again.";
                document.getElementById("memberPortalButton").style.display = "none";  // Hide portal button if invalid
            }
        } else {
            // Fallback to hardcoded data
            const fallbackMembers = [
                { name: "Neil Randle", membershipNumber: "7622000868" },
                { name: "Test 1", membershipNumber: "7622000001" },
                { name: "Test 2", membershipNumber: "7622000002" }
            ];
            const member = fallbackMembers.find(m => m.membershipNumber === membershipNumber);

            if (member) {
                document.getElementById("memberStatusMessage").innerText = `Membership verified for ${member.name}!`;
                document.getElementById("memberPortalButton").style.display = "block";  // Show portal button if valid
            } else {
                document.getElementById("memberStatusMessage").innerText = "Invalid membership number. Please try again.";
                document.getElementById("memberPortalButton").style.display = "none";  // Hide portal button if invalid
            }
        }
    });
});

// Redirect to member portal
function goToMemberPortal() {
    window.location.href = 'https://hvgolfclub.thymesoft.net';
}
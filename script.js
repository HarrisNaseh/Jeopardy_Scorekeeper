document.getElementById('confirmTeamNumber').addEventListener('click', function() {
    var numTeams = document.getElementById('numTeams').value;
    if(numTeams > 0){
        setupTeamNamesInput(numTeams);
    }
    
});

function setupTeamNamesInput(numTeams) {
    document.getElementById('teamNumberSection').style.display = 'none';

    var teamNamesForm = document.getElementById('teamNamesForm');
    for (var i = 0; i < numTeams; i++) {
        var input = document.createElement('input');
        input.type = 'text';
        input.placeholder = 'Team ' + (i + 1) + ' Name';
        teamNamesForm.appendChild(input);
    }

    document.getElementById('teamNamesSection').style.display = 'block';
}

document.getElementById('confirmTeamNames').addEventListener('click', function() {
    var teamNames = [];
    var inputs = document.getElementById('teamNamesForm').getElementsByTagName('input');
    for (var i = 0; i < inputs.length; i++) {
        if(inputs[i].value === ""){
            teamNames.push("Team " + (i + 1));
        }else{
            teamNames.push(inputs[i].value);
        }
        
    }
    setupScoreManagement(teamNames);
});


function setupScoreManagement(teamNames) {
    document.getElementById('teamNamesSection').style.display = 'none';
    // Clear previous content
    var scoreManagementSection = document.getElementById('scoreManagementSection');
    scoreManagementSection.innerHTML = '';

    teamNames.forEach(function(teamName, index) {
        // Create the card element
        var teamCard = document.createElement('div');
        teamCard.className = 'teamCard';
        
        // Create the header with the team name
        var header = document.createElement('div');
        header.className = 'header';
        var nameLabel = document.createElement('h3');
        nameLabel.textContent = teamName;
        header.appendChild(nameLabel);
        teamCard.appendChild(header);

        // Container for preset score buttons
        var presetButtonContainer = document.createElement('div');
        presetButtonContainer.className = 'presetButtonContainer';

        // Create preset score buttons
        ['+200', '+400', '+600', '+800', '+1000', '-200', '-400', '-600', '-800', '-1000'].forEach(function(amount) {
            var scoreButton = document.createElement('button');
            scoreButton.textContent = amount;
            if (amount.startsWith('-')) {
                scoreButton.classList.add('negative');
            }
            scoreButton.onclick = function() {
                updateScore(index, parseInt(amount));
            };
            presetButtonContainer.appendChild(scoreButton);
        });

        teamCard.appendChild(presetButtonContainer);

        // Container for custom score input and button
        var customScoreContainer = document.createElement('div');
        customScoreContainer.className = 'customScoreContainer';

        // Custom score input
        var customScoreInput = document.createElement('input');
        customScoreInput.type = 'number';
        customScoreInput.className = 'customScoreInput';
        customScoreInput.placeholder = 'Custom Score';
        customScoreContainer.appendChild(customScoreInput);

        // Apply custom score button
        var customScoreButton = document.createElement('button');
        customScoreButton.textContent = 'Apply';
        customScoreButton.onclick = function() {
            var customScore = parseInt(customScoreInput.value) || 0;
            if (!isNaN(customScore)) {
                updateScore(index, customScore);
            } else {
                alert('Please enter a valid number.');
            }
            customScoreInput.value = ''; // Clear the input field
        };
        customScoreContainer.appendChild(customScoreButton);

        teamCard.appendChild(customScoreContainer);

        // Create the score label
        var scoreLabel = document.createElement('div');
        scoreLabel.className = 'scoreLabel';
        scoreLabel.id = 'score' + index;
        scoreLabel.textContent = 'Score: 0';
        teamCard.appendChild(scoreLabel);

        scoreManagementSection.appendChild(teamCard);
    });

    scoreManagementSection.style.display = 'block';
}

function updateScore(teamIndex, amount) {
    var scoreLabel = document.getElementById('score' + teamIndex);
    var currentScore = parseInt(scoreLabel.textContent.replace('Score: ', ''));
    scoreLabel.textContent = 'Score: ' + (currentScore + amount);
}

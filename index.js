const validUsers = [
    { username: 'user123', dob: '2000-01-01' },
    { username: 'jeeva', dob: '2004-10-21' },
    { username: 'sahith', dob: '2004-10-21' }
];

let loginTime = null;
let timerInterval = null;

document.getElementById('login-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const dob = document.getElementById('dob').value;
    
    const user = validUsers.find(user => user.username === username && user.dob === dob);

    if (user) {
        document.getElementById('login-container').style.display = 'none';
        document.getElementById('content-container').style.display = 'block';

        loginTime = new Date();
        startTimer();
    } else {
        document.getElementById('login-message').textContent = 'Details were not correct. Please try again.';
    }
});

function startTimer() {
    const timerDisplay = document.getElementById('time-spent');
    timerInterval = setInterval(function() {
        const currentTime = new Date();
        const timeSpent = Math.floor((currentTime - loginTime) / 1000);

        const hours = String(Math.floor(timeSpent / 3600)).padStart(2, '0');
        const minutes = String(Math.floor((timeSpent % 3600) / 60)).padStart(2, '0');
        const seconds = String(timeSpent % 60).padStart(2, '0');

        timerDisplay.textContent = `${hours}:${minutes}:${seconds}`;
    }, 1000); 
}

document.getElementById('logout-btn').addEventListener('click', function(e) {
    e.preventDefault();

    if (loginTime) {
        clearInterval(timerInterval);

        const logoutTime = new Date();
        const timeSpent = Math.floor((logoutTime - loginTime) / 1000);
        const minutes = Math.floor(timeSpent / 60);
        const seconds = timeSpent % 60;
        const user = document.getElementById('username').value;
        alert(`Hello ${user}, you have spent ${minutes} minutes and ${seconds} seconds on the website.`);

        document.getElementById('login-container').style.display = 'block';
        document.getElementById('content-container').style.display = 'none';
        document.getElementById('login-form').reset();
        document.getElementById('login-message').textContent = '';
        document.getElementById('time-spent').textContent = '00:00:00'; // Reset timer display

        loginTime = null;
    }
});

document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        if (this.getAttribute('id') !== 'logout-btn') {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
});

document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Thank you for contacting us!');
});

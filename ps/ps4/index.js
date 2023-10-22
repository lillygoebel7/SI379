//index.js
document.body.setAttribute('style', 'background-color: #E2DBFF');

const title = document.createElement('h1');
title.innerHTML = "Welcome to Trivia!";
document.body.appendChild(title);

let current_score = 0;
const score = document.createElement('h2');
score.innerHTML = "Your Score: " + current_score;
document.body.appendChild(score);

function shuffleArray(array) {
    const shuffledArray = array.slice(); 
    
    for (let i = shuffledArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1)); 
        [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray; 
}

fetch('https://the-trivia-api.com/v2/questions').then(r => r.json())
.then((data) => {
    for (let i in data) {
        const info = data[i];
        const correct = info['correctAnswer'];
        const incorrect = info['incorrectAnswers'];
        const question = info['question']['text'];

        const q = document.createElement('h4');
        q.id = 'question-' + i;
        q.innerHTML = question;
        document.body.appendChild(q);

        const my_arr = incorrect.concat(correct);
        const shuffled = shuffleArray(my_arr);

        const lst = document.createElement('ul');
        document.body.appendChild(lst);

        const myDiv = document.createElement('div');
        document.body.appendChild(myDiv);

        for (const answer of shuffled) {
            const li = document.createElement('li');
            const x = document.createElement('button');
            li.append(x);
            x.id = 'q-' + i;
            x.innerHTML = answer;
            x.addEventListener('click', () => {
                if (x.textContent === correct) {
                    li.append(" Correct!");
                    current_score += 1;
                    score.innerHTML = "Your Score: " + current_score;
                }
                else {
                    li.append(" Incorrect :(");
                    myDiv.append(` Correct answer: ${correct}`);
                }
                disableButtons(i);
            });
            lst.appendChild(li);
        }
    }

    function disableButtons(questionIndex) {
        const answerButtons = document.querySelectorAll('[id^="q-' + questionIndex + '"]');
        answerButtons.forEach(button => {
            button.disabled = true;
        });
    }
});

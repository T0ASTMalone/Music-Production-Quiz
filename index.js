'use strict';

let count = 0;
let score = 0;

function generateQuestionString () {
    const currentQ = QUESTIONS[count];

    return `
    <section class="js-quiz">
        <div id="current-score">Score: ${score}/${QUESTIONS.length}</div>
        <section id="q-and-a" class="js-q-and-a">
            <img src="Images/${currentQ.icon}" alt="${currentQ.alt}" class="icon">
            <form action="" id="qa" class="js-qa content-box">
                <label for="question" class="question">${currentQ.question}</label>
                <label for="answer" class="answer"><input type="radio" name="answer" value="${currentQ.answer[0]}" required><span>${currentQ.answer[0]}</span></label>
                <label for="answer" class="answer"><input type="radio" name="answer" value="${currentQ.answer[1]}" required><span>${currentQ.answer[1]}</span></label>
                <label for="answer" class="answer"><input type="radio" name="answer" value="${currentQ.answer[2]}" required><span>${currentQ.answer[2]}</span></label>
                <label for="answer" class="answer"><input type="radio" name="answer" value="${currentQ.answer[3]}" required><span>${currentQ.answer[3]}</span></label>
                <button class="button" id="submit">Submit</button>
            </form>
        </section>    
        <div id="question-count">${count + 1}/${QUESTIONS.length}</div>
    </div>
    `;
}

function renderQuestion() {
    $('.main').hide().html(generateQuestionString()).fadeIn(1000);
}

function handleAnswers() {
    $('main').on('click', '#submit', function() {
        event.preventDefault();
        const answerChosen = $("input[name='answer']:checked").val();
        if (answerChosen === QUESTIONS[count].correctAnswer) {
            score++;
            $('.main').hide().html(correctAnswerFeedback()).fadeIn(1000);          
        } else {
            $('.main').hide().html(incorrectAnswerFeedback()).fadeIn(1000);   
        }
    });
}

function incorrectAnswerFeedback () {
    return `
    <div id="current-score">Score: ${score}/${QUESTIONS.length}</div>
    <img class="icon" src="Images/x.png" alt="x">
    <section id="feedback" class="js-feedback content-box">
        <h2>The correct answer was: ${QUESTIONS[count].correctAnswer}</h2>
        <button class="button" id="continue">Continue</button>
    </section>
    `;
}

function correctAnswerFeedback () {
    return `
    <div id="current-score">Score: ${score}/${QUESTIONS.length}</div>
    <img class="icon" src="Images/check-mark.png" alt="check-mark">
    <section id="feedback" class="js-feedback content-box">
        <h2>That's Correct!</h2>
        <h2>I can see that platinum record already!</h2>
        <button class="button" id="continue">Continue</button>
    </section>
    `;
}

function nextQuestion() {
    $('.main').on('click', '#continue', function(){
        count++
        if (count < QUESTIONS.length) {
            renderQuestion();
        } else
            handleQuizComplete();
    });
}

function generateFinalScoreString () {
    if ((score / QUESTIONS.length) > 0.5 ) 
        return `
        <img class="icon" id="pass" src="Images/smile.png" alt="smiley face">
        <section id="final-score" class="js-final-score content-box">
            <h2>Wow your final score is: </h2>
            <h2>${score}/${QUESTIONS.length}</h2>
            <button class="button" id="reset">Back to start</button>
        </section>
        `;
    else
        return `
        <img class="icon" src="Images/smile.png" alt="smiley face">
        <section id="final-score" class="js-final-score content-box">
            <h2>Wow your final score is: </h2>
            <h2>${score}/${QUESTIONS.length}</h2>
            <button class="button" id="reset">Back to start</button>
        </section>
        `;
}

function resetQuiz () {
    $('main').on('click', '#reset', function() {
        location.reload();
        count = 0;
        score = 0;
    }); 
}

function handleQuizComplete() {
    $('main').hide().html(generateFinalScoreString()).fadeIn(1000);
}

function startQuiz() {
    $('.js-start-menu').on('click', 'button', function() {
        $('.js-start-menu').hide();
        $('.quiz-started-header').hide().html(`<img class="play-button" src="Images/play-button-hover.png" alt="play-button"><br><h1 class="title">Music Production Quiz</h1>`).fadeIn(1000);
        renderQuestion();
    });
}

function checked() {
    $('main').on('click', 'input',function(){
        $('label').has("input[name='answer']:checked").css("background-color", "#f0AA0A");
        $('label').has("input[name='answer']:not(:checked)").css("background-color", "#9B9B9B");
    });
}

function Quiz() {
    startQuiz();
    handleAnswers();
    nextQuestion();
    resetQuiz();
    checked();
}

$(Quiz);
// array of questions for the quiz
var questions = [
    {
        question: 'Who is the mouse in Itchy and Scratchy?',
        choices: ['Itchy', 'Poochie', 'Roy', 'Scratchy'],
        correctAnswer: 0
    },
    {
        question: 'What is the baby in the Simpson\'s family called?',
        choices: ['Milhouse', 'Martin', 'Maggie', 'Bart'],
        correctAnswer: 2
    },
    {
        question: 'What was the name of the music festival Homer worked for?',
        choices: ['Hullabalooza ', 'Lollapalooza', 'Camp Krusty', 'Mount Springfield'],
        correctAnswer: 0
    },
    {
        question: 'Who is the Foreign Exchange Student in Springfield Elementary?',
        choices: ['Apu', 'Willie', 'Manjula', 'Uter'],
        correctAnswer: 3
    },
    {
        question: 'What Does McDonalds Call Partially Gelatinated, Non-Dairy, Gum-Based Beverages?',
        choices: ['Juice', 'Shakes', 'Lemonade', 'Water'],
        correctAnswer: 1
    }
];

//initializing questions with default values of 0 and false
var currentQuestion = 0;
var correctAnswers = 0;
var quizOver = false;

window.addEventListener('DOMContentLoaded', function(e){
    displayCurrentQuestion();

    var quizMessage = document.querySelector('.quizMessage');
    quizMessage.style.display = 'none';

    document.querySelector('.nextButton').addEventListener('click', function(){
        
        if(!quizOver){
            var radioBtnsChecked = document.querySelector('input[type=radio]:checked');
            //displays if no radio button is selected
            if (radioBtnsChecked === null){
                quizMessage.innerText = 'Please select an answer';
                quizMessage.style.display = 'block';
            } else {
                quizMessage.style.display = 'none';
                //this will check if the selected answer matched the correct answer in the current question that references the array with the questions
                if (parseInt(radioBtnsChecked.value) === questions[currentQuestion].correctAnswer){
                    correctAnswers++;
                }

                currentQuestion++;

                if (currentQuestion < questions.length){
                    //the dusplay current question function will run
                    displayCurrentQuestion();
                } else {
                    displayScore();
                    document.querySelector('.nextButton').innerText = 'Try Again?';
                    quizOver = true;
                 }
                }   
        } else {
            quizOver = false;
            document.querySelector('.nextButton').innerText = 'Next Question';
            resetQuiz();
            displayCurrentQuestion();
            hideScore();
        }
    });
});

//this function displays the current question that user needs to answer, either question 0 through 4
function displayCurrentQuestion(){

    var question = questions[currentQuestion].question;
    var questionClass = document.querySelector('.quizContainer > .question');
    var choiceList = document.querySelector('.quizContainer > .choiceList');
    var numChoices = questions[currentQuestion].choices.length;

    //Set the question to display the current question
    questionClass.innerText = question;

    //Remove <li> elements
    choiceList.innerHTML = '';

    //
    var choice;
    //this will hold the choices the user made to calculate score at the end.  the li is invisible to user
    for (i = 0; i < numChoices; i++){
        choice = questions[currentQuestion].choices[i];
        var li = document.createElement('li');
            li.innerHTML = '<li><input type="radio" value="' + i + '" name="dynradio" />' + choice + '</li>'
        choiceList.appendChild(li);

    }
}

//back to default values in case user wants to retry after completing quiz
function resetQuiz(){
    currentQuestion = 0;
    correctAnswers = 0;
    hideScore();
}

//this will display the score within the quiz container
function displayScore(){
    document.querySelector('.quizContainer > .result').innerText = 'You scored: ' + correctAnswers + ' out of ' + questions.length;
    document.querySelector('.quizContainer > .result').style.display = 'block';
}
//need this function for the reset button so scores are hidden and reset to default
function hideScore(){
    document.querySelector('.result').style.display = 'none';
}
const start = document.getElementById('start-btn');
const submit = document.getElementById('submit-btn');
const restart = document.getElementById('restart-btn');
const opening = document.getElementById('opening');
const quiz = document.getElementById('trivia');
const question = document.getElementById('question');
const topText = document.getElementById('top-text');
const questionNumber = document.getElementById('current-question');
const result = document.getElementById('result');
const rank = document.getElementById('current-rank');
const answer = document.getElementById('answer');

const questions = [
	{
		question: "Which US naval base that Japan attack on 7th of December 1941?",
		answer: "PEARL HARBOR"
	},
	{
		question: "Who's held the higher command in engine room of a ship?",
		answer: "CHIEF ENGINEER"
	},
	{
		question: "Which part of the ship used as primary control to steer the ship?",
		answer: "RUDDER"
	},
	{
		question: "Ship's birthplace. What is it?",
		answer: "SHIPYARD"
	},
	{
		question: "What kind of ship that has prefix 'MT'?",
		answer: "TANKER"
	},
	{
		question: "With regards to ship classifications, what did AV stand for?",
		answer: "SEAPLANE"
	},
	{
		question: "The International Convention for the Safety of Life at Sea, known as?",
		answer: "SOLAS"
	},
	{
		question: "UN special agency that responsible for measures and improve the safety and security of international shipping and to prevent marine pollution from ships is known as?",
		answer: "IMO"
	},
	{
		question: "A great battle which become the turning point for allied in the Pacific theater during World War 2. What battle is it?",
		answer: "MIDWAY"
	},
	{
		question: "This naval officer is Indonesia's national hero. He killed at the Battle of Arafura Sea. Who is he?",
		answer: "YOS SUDARSO"
	},
	{
		question: "What is the name of propellers that designed to rotate 360deg in the horizontal plane about a vertical axis?",
		answer: "AZIMUTH"
	},
	{
		question: "Forward end of the ship hull is known as?",
		answer: "BOW"
	},
	{
		question: "Rear end of the ship hull is known as?",
		answer: "STERN"
	},
	{
		question: "What do engineer called numbers marked on the hull side, that used to indicating the draft?",
		answer: "PLIMSOLL"
	},
	{
		question: "What are the rooms in the ship called?",
		answer: "CABIN"
	},
	{
		question: "What is the ship classification society that registered in Indonesia?",
		answer: "BKI"
	},
	{
		question: "What is the ship classification society that registered in UK?",
		answer: "LR"
	},
	{
		question: "What is the ship classification society that registered in US?",
		answer: "ABS"
	},
	{
		question: "Where in Europe that people used sea power for the first time?",
		answer: "CRETE"
	},
	{
		question: "What unit that used to meassure velocity of water vessel/ship?",
		answer: "KNOT"
	},
	{
		question: "What is the standard of measurement used in container transport based on the dimensions of a 20 ft long container?",
		answer: "TEU"
	},
	{
		question: "The longitudinal attitude of a vessel or the difference between forward and aft drafts, known as?",
		answer: "TRIM"
	},
	{
		question: "Raised short deck at the stern of the ship is called as?",
		answer: "POOP DECK"
	},
	{
		question: "Market category of vessels notionally at the dimensional limits for transiting the Panama canal. What is this kind of ship called?",
		answer: "PANAMAX"
	},
	{
		question: "Large naval vessel capable of carrying small landing craft and amphibious vehicles, dispatched via a floodable stern dock within the hull. What is it?",
		answer: "LANDING SHIP DOCK"
	}
]

start.addEventListener("click", startQuiz);
submit.addEventListener('click', checkAnswer);
restart.addEventListener('click', restartGame);
let index = 0;
let numQ = 1;
let ranking = 'Cadet';

function shuffle(question) {
	let j = 0;
	 for (let i = question.length-1; i >= 0; i--) {
		j = Math.floor(Math.random()*(i+1));
		[question[i],question[j]] = [question[j],question[i]]
	}
	return question;
}

let shuffledQuestion = shuffle(questions);

function startQuiz () {
	const name = document.getElementById('enlist-name').value;
	document.getElementById('sailor-name').innerHTML = name;
	document.getElementById('answer').value = '';
	if (name) {
		start.classList.add('hidden');
		opening.classList.add('hidden');
		showQuestion();
	} else {
		alert('You haven\'t enter your name, sailor!')
	}
}

function showQuestion() {
	trivia.classList.remove('hidden');
	submit.classList.remove('hidden');
	topText.classList.remove('hidden');
	questionNumber.innerHTML = numQ;
	question.innerHTML = shuffledQuestion[index].question;
}

function showEnd () {
	trivia.classList.add('hidden');
	submit.classList.add('hidden');
	topText.classList.add('hidden');
	result.classList.remove('hidden');
	restart.classList.remove('hidden');
}

function checkAnswer() {
	
	if(!answer.value) {
		alert('ANSWER THE QUESTION, SAILOR!')
	} else if(answer.value.toUpperCase().includes(shuffledQuestion[index].answer)){
		answer.value = '';
		rightAnswer();
	} else {
		endGame();
	}
}

function rightAnswer (){
	index++;
	numQ++;
	ranker(index);

	if (index === shuffledQuestion.length) {
		finishGame()
	} else {
		showQuestion();	
	}
}

function ranker (point) {
	if(point === 25) {
		rank.innerHTML = 'Admiral'
		ranking = 'Admiral';
	} else if(point > 21) {
		rank.innerHTML = 'Vice Admiral'
		ranking = 'Vice Admiral';
	} else if(point > 18) {
		rank.innerHTML = 'Rear Admiral'
		ranking = 'Rear Admiral';
	} else if(point > 15) {
		rank.innerHTML = 'Captain'
		ranking = 'Captain';
	} else if(point > 12) {
		rank.innerHTML = 'Commander'
		ranking = 'Commander';
	} else if(point > 10) {
		rank.innerHTML = 'Liutenant Commander'
		ranking = 'Liutenant Commander';
	} else if(point > 8) {
		rank.innerHTML = 'Liutenant'
		ranking = 'Liutenant';
	} else if(point > 6) {
		rank.innerHTML = 'Warrant Officer'
		ranking = 'Warrant Officer';
	} else if(point > 4) {
		rank.innerHTML = 'Petty Officer'
		ranking = 'Petty Officer';
	} else if(point > 2) {
		rank.innerHTML = 'Seaman'
		ranking = 'Seaman';
	} else if(point > 0) {
		rank.innerHTML = 'Recruit'
		ranking = 'Recruit';
	}
}

function endGame () {
	showEnd();
	document.getElementById('final-score').innerHTML = index;
	document.getElementById('final-rank').innerHTML = ranking;
	index = 0;
	numQ = 1;
	ranking = 'Cadet'
	document.getElementById('current-rank').innerHTML ='Cadet'
}

function restartGame () {
	result.classList.add('hidden');
	restart.classList.add('hidden');
	start.classList.remove('hidden');
	opening.classList.remove('hidden');
	document.getElementById('enlist-name').value = '';
}

function finishGame () {
	document.getElementById("congrats").innerHTML = 'CONGRATULATION!'
	endGame();
}

	
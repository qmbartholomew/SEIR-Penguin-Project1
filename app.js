/*          APP STATE           */
const state = {
    player1: 0,
    player2: 0,
    currentQ: {},
    which: true
}

let questions = []

/*          MAIN DOM            */
const $question = $('#question')
const $a = $('#a')
const $b = $('#b')
const $c = $('#c')
const $d = $('#d')
const $p1score = $('#player1 h4')
const $p2score = $('#player2 h4')

/*          FUNCTIONS           */

const chooseAnswer = (event, question) => {
    if(event.target.innerText === question.answer) {
        if(state.which) {
            state.player1++
            state.which = !state.which
        } else {
            state.player2++
            state.which = !state.which
        }
        setBoard(questions)
    } else {
        setBoard(questions)
        state.which = !state.which
    }
}

const setBoard = (q) => {
    // Get a random question
    const randomIndex = Math.floor(Math.random() * q.length)
    const randomQuestion = q[randomIndex]

    // Set the gameboard using random question
    $question.text(randomQuestion.question)
    $a.text(randomQuestion.a)
    $b.text(randomQuestion.b)
    $c.text(randomQuestion.c)
    $d.text(randomQuestion.d)

    // Update players scores
    $p1score.text(state.player1)
    $p2score.text(state.player2)

    $('li').off()
    $('li').on('click', (event) => {
        chooseAnswer(event, randomQuestion) // REVIEW FOR UNDERSTANDING
    })
}

const API = 'https://cdn.contentful.com/spaces/qzkwvhckbgzt/environments/master/entries?access_token=P0qUEyGdnMrFDrlMDyjwrMPtdgVgu1l63tZG8hLha4w&content_type=triviaQ'

$.ajax(API)
.then((data) => {
    questions = data.items.map(q => q.fields)
    setBoard(questions)
})
0
/*          ADDITIONAL GAME LOGIC/EVENT LISTENERS           */

// Remove intro overlay when start button clicked -- Begin the game.
$('.begin').on('click', () => {
    $('.intro').css('display', 'none')
})
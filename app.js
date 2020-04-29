console.log("Jeopardy!");


// const startButton = document.querySelector('#start');


// searchButton.addEventListener('click',function(evt){
//     evt.preventDefault();
//     console.log('hi');
//     const term = document.querySelector('#searchTerm').value
//     searchGiphy(term);
// });

// deleteButton.addEventListener('click',function(evt){
//     evt.preventDefault();
//     const gifContainer = document.querySelector('#results');
//     console.log('deleting');
//     gifContainer.innerHTML='';
// });


// Call to get the categories
async function getCategories(){

    var arr = [];
    while(arr.length < 6){
        var r = Math.floor(Math.random() * 100) + 1;
        if(arr.indexOf(r) === -1) arr.push(r);
    }
    let categories = [];
    const categoryURL = "http://jservice.io/api/categories?count=100";
    let response = await axios.get(categoryURL);

    for (let index = 0; index < arr.length; index++) {
        const element = arr[index];
        categories[index] = response.data[element];
    }
    buildCategories(categories);
}


// Call to get the Questions and place them in the grid
async function getQuestions(title,id, qid){
let qURL = `http://jservice.io/api/clues?category=${id}`
let response = await axios.get(qURL);
for (let count2 = 1; count2 <= 5; count2++) {
    let questionID = qid+'-'+count2;
    let $placement = $('#'+questionID);
    let $item = $(`
    <div class="question-q q-${questionID}">${response.data[count2-1].question}</div>
    <div class="answer-a a-${questionID}">${response.data[count2-1].answer}</div>
    `);
    $placement.append($item);
    addQevents(questionID);
}

}

function addQevents(id){
// add event listener to values so they show the question
 $question = $('#'+id);
 $question.on('click',function(evt){
    if(evt.target.className === "amount"){
        $amount = evt.target;
        let questionD = evt.target.parentNode.querySelector('.q-'+id);
        let answerD = evt.target.parentNode.querySelector('.a-'+id);
        $amount.className="hide";
        questionD.className += " show";
        console.log(questionD);
        questionD.addEventListener('click',function(ev){
            console.log(answerD);
            questionD.className ="hide";
            answerD.className += " show";
        });
        
    }
 })

//  add event listener to questions so they show the answer
}



function buildCategories(categories){
    let count=0;
    const $categoryList = $(".categories");
    for (const category of categories) {
        count = count+1;
        let qid = `cat-${count}`;
        let $item = $(
            `<div id="cat-${count}" data-qid="${category.id}" class="col category">${category.title}</div>
            `);
        $categoryList.append($item);
        getQuestions(category.title,category.id, count);
    }
    
}


let startButton = document.querySelector('.btn-start');
startButton.addEventListener('click',function(evt){
 location.reload();
})


getCategories();
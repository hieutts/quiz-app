
/*

*/
export const getRandomQuiz = (list) => {
  const randomIndex = Math.floor(Math.random() * list.length);
  return list[randomIndex].id;
}

export const isCorrectOpenCode = (input, actual) => {
  return input === actual;
}

export const getRandomQuestion = (list) => {
  const randomNumbers = [];
  while (randomNumbers.length < 5) {
    const randomNumber = Math.floor(Math.random() * list.length);

    if (!randomNumbers.includes(randomNumber)) {
      randomNumbers.push(randomNumber);
    }
  }

  const listRandom = [];
  randomNumbers.map(randomNumber => listRandom.push(list[randomNumber]));
  return listRandom;
}

export const getSortAnswer = (list) => {
  const lsSorted = list.sort(() => Math.random() - 0.5);
  return lsSorted;
}

export const resultOfQuiz = async (records, listQues) => {
  let score =0;
  await listQues.sort((a, b) => a.id - (b.id));
  await records.sort((a,b) => a.idQues - b.idQues);
   
  for (let i = 0; i< listQues.length -1 ; i++) {
     for (let j = 0; j < 4 ; j++) {
      console.log(listQues[i].answer[j].id.toString() , records[i].idAns)
      if (listQues[i].answer[j].isCorrect && listQues[i].answer[j].id.toString() ===  records[i].idAns){
        score ++;
      }
     }
  }
  return score;
}

// remove list answers from localStorage
export const removeListAnswer =  () => {
  const lengthLocal =  localStorage.length;
  for (let i = 0; i < lengthLocal; i++) {
    if (localStorage.key(0).startsWith('answer')) {
      localStorage.removeItem(localStorage.key(0));
    }
  }
}
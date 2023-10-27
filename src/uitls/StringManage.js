
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
  console.log(listRandom)
  return listRandom;
}

export const getSortAnswer = (list) => {
  const lsSorted = list.sort(() => Math.random() - 0.5);
  return lsSorted;
}

export const resultOfQuiz = async (records, listQues) => {
  console.log('111111111111')
  let scores = 0;
  await records.sort((a, b) => a.idQues - (b.idQues));


  await listQues.sort((a, b) => a.id - (b.id));
  for (let i = 0; i < listQues.length; i++) {
    if (records && records[i]) {
      let record = records[i];
      console.log(record, record.isAnswer)
      const indexAns = await listQues[i].answer.findIndex(a => a.id == record.idAnswer);
       console.log("333333",indexAns)
      if (listQues[i].answer[indexAns] && listQues[i].answer[indexAns].isCorrect) {
        console.log('2222222222222222')
        scores++;
      }
    }
  }
  return scores;
}
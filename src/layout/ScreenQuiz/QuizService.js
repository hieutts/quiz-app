
export const getQuizId = async () => {
    const data = await fetch('http://localhost:1880/quiz')
        .then((response) => response.json())
        .then((data) => {
            return data;
        })
    const id = import('../../uitls/StringManage')
        .then(fn => { return fn.getRandomQuiz(data) }
        )
    return id
}


export const getListQuestions = async (idTitle) => {
    const data =await fetch(`http://localhost:1880/quiz/${idTitle}`)
    .then(res => res.json())
    .then(data => data.lsQuizz)
    const list= import('../../uitls/StringManage')
        .then(fn => { return fn.getRandomQuestion(data) }
        )
    return list;
}

export const getAnswerChoose = async (id) => {
   const answerId =await localStorage[`answer_${id}`]
   console.log(answerId)
   return answerId;
}




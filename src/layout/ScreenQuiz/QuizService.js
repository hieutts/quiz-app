
// export const getQuizId = async () => {
//     const data = await fetch('https://server.nglearns.com/quizz/285498f5-3486-434d-a459-bedb6bcea7ce')
//         .then((response) => response.json())
//         .then((data) => {
//             return data;
//         })
//     const id = import('../../uitls/StringManage')
//         .then(fn => { return fn.getRandomQuiz(data) }
//         )
//     return id
// }


export const getListQuestions = async () => {
    const data =await fetch(`https://server.nglearns.com/quizz/285498f5-3486-434d-a459-bedb6bcea7ce`)
    .then(res => res.json())
    .then(data => data.lsQuizz)
    console.log(data)
    const list= import('../../uitls/StringManage')
        .then(fn => { return fn.getRandomQuestion(data) }
        )
    return list;
}




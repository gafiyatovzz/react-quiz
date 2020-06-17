import React, { Component } from 'react'
import classes from './Quiz.module.css'
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz'

class Quiz extends Component {

    state = {
        activeQuestion: 0,
        answerState: null,
        quiz: [
            {
                id: 1,
                question: 'Какого цвета крокодил?',
                rightAnswerId: 2,
                answers: [
                    {text: '#ccc', id: 1},
                    {text: '#fff', id: 2},
                    {text: '#000', id: 3},
                    {text: '#fafafa', id: 4},
                ]
            },
            {
                id: 1,
                question: 'Что ты ел на завтрак?',
                rightAnswerId: 2,
                answers: [
                    {text: 'eggs', id: 1},
                    {text: 'boiled eggs', id: 2},
                    {text: 'fried eggs', id: 3},
                    {text: 'norhing, i\'m like be hungry', id: 4},
                ]
            }
        ]
    }

    onAnswerClickHandler = (answerId) => {
        const question = this.state.quiz[this.state.activeQuestion];

        if (question.rightAnswerId === answerId ) {

            this.setState({
                answerState: {[answerId]: 'success'}
            })

            const timeOut = window.setTimeout(() => {
                if (this.isQuizFinished()) {
                    console.log('Finished');
                    
                } else {
                    this.setState({
                        activeQuestion: this.state.activeQuestion + 1,
                        answerState: null
                    })
                }
                window.clearTimeout(timeOut)
            })
        } else {
            this.setState({
                answerState: {[answerId]: 'error'}
            })
        }
    }

    isQuizFinished = () => {
        return this.state.activeQuestion + 1 === this.state.quiz.length
    }

    render() {
        return (
            <div className={ classes.Quiz }>
                <div className={ classes.QuizWrapper}>
                    <h1>Ответьте на все вопросы</h1>
                    <ActiveQuiz
                        answers={ this.state.quiz[this.state.activeQuestion].answers }
                        question={ this.state.quiz[this.state.activeQuestion].question }
                        onAnswerClick={this.onAnswerClickHandler}
                        quizLength={this.state.quiz.length}
                        answerNumber={this.state.activeQuestion + 1}
                        state={this.state.answerState}
                    /> 
                </div>
            </div>
        )
    }
}

export default Quiz;

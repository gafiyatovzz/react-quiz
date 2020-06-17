import React, { Component } from 'react'
import classes from './Quiz.module.css'
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz'
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz'

class Quiz extends Component {

    state = {
        results: {},
        ifFinished: false,
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
                id: 2,
                question: 'Что ты ел на завтрак?',
                rightAnswerId: 1,
                answers: [
                    {text: 'eggs', id: 1},
                    {text: 'boiled eggs', id: 2},
                    {text: 'fried eggs', id: 3},
                    {text: 'norhing, i\'m like be hungry', id: 4},
                ]
            },
            {
                id: 3,
                question: 'Что ты ел на завтрак?',
                rightAnswerId: 1,
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
        if (this.state.answerState) {
            const key = Object.keys(this.state.answerState)[0];
            if (this.state.answerState[key] === 'success') {
                return 
            }
        }


        const question = this.state.quiz[this.state.activeQuestion];
        const results = this.state.results
        if (question.rightAnswerId === answerId ) {

            if (!results[question.id ]) {
                results[question.id ] = 'success'
            }
            this.setState({
                answerState: {[answerId]: 'success'}
            })

            const timeOut = window.setTimeout(() => {
                if (this.isQuizFinished()) {
                    this.setState({
                        ifFinished: true
                    })                    
                } else {
                    this.setState({
                        activeQuestion: this.state.activeQuestion + 1,
                        answerState: null
                    })
                }
                window.clearTimeout(timeOut)
            })
        } else {
            results[question.id] = 'error'
            this.setState({
                answerState: {[answerId]: 'error'},
                results
            })
        }
    }

    isQuizFinished = () => {
        return this.state.activeQuestion + 1 === this.state.quiz.length
    }

    retryHandler = () => {
         this.setState({
             activeQuestion: 0,
             answerState: null,
             ifFinished: false,
             results: {}
         })
    }

    render() {
        return (
            <div className={ classes.Quiz }>
                <div className={ classes.QuizWrapper}>
                    <h1>Ответьте на все вопросы</h1>
                    {
                        this.state.ifFinished
                        ? <FinishedQuiz
                            results={this.state.results}
                            quiz={this.state.quiz}
                            onRetry={this.retryHandler}
                            />
                        :  <ActiveQuiz
                            answers={ this.state.quiz[this.state.activeQuestion].answers }
                            question={ this.state.quiz[this.state.activeQuestion].question }
                            onAnswerClick={this.onAnswerClickHandler}
                            quizLength={this.state.quiz.length}
                            answerNumber={this.state.activeQuestion + 1}
                            state={this.state.answerState}
                            /> 
                    }
                   
                </div>
            </div>
        )
    }
}

export default Quiz;

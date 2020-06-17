import React from 'react'
import classes from './AnswerList.css'
import AnswerItem from './AnswerItem/AnswerItem'

const AnswerList = props => (
    <ul className={classes.AnswerList}>
        { props.answers.map((answer, idx) => {
            return (
                <AnswerItem
                    key={idx}
                    answer={answer}
                    onAnswerClick={props.onAnswerClick}
                />
            )
        }) }
    </ul>
)

export default AnswerList;

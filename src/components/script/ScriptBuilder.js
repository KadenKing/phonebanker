import React, { Component } from 'react'
import Script from './Script'

export default class ScriptBuilder extends Component {
    render() {
        return (
            <div>
                <h1>
                    Script
                </h1>
                <Script text="scripty"></Script>

                {/* {this.state.scriptQuestions.map(question => 
                    <ScriptQuestion question={question}> </ScriptQuestion>
                )} */}
            </div>
        )
    }
}

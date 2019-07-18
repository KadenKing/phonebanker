import React, {Component} from 'react';
import ReactHtmlParser from 'react-html-parser'
import Icon from '@material-ui/core/Icon';
import ScriptEditorDialog from './ScriptEditorDialog';
import Paper from '@material-ui/core/Paper'
import { QuillDeltaToHtmlConverter } from 'quill-delta-to-html';
import { Typography } from '@material-ui/core';
import Fab from '@material-ui/core/Fab'

const style = {
  paper: {
    padding: 20
  },
  editButton: {
    flex: 1,
    margin: 10
  }
}

export default class Script extends Component {
  constructor(props) {
    super(props)
    this.quillRef = React.createRef()
  }

    state = {
      script: this.props.text,
      editingDialogOpen: false,
  }

  handleScriptSave = (newScript) => {
      var converter = new QuillDeltaToHtmlConverter(newScript.ops, {})
      var htmlScript = converter.convert()
      this.setState({script: htmlScript, editingDialogOpen: false})
      this.props.onScriptChange(newScript)
  }

  openEditor = () => {
    this.setState({editingDialogOpen: true})
  }

  closeEditor = () => {
    this.setState({editingDialogOpen: false})
  }

    render() {
        return (
            <div>
              <Typography variant="h2">
                Script
              </Typography>
              <Paper style={style.paper}>
                    {ReactHtmlParser(this.state.script)}
                  </Paper>
                  <Fab 
                    size="small"
                    style={style.editButton}
                    color="primary" 
                    aria-label="Edit" 
                    align="center" 
                    onClick={this.openEditor}>
                      <Icon>edit_icon</Icon>
                    </Fab>  
                <ScriptEditorDialog 
                script={this.state.script} 
                onSave={this.handleScriptSave}
                onClose={this.closeEditor}
                open={this.state.editingDialogOpen}
                quillRef={this.quillRef}>
                </ScriptEditorDialog>
            </div>
        )
    }
}

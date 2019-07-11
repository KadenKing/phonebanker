import React, {Component} from 'react';
import ReactHtmlParser from 'react-html-parser'
import Button from '@material-ui/core/Button';
import ScriptEditorDialog from './ScriptEditorDialog';
import Paper from '@material-ui/core/Paper'
import { QuillDeltaToHtmlConverter } from 'quill-delta-to-html';

const style = {
  paper: {
    padding: 20
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
              <Paper style={style.paper}>
                    {ReactHtmlParser(this.state.script)}
              </Paper>
                <Button varient="contained" color="primary" onClick={this.openEditor}>Edit</Button>
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

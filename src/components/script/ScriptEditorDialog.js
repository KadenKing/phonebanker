import React, { Component } from 'react'
import ReactQuil from 'react-quill'
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Button from '@material-ui/core/Button'
import Slide from '@material-ui/core/Slide'

const style = {
    appBar: {
        position: 'relative'
    },
    title: {
        marginLeft: 15,
        flex: 1
    }
}

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

export default class ScriptEditorDialog extends Component {
    constructor(props) {
        super(props)
        this.quillRef = React.createRef();
    }

    state = {
        newScript: '',
    }

    onScriptChange = (value) => {
        this.setState({newScript: value})
    }

    onScriptSave = () => {
        this.props.onSave(this.quillRef.current.getEditor().getContents())
    }

    onClose = () => {
        this.setState({newScript: ''})
        this.props.onClose()
    }

    render() {
        return (
            <div>
        <Dialog fullScreen open={this.props.open} TransitionComponent={Transition}>
        <AppBar style={style.appBar}>
          <Toolbar>
            <IconButton edge="start" color="inherit" aria-label="Close" onClick={this.onClose}>
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" style={style.title}>
              Edit Script
            </Typography>
            <Button color="inherit" onClick={this.onScriptSave}>
              save
            </Button>
          </Toolbar>
        </AppBar>

        <ReactQuil 
            value={this.state.newScript === '' ? this.props.script : this.state.newScript} 
            ref={this.quillRef}> 
            </ReactQuil>
      </Dialog>
            </div>
        )
    }
}

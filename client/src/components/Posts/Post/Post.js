import React from 'react'
import {useDispatch} from 'react-redux'
import useStyles from './styles'
import {Card,CardActions,CardContent,CardMedia,Button,Typography} from '@material-ui/core'
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import DeleteIcon from '@material-ui/icons/Delete'
import moment from 'moment'
import {deletePost,likePost} from '../../../actions/posts'

const Post = ({post,setCurrentId,currentId}) => {
    const dispatch=useDispatch()
    const classes=useStyles()

    const removePost=()=>{
  
        dispatch (deletePost(post._id))
       
    }
    const likeMyPost=()=>{
      
      dispatch(likePost(post._id,post))
    }
    return (
      
       <Card className={classes.card}>
          <CardMedia className={classes.media} image={post.selectedFile} title={post.title}/>
          <div className={classes.overlay}>
                <Typography variant="h6">{post.creator}</Typography>
                <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
          </div>
          <div className={classes.overlay2}>
            {/* the thee dots tab */}
            <Button 
              style={{ color: 'white' }} size="small"
              onClick={() =>setCurrentId(post._id)}>
              <MoreHorizIcon fontSize="default" />
            </Button>
          </div>
          <div className={classes.details}>
            <Typography variant="body2" color="textSecondary" component="h2">{post.tags.map((tag) => `#${tag} `)}</Typography>
          </div>
            <Typography className={classes.title} gutterBottom variant="h5" component="h2">{post.title}</Typography>
          <CardContent>
            <Typography variant="body2" color="textSecondary" component="p">{post.message}</Typography>
           </CardContent>
          <CardActions className={classes.cardActions}>
            <Button size="small" color="primary" onClick={likeMyPost}><ThumbUpAltIcon fontSize="small" />&nbsp; Like {post.likeCount} </Button>
            <Button size="small" color="primary" onClick={removePost}><DeleteIcon fontSize="small" /> Delete</Button>
        </CardActions>
   

       </Card>
       
    )
}

export default Post

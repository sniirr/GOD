interface MessageProps{
    msg:any
}

 const Message = (props:MessageProps) => {
    const {msg} = props
    try {
        return (
            <div className="message">
              <div className="creator">
                {msg.roles.creator.displayName} - {msg.date}
              </div>
              <div className="content">{msg.text}</div>
            </div>
          ) 
    } catch (error) {
        console.error(error)
        return null
    }
  
}

export default Message;

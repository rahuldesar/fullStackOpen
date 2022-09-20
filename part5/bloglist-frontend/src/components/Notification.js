const Notification = ({ notification }) => {
  const notificationText = notification[0];
  const notificationStyle = notification[1];

  if(notification === null){
    return null;
  }
  return (
    <div id="FromNotification"> 
    <div className={notificationStyle}  > {notificationText} </div>
    </div>
  )
}

export default Notification;
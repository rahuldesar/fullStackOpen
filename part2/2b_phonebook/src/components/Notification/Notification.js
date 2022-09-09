const Notification = ({notification }) => {
  const notificationText = notification[0];
  const notificationStyle = notification[1];

  if(notification === null){
    return null;
  }
  return (
    <div className={notificationStyle}  > {notificationText} </div>
  )
}

export default Notification;